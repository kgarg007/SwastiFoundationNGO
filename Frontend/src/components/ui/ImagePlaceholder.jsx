import "./ImagePlaceholder.css";

/**
 * TODO: Replace with actual NGO image once provided by the organisation.
 * This placeholder keeps consistent aspect ratio + visual treatment so
 * swapping in a real <img src="..."> later requires no layout changes.
 */
export default function ImagePlaceholder({ label, ratio = "4 / 3", icon = "image", className = "" }) {
  return (
    <div className={`img-placeholder ${className}`.trim()} style={{ aspectRatio: ratio }} role="img" aria-label={label || "Image placeholder"}>
      <span className="img-placeholder__icon" aria-hidden="true">
        {icon === "video" ? "▶" : "⛰"}
      </span>
      {label && <span className="img-placeholder__label">{label}</span>}
    </div>
  );
}
