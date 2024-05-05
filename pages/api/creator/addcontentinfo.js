import Creator from "@/model/Creator";
import connectDB from "@/middleware/mongoose";

const updateCreatorContent = async (req, res) => {
    if (req.method === 'POST' && req.headers.authorization) {
        const base64Credentials = req.headers.authorization?.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        if (credentials === process.env.USER_ID + ":" + process.env.PASSWORD) {
            try {
                const { email, category, description, platforms } = req.body;
                const creator = await Creator.findOne({ email });
                if (creator) {
                    creator.category = category;
                    creator.description = description;
                    creator.platforms = platforms;
                    await creator.save();
                    res.status(200).json({ success: true, message: "Content Info Updated" });
                } else {
                    res.status(404).json({ success: false, message: "Creator not found" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default connectDB(updateCreatorContent);

