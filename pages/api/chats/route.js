import { pusherServer } from "@lib/pusher";
import Chat from "@model/Chat";
import Brand from "@model/Brand";
import Creator from "@/model/Creator";
import { connectToDB } from "@mongodb";

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { currentUserId, role, targetUserId } = body;

    let chat;

    if (role === 'brand') {
      // Brands can only chat with creators
      const creator = await Creator.findById(targetUserId);
      if (!creator) {
        return new Response("Creator not found", { status: 404 });
      }

      // Check if chat already exists
      chat = await Chat.findOne({
        members: { $all: [currentUserId, targetUserId] },
      });

      if (!chat) {
        // Create new chat if it doesn't exist
        chat = new Chat({
          members: [currentUserId, targetUserId],
        });

        await chat.save();

        // Update both brand and creator with the new chat
        await Promise.all([
          Brand.findByIdAndUpdate(currentUserId, {
            $addToSet: { chats: chat._id },
          }),
          Creator.findByIdAndUpdate(targetUserId, {
            $addToSet: { chats: chat._id },
          }),
        ]);
      }
    } else if (role === 'creator') {
      // Creators (influencers) can only chat with brands
      const brand = await Brand.findById(targetUserId);
      if (!brand) {
        return new Response("Brand not found", { status: 404 });
      }

      // Check if chat already exists
      chat = await Chat.findOne({
        members: { $all: [currentUserId, targetUserId] },
      });

      if (!chat) {
        // Create new chat if it doesn't exist
        chat = new Chat({
          members: [currentUserId, targetUserId],
        });

        await chat.save();

        // Update both creator and brand with the new chat
        await Promise.all([
          Creator.findByIdAndUpdate(currentUserId, {
            $addToSet: { chats: chat._id },
          }),
          Brand.findByIdAndUpdate(targetUserId, {
            $addToSet: { chats: chat._id },
          }),
        ]);
      }
    } else {
      return new Response("Invalid role", { status: 400 });
    }

    // Trigger pusher event for both members
    chat.members.forEach((memberId) => {
      pusherServer.trigger(memberId.toString(), "new-chat", chat);
    });

    return new Response(JSON.stringify(chat), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new chat", { status: 500 });
  }
};
