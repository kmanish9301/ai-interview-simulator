import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, required: true },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: String,
    explanation: String
  }],
  answers: [{ type: String }],
  results: [{
    question: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    explanation: String
  }],
  overallScore: { type: Number, default: 0 },
  summary: { type: String },
  status: { type: String, enum: ['started', 'completed'], default: 'started' }
}, { timestamps: true });

export const Interview = mongoose.model('Interview', interviewSchema);
