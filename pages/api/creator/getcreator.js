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
                    res.status(200).json({ success: true, creator: creator });
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
/* import Creator from "@/model/Creator";
import connectDB from "@/middleware/mongoose";

const getCreator = async (req, res) => {
  if (req.method === 'POST' && req.headers.authorization) {
    const base64Credentials = req.headers.authorization?.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    if (credentials === process.env.USER_ID + ":" + process.env.PASSWORD) {
      try {
        const { email } = req.body;
        const creator = await Creator.findOne({ email });
        if (creator) {
          res.status(200).json({ success: true, creator });
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

export default connectDB(getCreator);
 */
// pages/api/creator/getcreator.js

// Import any necessary modules or functions
import { getUserDataByEmail } from "../../../utils/db"; // Assuming you have a function to fetch user data from the database

// Handler function for the API route
export default async function handler(req, res) {
  if (req.method !== "POST") {
    // If the request method is not POST, return an error
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email } = req.body;

    // Fetch user data from the database based on the provided email
    const userData = await getUserDataByEmail(email);

    if (!userData) {
      // If user data is not found, return a 404 error
      return res.status(404).json({ message: "User not found" });
    }

    // If user data is found, return it in the response
    return res.status(200).json({ creator: userData });
  } catch (error) {
    // If an error occurs, return a 500 error with the error message
    return res.status(500).json({ message: error.message });
  }
}
