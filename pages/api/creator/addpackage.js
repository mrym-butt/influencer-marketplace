// import Creator from "@/model/Creator";
// import connectDB from "@/middleware/mongoose";


// const login = async (req, res) => {
//     if (req.method === 'POST' && req.headers.authorization) {
//         const base64Credentials = req.headers.authorization?.split(' ')[1];
//         const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//         if (credentials === process.env.USER_ID + ":" + process.env.PASSWORD) {
//             try {
//                 const creator = await Creator.findOne({ email: req.body.email });
//                 if (creator) {
//                     creator.packages = req.body.packages
//                     await creator.save();
//                     res.status(200).json({ success: true, message: "packages Updated" });
//                     return;
//                 }else{
                 
//                     res.status(400).json({ success: false, message: "Creator not exit" });

//                 }

//             } catch (err) {
//                 res.status(200).json({ success: false, message: 'Invalid request' });
//             }

//         } else {
//             res.status(200).json({ message: "Hello bhai padhai karlo" });
//         }
//     }
//     else {
//         res.status(200).json({ message: "Abeyy Padhai likhai karo IAS~YAS Bano" });
//     }
// }

// export default connectDB(login);

import Creator from "@/model/Creator";
import connectDB from "@/middleware/mongoose";

const addPackages = async (req, res) => {
    if (req.method === 'POST' && req.headers.authorization) {
        // Authenticate user
        const base64Credentials = req.headers.authorization?.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        if (credentials === process.env.USER_ID + ":" + process.env.PASSWORD) {
            try {
                // Find creator by email
                const creator = await Creator.findOne({ email: req.body.email });
                if (creator) {
                    // Update packages
                    creator.packages = req.body.packages;
                    await creator.save();
                    res.status(200).json({ success: true, message: "Packages updated successfully" });
                } else {
                    res.status(400).json({ success: false, message: "Creator not found" });
                }
            } catch (err) {
                console.error(err);
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        } else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}

export default connectDB(addPackages);
