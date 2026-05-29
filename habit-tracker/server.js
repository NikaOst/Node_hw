import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import habitsRouter from './routes/habits.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI || 'uri';

app.use(express.json());

app.use('/auth', authRouter);
app.use('/habits', habitsRouter);

startServer();
async function startServer() {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to DB!');
    app.listen(port, () => {
      console.log(`Server is running at http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}
