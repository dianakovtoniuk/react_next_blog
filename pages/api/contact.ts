import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactMessage {
  email: string;
  name: string;
  message: string;
}

type ContactResponse = {
  message: string;
  data?: ContactMessage & { id: string };
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }

  const { email, name, message } = req.body as Partial<ContactMessage>;

  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !message ||
    message.trim() === ''
  ) {
    res.status(422).json({ message: 'Invalid input.' });
    return;
  }

  const connectionString = process.env.MONGODB_URI;

  if (!connectionString) {
    res.status(500).json({ message: 'Database is not configured.' });
    return;
  }

  const newMessage: ContactMessage = { email, name, message };

  let client: MongoClient;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database.' });
    return;
  }

  try {
    const db = client.db();
    const result = await db.collection('messages').insertOne({ ...newMessage });

    res.status(201).json({
      message: 'Successfully stored message!',
      data: { ...newMessage, id: result.insertedId.toString() },
    });
  } catch (error) {
    res.status(500).json({ message: 'Storing message failed!' });
  } finally {
    await client.close();
  }
}

export default handler;
