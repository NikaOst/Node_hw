import express from 'express';
import { getDB } from '../db/index.js';
const authRouter = express.Router();

// Registration
// POST http://127.0.0.1:3333/auth/register
authRouter.post('/register', (req, res) => {
  try {
    const db = getDB();
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json('username, email and password are required!');
    }
  } catch (error) {}
});

// Authorithation
// POST http://127.0.0.1:3333/auth/login
authRouter.post('/login', (req, res) => {});

export default authRouter;
