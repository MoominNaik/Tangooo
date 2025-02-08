import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true,
    enum: ['Inorganic Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Physics and Mathematics']
  }
});

export default mongoose.model('Question', questionSchema); 