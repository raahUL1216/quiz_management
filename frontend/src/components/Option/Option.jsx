export default function Option({ option, type, name, onChange }) {
  return (
    <label>
      <input
        type={type}
        name={name}
        value={option.id}
        onChange={e => onChange(option.id, e.target.checked)}
      />
      {option.label}
    </label>
  );
}
