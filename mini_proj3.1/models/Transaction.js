import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: {
      values: ['income', 'expense'],
      message: 'Type of transaction must be income or expense only',
    },
  },
  amount: {
    type: Number,
    min: 0,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
