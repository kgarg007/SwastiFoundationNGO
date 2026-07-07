import { useCountUp } from "../../hooks/useCountUp";

export default function ImpactStat({ value, suffix, label }) {
  const [ref, displayValue] = useCountUp(value);

  return (
    <div className="impact-stat" ref={ref}>
      <span className="impact-stat__value">
        {displayValue.toLocaleString("en-IN")}
        {suffix}
      </span>
      <span className="impact-stat__label">{label}</span>
    </div>
  );
}
