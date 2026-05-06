import Badge from "./Badge";

export default function PageHeader({ title, subtitle, badge, emoji }) {
  return (
    <header className="page-header">
      <div className="page-header-text">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {badge && (
          <div style={{ marginTop: 14 }}>
            <Badge variant="yellow">{badge}</Badge>
          </div>
        )}
      </div>
      {emoji && (
        <span
          style={{
            fontSize: "4rem",
            flexShrink: 0,
            display: "block",
            animation: "wobble 4s ease-in-out infinite",
            transformOrigin: "bottom center",
          }}
        >
          {emoji}
        </span>
      )}
    </header>
  );
}
