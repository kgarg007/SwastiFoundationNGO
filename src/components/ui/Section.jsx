import "./Section.css";

/**
 * Consistent vertical rhythm + max-width wrapper for page sections.
 * `tone` controls background: "base" | "alt" | "deep".
 */
export default function Section({ tone = "base", id, className = "", children, as: Tag = "section" }) {
  return (
    <Tag id={id} className={`section section--${tone} ${className}`.trim()}>
      <div className="container">{children}</div>
    </Tag>
  );
}
