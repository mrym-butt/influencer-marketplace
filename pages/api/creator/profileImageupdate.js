/* import Creator from "@/model/Creator";
import connectDB from "@/middleware/mongoose";


const login = async (req, res) => {
    if (req.method === 'POST' && req.headers.authorization) {
        const base64Credentials = req.headers.authorization?.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        if (credentials === process.env.USER_ID + ":" + process.env.PASSWORD) {
            try {
                const creator = await Creator.findOne({ email: req.body.email });
                if (creator) {
                    creator.profileImage = req.body.profileImage;
                    await creator.save();
                    res.status(200).json({ success: true, message: "Profile Image Updated" });
                    return;
                }else{
                 
                    res.status(400).json({ success: false, message: "Creator not exit" });

                }

            } catch (err) {
                res.status(200).json({ success: false, message: 'Invalid request' });
            }

        } else {
            res.status(200).json({ message: "Hello bhai padhai karlo" });
        }
    }
    else {
        res.status(200).json({ message: "Abeyy Padhai likhai karo IAS~YAS Bano" });
    }
}

export default connectDB(login); */
import Creator from "@/model/Creator";
import connectDB from "@/middleware/mongoose";

const updateProfileImage = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { email, profileImage } = req.body;

            // Find the creator by email
            const creator = await Creator.findOne({ email });

            // If creator not found, return error response
            if (!creator) {
                return res.status(404).json({ success: false, message: "Creator not found" });
            }

            // Update profile image
            creator.profileImage = profileImage;

            // Save the updated creator document
            await creator.save();

            // Return success response
            return res.status(200).json({ success: true, message: "Profile image updated successfully" });
        } catch (error) {
            console.error("Error updating profile image:", error);
            return res.status(500).json({ success: false, error: "Internal server error" });
        }
    } else {
        // Method not allowed
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default connectDB(updateProfileImage);

