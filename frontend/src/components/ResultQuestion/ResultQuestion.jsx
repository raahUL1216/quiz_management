import styles from "./ResultQuestion.module.css";

export default function ResultQuestion({ data }) {
  return (
    <div
      className={
        data.is_correct ? styles.correct : styles.incorrect
      }
    >
      <p>Question ID: {data.question_id}</p>
      <p>Your Answer: {JSON.stringify(data.submitted_answer)}</p>
      <p>Score: {data.score_awarded}</p>
    </div>
  );
}
