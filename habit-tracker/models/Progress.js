import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Habit',
  },
  date: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
  mood: {
    type: Number,
    min: [1, 'Mood not less then 1'],
    max: [5, 'Mood less then 5'],
    validate: {
      validator: Number.isInteger,
      message: 'Mood must be an integer',
    },
  },
});

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
