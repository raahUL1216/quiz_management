import { useNavigate } from "react-router-dom";
import styles from "./QuizCard.module.css";

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/quiz/${quiz.id}`)}
    >
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
    </div>
  );
}
