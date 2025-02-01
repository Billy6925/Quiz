import React from "react";
import React, { useState, useEffect } from "react";

function Result() {
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedQuiz = JSON.parse(localStorage.getItem("lastQuizData")) || {};
    const { questions = [], results = [] } = storedQuiz;
  
    setQuestions(questions);
    setResults(results);
  
    const correctCount = results.filter(r => r.isCorrect).length;
    setScore(correctCount);
  }, []);

  const saveQuizHistory = (quizData) => {
    if (!quizData.results?.length) return;
    
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    localStorage.setItem("quizHistory", JSON.stringify([quizData, ...history]));
    localStorage.removeItem("quizState");
  };
  
  

  return <div>Result Component</div>;
}

export default Result;
