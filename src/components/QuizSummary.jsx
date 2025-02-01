import React from "react";

function QuizSummary() {
    const [quizHistory, setQuizHistory] = useState([]);
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
        setQuizHistory(storedHistory);
    }, []);
    

    return (
        <div className="container">
            <h2 className="title">Quiz Summary</h2>
            {quizHistory.length > 0 ? (
                quizHistory.map((quiz, index) => (
                    <QuizItem key={index} quiz={quiz} index={quizHistory.length - index} />
                ))
            ) : (
                <p className="message">No quiz history available. Take a quiz to see your results here!</p>
            )}
        </div>
    );
}

function QuizItem({ quiz, index }) {
    const total = quiz.results.length;
    const score = quiz.results.filter(r => r.isCorrect).length;
    const percentage = ((score / total) * 100).toFixed(2);

    return (
        <div className="quiz-card">
            <h3 className="quiz-title">Quiz {index}</h3>
            <p className="quiz-score">Final Score: {score} / {total}</p>
            <p className="quiz-percentage">Percentage: {percentage}%</p>
            <h4 className="results-title">Results:</h4>
            <ul className="results-list">
                {quiz.results.map((result, idx) => (
                    <QuizResult key={idx} result={result} idx={idx} />
                ))}
            </ul>
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
