import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://127.0.0.1:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect DB and start server', err);
  });
