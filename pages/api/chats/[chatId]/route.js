import Chat from "@models/Chat";
import Message from "@model/Message";
import Brand from "@model/Brand";
import Creator from "@model/Creator";
import { connectToDB } from "@mongodb";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { chatId } = params;
    const { currentUserId, role } = req.user; // Assuming user info is included in the request

    let chat;

    if (role === "brand") {
      chat = await Chat.findById(chatId)
        .populate({
          path: "members",
          model: Creator, // Brands can only chat with creators
        })
        .populate({
          path: "messages",
          model: Message,
          populate: {
            path: "sender seenBy",
            model: Creator,
          },
        })
        .exec();
    } else if (role === "creator") {
      chat = await Chat.findById(chatId)
        .populate({
          path: "members",
          model: Brand, // Creators can only chat with brands
        })
        .populate({
          path: "messages",
          model: Message,
          populate: {
            path: "sender seenBy",
            model: Brand,
          },
        })
        .exec();
    } else {
      return new Response("Unauthorized", { status: 401 });
    }

    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to get chat details", { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const { chatId } = params;
    const { currentUserId, role } = req.user; // Assuming user info is included in the request

    if (role !== "brand" && role !== "creator") {
      return new Response("Unauthorized", { status: 401 });
    }

    // Update seenBy for messages in the chat
    await Message.updateMany(
      { chat: chatId },
      { $addToSet: { seenBy: currentUserId } },
      { new: true }
    );

    return new Response("Seen all messages by the current user", {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update seen messages", { status: 500 });
  }
};
