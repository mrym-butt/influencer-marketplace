import Chat from "@model/Chat";
import Message from "@model/Message";
import Brand from "@model/Brand";
import Creator from "@model/Creator";
import { connectToDB } from "@mongodb";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const { userId } = params;

        // Assuming the role field indicates the user's role (brand or creator)
        const user = await getUserById(userId);
        const role = user.role;

        const allChats = await Chat.find({ members: userId })
            .sort({ lastMessageAt: -1 })
            .populate({
                path: "members",
                model: role === "brand" ? Brand : Creator, // Adjusted population based on the role field
            })
            .populate({
                path: "messages",
                model: Message,
                populate: {
                    path: "sender seenBy",
                    model: role === "brand" ? Brand : Creator, // Adjusted population based on the role field
                },
            })
            .exec();

        return new Response(JSON.stringify(allChats), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response("Failed to get all chats of current user", {
            status: 500,
        });
    }
};



const getUserById = async (userId) => {
    try {
        let user;
        // Assuming you have a role field in your models to distinguish between brand and creator
        const brand = await Brand.findOne({ user: userId });
        const creator = await Creator.findOne({ user: userId });
        
        if (brand) {
            user = {
                role: "brand",
                ...brand.toObject(),
            };
        } else if (creator) {
            user = {
                role: "creator",
                ...creator.toObject(),
            };
        } else {
            // Handle case where user is not found
            user = null;
        }
        
        return user;
    } catch (error) {
        console.error("Error fetching user by id:", error);
        throw error;
    }
};

