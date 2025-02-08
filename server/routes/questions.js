import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get questions by topic
router.get('/topic/:topic', async (req, res) => {
  try {
    const questions = await Question.find({ topic: req.params.topic });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get random questions by topic and count
router.get('/random/:topic/:count', async (req, res) => {
  try {
    const questions = await Question.aggregate([
      { $match: { topic: req.params.topic } },
      { $sample: { size: parseInt(req.params.count) } }
    ]);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new question (protected route - add authentication middleware as needed)
router.post('/', async (req, res) => {
  const question = new Question(req.body);
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 