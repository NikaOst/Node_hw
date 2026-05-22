import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI || 'uri';

startServer();
async function startServer() {
  try {
    await mongoose.connect(dbURI);
    console.log('Successfully connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
