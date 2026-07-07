import "./Card.css";

export default function Card({ className = "", children, as: Tag = "div", ...rest }) {
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
