import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Result() {
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuiz = JSON.parse(localStorage.getItem("lastQuizData")) || {};
    const { questions = [], results = [] } = storedQuiz;

    setQuestions(questions);
    setResults(results);

    const correctCount = results.filter(r => r.isCorrect).length;
    setScore(correctCount);

    saveQuizHistory(storedQuiz);
  }, []);

  const saveQuizHistory = (quizData) => {
    if (!quizData.results?.length) return;
    
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    localStorage.setItem("quizHistory", JSON.stringify([quizData, ...history]));
    localStorage.removeItem("quizState");
  };

  return (
    <div className="result-container">
      <h2 className="score-heading">Final Score: {score} / {questions.length}</h2>
      <h3 className="percentage-heading">Percentage: {((score / (results.length || 1)) * 100).toFixed(2)}%</h3>

      <ul className="results-list">
        {results.map((res, i) => (
          <li key={i} className="result-item">
            <strong>Q{i + 1}: </strong>{res.question}
            <br />
            <strong>Your Answer: </strong>
            <span className={res.isCorrect ? "correct-answer" : "incorrect-answer"}>
              {res.userAnswer} {res.isCorrect ? "✓" : "✗"}
            </span>
            {!res.isCorrect && <><br /><strong>Correct Answer: </strong>{res.correctAnswer}</>}
          </li>
        ))}
      </ul>

      <div className="button-container">
        <Button variant="primary" onClick={() => navigate("/categories")}>Try Another Quiz</Button>
        <Button variant="secondary" onClick={() => navigate("/summary")}>View Summary</Button>
      </div>
    </div>
  );
}

export default Result;
