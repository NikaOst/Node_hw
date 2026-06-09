import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  initialBalance: {
    type: Number,
    required: true,
    min: 0,
  },
  currentBalance: {
    type: Number,
    required: true,
    min: 0,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
      required: true,
    },
  ],
});

const User = mongoose.model('User', userSchema);
export default User;
