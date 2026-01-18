import { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/quizApi";
import QuizCard from "../components/QuizCard/QuizCard";
import Loader from "../components/Loader/Loader";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes()
      .then(res => setQuizzes(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Available Tests</h1>
      {quizzes.map(q => (
        <QuizCard key={q.id} quiz={q} />
      ))}
    </div>
  );
}
