import express from 'express';
import User from '../models/User.js';

const balanceRouter = express.Router();

// POST http://127.0.0.1:3333/api/user/set-balance
balanceRouter.post('/set-balance', async (req, res) => {
  try {
    const { initialBalance } = req.body;
    if (!initialBalance || !isFinite(initialBalance))
      return res.status(400).json({ message: 'Initial balance must be a number only!' });
    const balance = await User.create({
      initialBalance,
      currentBalance: initialBalance,
      transactions: [],
    });
    res.status(201).json({ balance });
  } catch (error) {
    res.status(500).json({ message: 'Cannot set a new balance', error: error.message });
  }
});

export default balanceRouter;
