import Option from "../Option/Option";
import styles from "./Question.module.css";

export default function Question({ question, onChange }) {
  const isMCQ = question.question_type === "MCQ";

  const handleSelect = (optionId, checked) => {
    if (isMCQ) {
      onChange(
        question.id,
        prev =>
          checked
            ? [...(prev || []), optionId]
            : prev.filter(id => id !== optionId)
      );
    } else {
      onChange(question.id, optionId);
    }
  };

  return (
    <div className={styles.question}>
      <p>{question.text}</p>

      {question.options.map(opt => (
        <Option
          key={opt.id}
          option={opt}
          type={isMCQ ? "checkbox" : "radio"}
          name={question.id}
          onChange={handleSelect}
        />
      ))}
    </div>
  );
}
