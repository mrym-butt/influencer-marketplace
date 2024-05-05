// utils/db.js

// Import your database client library (e.g., MongoDB, Mongoose, Prisma, etc.)
// This example assumes you're using MongoDB with Mongoose

import mongoose from 'mongoose';
import Creator from '../model/Creator'; // Assuming you have a User model defined

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to fetch user data by ID
export async function getUserById(userId) {
 
  try {
    // Fetch user data from the database
    
    const user = await Creator.findById({
      _id:userId,

    })
   
    return user; // Return the user data
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null; // Return null in case of an error
  }
}
