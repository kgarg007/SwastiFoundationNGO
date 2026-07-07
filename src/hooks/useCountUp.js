import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `target` once the referenced element
 * scrolls into view. Returns [ref, displayValue].
 */
export function useCountUp(target, { duration = 1400 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            if (prefersReducedMotion) {
              setValue(target);
              return;
            }
            const start = performance.now();
            const step = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, value];
}
