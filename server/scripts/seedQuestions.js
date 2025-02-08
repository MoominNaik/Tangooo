import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Question from '../models/Question.js';

// Import using named exports
import { physicsMathsQuestionsData } from '../../my-app/src/Components/Assets/physicsMathsQuestionsData.js';
import { inorganicChemistryData } from '../../my-app/src/Components/Assets/inorganicChemistryData.js';
import { organicChemistryData } from '../../my-app/src/Components/Assets/organicChemistryData.js';
import { physicalChemistryData } from '../../my-app/src/Components/Assets/physicalChemistryData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const addIdsToQuestions = (questions, startId, topic) => {
  return questions.map((q, index) => ({
    ...q,
    id: startId + index,
    topic: topic
  }));
};

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tango');
    console.log('Connected to database successfully');
    
    // Clear existing questions
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Add IDs and topics to questions
    const inorganicQuestions = addIdsToQuestions(inorganicChemistryData, 1000, 'Inorganic Chemistry');
    const organicQuestions = addIdsToQuestions(organicChemistryData, 2000, 'Organic Chemistry');
    const physicalQuestions = addIdsToQuestions(physicalChemistryData, 3000, 'Physical Chemistry');
    const physicsMathsQuestions = addIdsToQuestions(physicsMathsQuestionsData, 4000, 'Physics and Mathematics');

    // Combine all questions
    const allQuestions = [
      ...inorganicQuestions,
      ...organicQuestions,
      ...physicalQuestions,
      ...physicsMathsQuestions
    ];

    console.log('Total questions to insert:', allQuestions.length);
    console.log('Sample question:', allQuestions[0]);

    // Insert all questions
    await Question.insertMany(allQuestions);
    console.log(`Inserted ${allQuestions.length} questions successfully`);
    
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`Validation error for field ${key}:`, error.errors[key].message);
      });
    }
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase(); 