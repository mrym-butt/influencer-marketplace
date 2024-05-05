import connectDB from '@/middleware/mongoose';
import Creator from '@/model/Creator';


export default connectDB(async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, phone, city, state , profileImage , description,category} = req.body;

    try {
      let user = await Creator.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user profile
      user.name = name;
      user.phone = phone;
      user.city = city;
      user.state = state;
      user.description = description,
      user.category = category,
      await user.save();

      return res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
});