
// pages/api/login.js
import connectDB from '../../../middleware/mongoose';
import Brand from '../../../model/Brand';
import Creator from '../../../model/Creator';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    try {
      // Check if the email exists in either brand or creator collection
      const brand = await Brand.findOne({ email });
      const creator = await Creator.findOne({ email });

      if (!brand && !creator) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Determine the user type
      const user = brand || creator;

      // Decrypt password and compare
      const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

      if (decryptedPassword !== password) {
        return res.status(401).json({ success: false, error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });

      console.log("login",token);
    

      // Respond with success message and token
      return res.status(200).json({ success: true, message: 'Login successful', token , user });
    } catch (error) {
      // Handle any errors
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    // Method not allowed
    return res.status(405).end();
  }
};

export default connectDB(handler);
