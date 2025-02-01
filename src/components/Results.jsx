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
  

  return <div>Result Component</div>;
}

export default Result;
