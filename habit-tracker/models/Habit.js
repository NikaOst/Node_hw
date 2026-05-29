import mongoose, { now } from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['health', 'education', 'productivity', 'mindfulness'],
      message: 'There no such category',
    },
  },
  difficulty: {
    type: String,
    enum: { values: ['easy', 'medium', 'hard'], message: 'There no such difficulty' },
  },
  streak: {
    type: Number,
    default: 0,
  },
  bestStreak: {
    type: Number,
    default: 0,
  },
  totalCompletions: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
