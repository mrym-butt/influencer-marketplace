import Chat from "@model/Chat";
import Message from "@model/Message";
import Brand from "@model/Brand";
import Creator from "@model/Creator";
import { connectToDB } from "@mongodb";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const { userId, query } = params;
        let searchedChat;

        // Assuming the role field is named 'role' in both Brand and Creator models
        const isBrand = await Brand.exists({ _id: userId });
        const isCreator = await Creator.exists({ _id: userId });

        if (isBrand) {
            // Search for chats where the current user is a brand
            searchedChat = await Chat.find({
                "members.role": "creator", // Assuming the role field is named 'role'
                name: { $regex: query, $options: "i" },
                "members._id": userId,
            })
                .populate({
                    path: "members",
                    model: Creator,
                })
                .populate({
                    path: "messages",
                    model: Message,
                    populate: {
                        path: "sender seenBy",
                        model: Creator, // Assuming messages are sent by creators
                    },
                })
                .exec();
        } else if (isCreator) {
            // Search for chats where the current user is a creator
            searchedChat = await Chat.find({
                "members.role": "brand", // Assuming the role field is named 'role'
                name: { $regex: query, $options: "i" },
                "members._id": userId,
            })
                .populate({
                    path: "members",
                    model: Brand,
                })
                .populate({
                    path: "messages",
                    model: Message,
                    populate: {
                        path: "sender seenBy",
                        model: Brand, // Assuming messages are sent by brands
                    },
                })
                .exec();
        } else {
            return new Response("User not found", { status: 404 });
        }

        return new Response(JSON.stringify(searchedChat), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response("Failed to search Chat", { status: 500 });
    }
};
