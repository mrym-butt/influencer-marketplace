// import { pusherServer } from "@lib/pusher";
import { pusherServer } from "@lib/pusher";
import Chat from "@models/Chat";
import Message from "@models/Message";
import User from "@models/User";
import { connectToDB } from "@mongodb";

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { chatId, currentUserId, text, photo } = body;

    // Find the current user
    const currentUser = await User.findById(currentUserId);

    // Check the role of the current user (assuming the role property exists in the User model)
    if (!currentUser.role) {
      return new Response("User role not defined", { status: 400 });
    }

    // Check if the user is a brand or a creator
    if (currentUser.role === "brand") {
      // Logic for handling messages from brands
      // For example, a brand can only send messages to creators
      // Check if the chatId corresponds to a chat with a creator
      const chat = await Chat.findById(chatId).populate("members").exec();
      const isChatWithCreator = chat.members.some((member) => member.role === "creator");
      if (!isChatWithCreator) {
        return new Response("Brands can only chat with creators", { status: 403 });
      }
    } else if (currentUser.role === "creator") {
      // Logic for handling messages from creators
      // For example, a creator can only send messages to brands
      // Check if the chatId corresponds to a chat with a brand
      const chat = await Chat.findById(chatId).populate("members").exec();
      const isChatWithBrand = chat.members.some((member) => member.role === "brand");
      if (!isChatWithBrand) {
        return new Response("Creators can only chat with brands", { status: 403 });
      }
    } else {
      // Unknown role
      return new Response("Invalid user role", { status: 403 });
    }

    // Create a new message
    const newMessage = await Message.create({
      chat: chatId,
      sender: currentUser,
      text,
      photo,
      seenBy: currentUserId,
    });

    // Update the chat with the new message
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: newMessage._id },
        $set: { lastMessageAt: newMessage.createdAt },
      },
      { new: true }
    )
      .populate({
        path: "messages",
        model: Message,
        populate: { path: "sender seenBy", model: "User" },
      })
      .populate({
        path: "members",
        model: "User",
      })
      .exec();

    // Trigger a pusher event for the new message
    await pusherServer.trigger(chatId, "new-message", newMessage);

    // Trigger update events for chat members
    const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
    updatedChat.members.forEach(async (member) => {
      try {
        await pusherServer.trigger(member._id.toString(), "update-chat", {
          id: chatId,
          messages: [lastMessage],
        });
      } catch (err) {
        console.error("Failed to trigger update-chat event");
      }
    });

    return new Response(JSON.stringify(newMessage), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create new message", { status: 500 });
  }
};
