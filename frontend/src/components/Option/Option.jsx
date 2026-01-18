export default function Option({ option, type, name, checked, onChange }) {
  return (
    <label style={{ display: "block", marginBottom: "8px" }}>
      <input
        type={type}
        name={name}
        value={option.id}
        checked={checked}
        onChange={e => onChange(option.id, e.target.checked)}
      />
      {option.label}
    </label>
  );
}
