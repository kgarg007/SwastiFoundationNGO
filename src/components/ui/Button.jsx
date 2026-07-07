import { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Reusable Button. Renders as <button>, <Link> (internal), or <a> (external)
 * depending on the props provided, while keeping consistent visual styling.
 */
const Button = forwardRef(function Button(
  { as: _as, to, href, variant = "primary", size = "md", icon, iconPosition = "right", className = "", children, ...rest },
  ref
) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();
  const content = (
    <>
      {icon && iconPosition === "left" && <span className="btn__icon" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="btn__icon" aria-hidden="true">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} ref={ref} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} ref={ref} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={rest.type || "button"} className={classes} ref={ref} {...rest}>
      {content}
    </button>
  );
});

export default Button;
