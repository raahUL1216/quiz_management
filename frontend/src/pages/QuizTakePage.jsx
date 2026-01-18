import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizDetail, submitQuiz } from "../api/quizApi";
import Question from "../components/Question/Question";

export default function QuizTakePage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuizDetail(quizId).then(res => setQuiz(res.data));
  }, [quizId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const res = await submitQuiz(quizId, { answers });
    navigate(`/quiz/${quizId}/result`, { state: res.data });
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h2>{quiz.title}</h2>

      {quiz.questions.map(q => (
        <Question
          key={q.id}
          question={q}
          onChange={handleAnswerChange}
        />
      ))}

      <button onClick={handleSubmit}>Submit Test</button>
    </div>
  );
}
