import "./PageLoader.css";

export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__spinner" aria-hidden="true" />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}
