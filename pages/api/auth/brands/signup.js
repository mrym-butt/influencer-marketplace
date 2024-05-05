// pages/api/brand/signup.js
require('dotenv').config();

import connectDB from '../../../../middleware/mongoose';
import Brand from '@/model/Brand';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    
    try {
      // Check if the email is already registered
      const existingBrand = await Brand.findOne({ email });
      if (existingBrand) {
        return res.status(400).json({ success: false, error: 'Brand already exists' });
      }

      // Create a new brand
      const newBrand = new Brand({
        name,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
      });
      

      await newBrand.save();

      // Generate JWT token
      const token = jwt.sign({ id: newBrand._id, email: newBrand.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

      // Respond with success message and token
      return res.status(200).json({ success: true, message: 'Brand signup successful', token });
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
