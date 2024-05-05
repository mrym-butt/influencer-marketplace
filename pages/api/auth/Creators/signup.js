// pages/api/brand/signup.js
require('dotenv').config();

import connectDB from '../../../../middleware/mongoose';
import Creator from '@/model/Creator';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {username, name, email, password } = req.body;
    
    try {
      // Check if the email is already registered
      const existingCreator = await Creator.findOne({ email });
      if (existingCreator) {
        return res.status(400).json({ success: false, error: 'Creator already exists' });
      }

      // Create a new brand
      const newCreator = new Creator({
        username,
        name,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
      });
      

      await newCreator.save();

      // Generate JWT token
      const token = jwt.sign({ id: newCreator._id, email: newCreator.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

      // Respond with success message and token
      return res.status(200).json({ success: true, message: 'Creator signup successful', token });
    } catch (error) {
      // Handle any errors
      console.log(error)
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    // Method not allowed
    return res.status(405).end();
  }
};

export default connectDB(handler);

