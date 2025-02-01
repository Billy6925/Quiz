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
