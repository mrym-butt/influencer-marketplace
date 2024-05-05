// pages/api/creator/[id].js

import connectDB from '@middleware/mongoose';
import Creator from '@model/Creator';

const handler = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const updatedCreator = await Creator.findByIdAndUpdate(id, req.body, { new: true });
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
