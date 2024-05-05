import Creator from "@/model/Creator";
import connectDB from "@/middleware/mongoose";

const updateBannerImage = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { email, bannerImage } = req.body;

            // Find the creator by email
            const creator = await Creator.findOne({ email });

            // If creator not found, return error response
            if (!creator) {
                return res.status(404).json({ success: false, message: "Creator not found" });
            }

            // Update profile image
            creator.bannerImage= bannerImage

            // Save the updated creator document
            await creator.save();

            // Return success response
            return res.status(200).json({ success: true, message: "banner Image updated successfully" });
        } catch (error) {
            console.error("Error updating banner Image:", error);
            return res.status(500).json({ success: false, error: "Internal server error" });
        }
    } else {
        // Method not allowed
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default connectDB(updateBannerImage);