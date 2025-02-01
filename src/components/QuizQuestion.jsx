import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from '../contexts/QuizContext';

const QuizQuestion = () => {
    const { questions } = useContext(QuizContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedState = localStorage.getItem('quizState');
        if (savedState) {
            const { currentIndex: savedIndex, userAnswers: savedAnswers } = JSON.parse(savedState);
            setCurrentIndex(savedIndex);
            setUserAnswers(savedAnswers);
            setSelectedAnswer(savedAnswers[savedIndex] || "");
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading && questions.length > 0) {
            localStorage.setItem('quizState', JSON.stringify({
                currentIndex,
                userAnswers,
            }));
        }
    }, [currentIndex, userAnswers, questions, loading]);

    const handleAnswerSelection = (option) => {
        setSelectedAnswer(option);
        setShowError(false);
        const newAnswers = [...userAnswers];
        newAnswers[currentIndex] = option;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (!selectedAnswer) {
            setShowError(true);
            return;
        }
        
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(userAnswers[currentIndex + 1] || "");
            setShowError(false);
        } else {
            completeQuiz();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedAnswer(userAnswers[currentIndex - 1] || "");
            setShowError(false);
        }
    };

    const completeQuiz = () => {
        setCompleted(true);
        localStorage.setItem("lastQuizData", JSON.stringify({
            questions: questions,
            results: questions.map((q, index) => ({
                question: q.question,
                userAnswer: userAnswers[index],
                correctAnswer: q.correctAnswer,
                isCorrect: userAnswers[index] === q.correctAnswer
            }))
        }));
        localStorage.removeItem('quizState');
        navigate("/results");
    };

    if (loading) return <div>Loading questions...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!questions || questions.length === 0) return <div>No questions available</div>;

    const progress = ((currentIndex + 1) / questions.length) * 100;
    const currentQuestion = questions[currentIndex];

    return (
        <div className="quiz-container">
            <div>
                <div style={{ background: '#f3f3f3', borderRadius: '4px' }}>
                    <div 
                        className="progress-bar" 
                        style={{ width: `${progress}%` }} 
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '8px', color: '#666' }}>
                    Question {currentIndex + 1} of {questions.length}
                </div>
            </div>

            <div>
                <h2>{currentQuestion.question}</h2>
                {showError && (
                    <div style={{ color: 'red', marginBottom: '10px' }}>
                        Please answer the question before proceeding!
                    </div>
                )}
                <div className="quiz-options">
                    {currentQuestion.options.map((option, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                checked={selectedAnswer === option}
                                onChange={() => handleAnswerSelection(option)}
                                style={{ marginRight: '10px' }}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                >
                    {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
        </div>
    );
};




export default QuizQuestion;

