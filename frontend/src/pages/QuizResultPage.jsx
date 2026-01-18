import { useLocation } from "react-router-dom";
import ResultQuestion from "../components/ResultQuestion/ResultQuestion";

export default function QuizResultPage() {
  const { state } = useLocation();

  return (
    <div>
      <h2>Test Result</h2>
      <h3>Total Score: {state.total_score}</h3>

      {state.questions.map(q => (
        <ResultQuestion key={q.question_id} data={q} />
      ))}
    </div>
  );
}
