// Import the Brand model and connectDB middleware
import Brand from "@/model/Brand";
import connectDB from "@/middleware/mongoose";

// Define the API handler function
const brandUserHandler = async (req, res) => {
  try {
    // Fetch the brand user from the database using the provided email
    const { email } = req.body; // Extract email from request body
    const brandUser = await Brand.findOne({ email });

    // If a brand user is found, send it as a response
    if (brandUser) {
      res.status(200).json({ success: true, brandUser });
    } else {
      // If the brand user is not found, send a 404 response
      res.status(404).json({ success: false, message: "Brand user not found" });
    }
  } catch (error) {
    // If an error occurs during database query, send a 500 response
    console.error("Error fetching brand user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Connect the handler function to the database using the connectDB middleware
export default connectDB(brandUserHandler);
