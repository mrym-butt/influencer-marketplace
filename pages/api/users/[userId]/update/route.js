
import Creator from "@models/Creator";
import { connectToDB } from "@mongodb";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();

    const {userId } = params;

    const body = await req.json();

    const { username, profileImage , bannerImage , city,   phone,
        
      state,

      category,
      platforms,
   
      achievments,
      description,
      packages,
      rating,
      reviews,
      price,
      sample  } = body;

    const updatedUser = await Creator.findByIdAndUpdate(
      userId,
      {
        username,
        profileImage,
        bannerImage,
        city,
        phone,
        
        state,

        category,
        platforms,
     
        achievments,
        description,
        packages,
        rating,
        reviews,
        price,
        sample,
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to update user", { status: 500 })
  }
};
// this code snippet represents a serverless function that updates a user's information in a MongoDB database based on the provided 
//userId, username, and profileImage. It handles database connectivity, request parsing, user updating, and response generation.
// route.js



    
