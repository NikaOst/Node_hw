import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.dotenv.port;

app.use(express.json());

app.listen(port, () => {});
