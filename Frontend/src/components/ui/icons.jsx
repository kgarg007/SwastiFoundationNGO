// Minimal hand-rolled icon set — avoids pulling in a large icon library
// for a handful of glyphs, keeping the bundle lean for CDN delivery.

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function BookOpen(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M12 6.5c-1.6-1.3-4-2-6.5-2-.5 0-1 .1-1.5.2v12.6c.5-.1 1-.2 1.5-.2 2.5 0 4.9.7 6.5 2 1.6-1.3 4-2 6.5-2 .5 0 1 .1 1.5.2V4.7c-.5-.1-1-.2-1.5-.2-2.5 0-4.9.7-6.5 2Z" />
      <path d="M12 6.5v13" />
    </svg>
  );
}

export function Users(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.5 14.2c2.4.3 4.5 2.2 4.5 4.8" />
    </svg>
  );
}

export function HeartPulse(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M12 20s-7.5-4.6-9.7-9.3C.8 7.4 2.4 4.3 5.6 4c2-.2 3.6 1 4.4 2.3l.3.5.3-.5C11.4 5 13 3.8 15 4c3.2.3 4.8 3.4 3.3 6.7" />
      <path d="M3.5 12.5h3l1.5-2.6 2 4.2 1.5-2.6h4.7" />
    </svg>
  );
}

export function Baby(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <circle cx="12" cy="8.5" r="4" />
      <path d="M8.5 7c.3-1 1.6-1.6 2.4-1 .6.5 1.2.5 1.8 0 .8-.6 2.1 0 2.4 1" />
      <path d="M5 20c0-3 3-5.5 7-5.5s7 2.5 7 5.5" />
    </svg>
  );
}

export function Leaf(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M19.5 4.5c-7 0-13 4.5-14.8 11.3-.4 1.7.9 3 2.6 2.6C14.1 16.6 19.5 11 19.5 4.5Z" />
      <path d="M6 18c2-3.6 5-7 11.5-11" />
    </svg>
  );
}

export function Hammer(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M14.5 6.5 18 3l2.5 2.5-3.5 3.5" />
      <path d="M15.7 8.3 4.5 19.5l-1.3-1.3L14.4 7" />
      <path d="M11.5 5.5l2.5 2.5" />
    </svg>
  );
}

export function Home(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5h12V10" />
      <path d="M10 19.5V14h4v5.5" />
    </svg>
  );
}

export function PawPrint(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <ellipse cx="12" cy="16" rx="4.2" ry="3.4" />
      <circle cx="6.5" cy="10.5" r="1.6" />
      <circle cx="10.2" cy="7.5" r="1.6" />
      <circle cx="14.8" cy="7.5" r="1.6" />
      <circle cx="18" cy="10.5" r="1.6" />
    </svg>
  );
}

export function Facebook(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Instagram(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Youtube(props) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  );
}

export const iconMap = {
  BookOpen,
  Users,
  HeartPulse,
  Baby,
  Leaf,
  Hammer,
  Home,
  PawPrint,
};
