import Link from "next/link";

export default function Button({
  children,
  variant = "default",
  size = "md",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  const variants = {
    default: "btn",
    primary: "btn btn-primary",
    ghost: "btn btn-ghost",
  };

  const sizes = {
    sm: "btn-sm",
    md: "",
  };

  const cls = [variants[variant] || "btn", sizes[size], className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
