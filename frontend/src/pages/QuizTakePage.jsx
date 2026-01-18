import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizDetail, submitQuiz } from "../api/quizApi";
import Question from "../components/Question/Question";
import Loader from "../components/Loader/Loader";

export default function QuizTakePage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuizDetail(quizId)
      .then(res => setQuiz(res.data))
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await submitQuiz(quizId, { answers });
      navigate(`/quiz/${quizId}/result`, { state: res.data });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div>
      <h2>{quiz.title}</h2>

      {quiz.questions.map(q => (
        <Question
          key={q.id}
          question={q}
          onChange={handleAnswerChange}
          answers={answers}  // pass current answers for controlled inputs
        />
      ))}

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Test"}
      </button>
    </div>
  );
}
