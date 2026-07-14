import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Button.css";

const MotionLink = motion.create(Link);

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

  const motionProps = {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98, y: 0 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  };

  if (to) {
    return (
      <MotionLink to={to} className={classes} ref={ref} {...motionProps} {...rest}>
        {content}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} ref={ref} {...motionProps} {...rest}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={rest.type || "button"} className={classes} ref={ref} {...motionProps} {...rest}>
      {content}
    </motion.button>
  );
});

export default Button;
