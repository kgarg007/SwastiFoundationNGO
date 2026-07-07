import { useEffect } from "react";

/**
 * Observes all .reveal elements currently in the DOM and adds .is-visible
 * once they enter the viewport. Call once near the root of each page.
 * Respects prefers-reduced-motion via the CSS itself (see global.css).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
