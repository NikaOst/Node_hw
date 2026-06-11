import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

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

// POST http://127.0.0.1:3333/api/user/:id/add-balance
balanceRouter.post('/:id/add-balance', async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.params.id;
    if (!amount) return res.status(404).json({ message: 'Amount cannot be empty' });
    if (amount < 0) return res.status(400).json({ message: 'Amount must be more than 0' });
    const user = await User.findById(userId);
    user.currentBalance += amount;
    const transaction = await Transaction.create({ type: 'income', amount: amount });
    user.transactions.push(transaction.id);
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Cannot add to the balance', error: error.message });
  }
});

// POST http://127.0.0.1:3333/api/user/:id/add-expense
balanceRouter.post('/:id/add-expense', async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.params.id;
    if (!amount) return res.status(404).json({ message: 'Amount cannot be empty' });
    if (amount < 0) return res.status(400).json({ message: 'Amount must be more than 0' });
    const user = await User.findById(userId);
    if (user.currentBalance < amount)
      return res.status(400).json({ message: 'Not enough money at the balance' });
    user.currentBalance -= amount;
    const transaction = await Transaction.create({ type: 'expense', amount: amount });
    user.transactions.push(transaction.id);
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Cannot withdraw money from the balance', error: error.message });
  }
});

// GET http://127.0.0.1:3333/api/user/balance
balanceRouter.get('/balance', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(404).json({ message: 'UserId cannot be empty' });
    const user = await User.findById(userId).populate('transactions', 'type amount date');
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Cannot get balance', error: error.message });
  }
});

export default balanceRouter;
