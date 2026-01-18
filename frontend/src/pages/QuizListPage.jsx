import { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/quizApi";
import QuizCard from "../components/QuizCard/QuizCard";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes().then(res => setQuizzes(res.data));
  }, []);

  return (
    <div>
      <h1>Available Tests</h1>
      {quizzes.map(q => (
        <QuizCard key={q.id} quiz={q} />
      ))}
    </div>
  );
}
