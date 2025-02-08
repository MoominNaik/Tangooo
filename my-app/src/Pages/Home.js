import React from 'react';
import './CSS/Home.css';
import Questions from '../Components/Questions/Questions.js';
import ChemistryQuiz from '../Components/Quiz/ChemistryQuiz.js';

const Home = () => {
  return (
    <>
      <div className="practice-message">
        <h3>Dashboard</h3>
      </div>
      <Questions />
      <div className='chemistry-quiz-msg'>
        <h3>Take a Chemistry Quiz</h3>
      </div>
      <ChemistryQuiz/>  
      
    </>
    
  );
};

export default Home;