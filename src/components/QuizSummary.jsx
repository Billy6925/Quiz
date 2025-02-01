import React from "react";

function QuizSummary() {
    return (
        <div className="container">
            <h2 className="title">Quiz Summary</h2>
            <p>No quiz history available.</p>
        </div>
    );
}

function QuizItem({ quiz, index }) {
    return (
        <div className="quiz-card">
            <h3>Quiz {index}</h3>
            <p>Quiz details go here.</p>
        </div>
    );
}

function QuizResult({ result, idx }) {
    return (
        <div>
            <strong>Question {idx + 1}: </strong>{result.question}
        </div>
    );
}

export default QuizSummary;
