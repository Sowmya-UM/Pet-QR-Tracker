// pages/api/notify-owner.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;

    // TODO: Implement your notification logic here (e.g., send email, log, webhook, etc.)
    console.log(`Location shared: Lat: ${latitude}, Lng: ${longitude}`);

    return res.status(200).json({ success: true, message: 'Owner notified!' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
