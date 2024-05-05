/* import Brand from "@/model/Brand";
import connectDB from "@/middleware/mongoose";


const login = async (req, res) => {
    if (req.method === 'POST' && req.headers.authorization) {
        const base64Credentials = req.headers.authorization?.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        if (credentials === process.env.USER_ID + ":" + process.env.PASSWORD) {
            try {
                const brand = await Brand.findOne({ email: req.body.email });
                if (brand) {
                    brand.name = req.body.name;
                    brand.email = req.body.email;
                    brand.role = "brand";
                    brand.profileImage = req.body.profileImage?req.body.profileImage:brand.profileImage;
                    brand.category = req.body.category?req.body.category:brand.category;
                    brand.location = req.body.location?req.body.location:brand.location;
                    brand.description = req.body.description?req.body.description:brand.description;
                    await brand.save();
                    res.status(200).json({ success: true, message: "Brand Updated" });
                    return;
                }else{
                    await Brand.create({
                        name: req.body.name,
                        email: req.body.email,
                        role: "brand",
                    });
                    res.status(200).json({ success: true, message: "Brand Added" });

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
import Brand from "@/model/Brand";
import connectDB from "@/middleware/mongoose";

const updateBrandProfile = async (req, res) => {
    try {
        // Check if brand exists based on email
        const brand = await Brand.findOne({ email: req.body.email });

        if (brand) {
            // Update brand profile fields if provided in the request body
            if (req.body.name) brand.name = req.body.name;
            if (req.body.profileImage) brand.profileImage = req.body.profileImage;
            if (req.body.city) brand.city = req.body.city;
            if (req.body.profileImage) brand.profileImage = req.body.profileImage;
            if (req.body.description) brand.description = req.body.description;

            // Save the updated brand profile
            await brand.save();

            res.status(200).json({ success: true, message: "Brand profile updated successfully" });
        } else {
            // Brand not found, return error
            res.status(404).json({ success: false, message: "Brand not found" });
        }
    } catch (error) {
        console.error("Error updating brand profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export default connectDB(updateBrandProfile);

