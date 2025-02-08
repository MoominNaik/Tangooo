import { inorganicChemistryData } from '../../my-app/src/Components/Assets/inorganicChemistryData.js';
import { organicChemistryData } from '../../my-app/src/Components/Assets/organicChemistryData.js';
import { physicalChemistryData } from '../../my-app/src/Components/Assets/physicalChemistryData.js';
import { physicsMathsQuestionsData } from '../../my-app/src/Components/Assets/physicsMathsQuestionsData.js';
import fs from 'fs';

// Add IDs and topics to questions
const addIdsToQuestions = (questions, startId, topic) => {
  return questions.map((q, index) => ({
    id: startId + index,
    question: q.question,
    options: q.options,
    answer: q.answer,
    topic: topic
  }));
};

// Prepare the questions
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

// Write to JSON file
fs.writeFileSync('questions.json', JSON.stringify(allQuestions, null, 2));
console.log('JSON file created successfully!'); 