import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/config.js';
import cartRouter from './routes/carts.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/cart', cartRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
