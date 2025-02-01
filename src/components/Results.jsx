import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
    const storedQuizData = JSON.parse(localStorage.getItem("lastQuizData")) || {};
    
    setUserAnswers(storedAnswers);
    setQuestions(storedQuizData.questions || []);
    setResults(storedQuizData.results || []);

    if (storedQuizData.results) {
      const correctCount = storedQuizData.results.filter(r => r.isCorrect).length;
      const total = storedQuizData.results.length;
      setScore(correctCount);
      setPercentage(((correctCount / total) * 100).toFixed(2));
    }
    
    completeQuiz(storedQuizData);
  }, []);

  const completeQuiz = (quizData) => {
    if (!quizData.results) return;

    const newQuizData = {
      questions: quizData.questions,
      results: quizData.results,
    };

    const existingHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    existingHistory.unshift(newQuizData);
    localStorage.setItem("quizHistory", JSON.stringify(existingHistory));
    localStorage.removeItem('quizState');
  };

  const handleTryAnother = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("userAnswers");
      localStorage.removeItem("lastQuizData");
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/categories");
    } catch (error) {
      console.error("Navigation error:", error);
      setIsLoading(false);
    }
  };

  const handleRestartQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("userAnswers");
      localStorage.removeItem("lastQuizData");
      setScore(0);
      setPercentage(0);
      navigate("/quiz");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="result-container">
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '20px auto'
          }}></div>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="result-container">
      <div className="quiz-title">Quiz Results</div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <div className="quiz-score">Score: {score} / {questions.length}</div>
        <div className="quiz-percentage">Percentage: {percentage}%</div>
      </div>
      
      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
            <div style={{ marginBottom: '8px' }}>Question {index + 1}:</div>
            <div style={{ marginBottom: '8px' }}>{result.question}</div>
            <div style={{ marginBottom: '4px' }}>
              Your Answer: {result.userAnswer}
              <span style={{ marginLeft: '8px' }}>{result.isCorrect ? "✓" : "✗"}</span>
            </div>
            {!result.isCorrect && (
              <div>
                Correct Answer: {result.correctAnswer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="button-container">
        <button
          onClick={handleTryAnother}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Try Another Quiz'}
        </button>
        <button
          onClick={handleRestartQuiz}
          disabled={isLoading}
          style={{ margin: '0 10px' }}
        >
          {isLoading ? 'Restarting...' : 'Restart Quiz'}
        </button>
        <button
          onClick={() => navigate("/summary")}
          disabled={isLoading}
        >
          View Summary
        </button>
      </div>
    </div>
  );
};

export default Result;