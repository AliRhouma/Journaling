export default function Badge({ children, variant = "default", size = "md", className = "" }) {
  const variants = {
    default: "badge",
    yellow: "badge badge-yellow",
  };

  const sizes = {
    sm: "badge-sm",
    md: "",
  };

  const cls = [variants[variant] || "badge", sizes[size], className]
    .filter(Boolean)
    .join(" ");

  return <span className={cls}>{children}</span>;
}
