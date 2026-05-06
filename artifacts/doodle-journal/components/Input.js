"use client";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  multiline = false,
  rows = 5,
  name,
  id,
  autoFocus = false,
}) {
  const cls = `input${className ? " " + className : ""}`;

  if (multiline) {
    return (
      <textarea
        className={cls}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        name={name}
        id={id}
        autoFocus={autoFocus}
      />
    );
  }

  return (
    <input
      type={type}
      className={cls}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      autoFocus={autoFocus}
    />
  );
}
