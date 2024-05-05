// pages/api/creator/[id].js

import connectDB from '@middleware/mongoose';
import Creator from '@model/Creator';

const handler = async (req, res) => {
  const { creatorId } = req.query;

  if (req.method === 'GET') {
    try {
      const creator = await Creator.findById(creatorId);
      if (!creator) {
        return res.status(404).json({ success: false, error: 'Creator not found' });
      }
      return res.status(200).json({ success: true, data: creator });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, email, phone, city, state, category, platforms, description, packages, price } = req.body;

      const updatedCreator = await Creator.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        city,
        state,
        category,
        platforms,
        description,
        packages,
        price,
      }, { new: true });

      if (!updatedCreator) {
        return res.status(404).json({ success: false, error: 'Creator not found' });
      }

      return res.status(200).json({ success: true, data: updatedCreator });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    // Method not allowed
    return res.status(405).end();
  }
};

export default connectDB(handler);
