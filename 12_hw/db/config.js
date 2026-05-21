import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI || 'uri';
const client = new MongoClient(uri);

let dbConnection = null;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    dbConnection = client.db();
  } catch (error) {
    console.error('Faild to start the server due toMongoDB connection issue', error);
  }
}

function getDb() {
  if (!dbConnection) {
    throw new Error('Database not connected');
  }
  return dbConnection;
}

export { connectToDatabase, getDb };
