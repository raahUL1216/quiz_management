import styles from "./Question.module.css";
import Option from "../Option/Option";

export default function Question({ question, onChange, answers }) {
  const isMCQ = question.question_type === "MCQ";

  const handleSelect = (optionId, checked) => {
    if (isMCQ) {
      // Merge checkbox selections properly
      const prev = answers[question.id] || [];
      const updated = checked
        ? [...prev, optionId]
        : prev.filter(id => id !== optionId);
      onChange(question.id, updated);
    } else {
      // RADIO: single selection
      onChange(question.id, optionId);
    }
  };

  return (
    <div className={styles.question}>
      <p>{question.text}</p>
      {question.options.map(opt => {
        const checked = isMCQ
          ? (answers[question.id] || []).includes(opt.id)
          : answers[question.id] === opt.id;

        return (
          <Option
            key={opt.id}
            option={opt}
            type={isMCQ ? "checkbox" : "radio"}
            name={question.id}
            checked={checked}
            onChange={handleSelect}
          />
        );
      })}
    </div>
  );
}
