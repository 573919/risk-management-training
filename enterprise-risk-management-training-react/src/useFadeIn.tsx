import {
  useRef,
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from "react";

export function useFadeIn() {
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<number, Element>>(new Map());

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.fadeIndex);
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            setVisibleSet((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.15 },
    );

    elementsRef.current.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const fadeRef = useCallback((el: HTMLElement | null, index: number) => {
    if (el) {
      el.dataset.fadeIndex = String(index);
      elementsRef.current.set(index, el);
      observerRef.current?.observe(el);
    }
  }, []);

  const getFadeStyle = useCallback(
    (index: number): CSSProperties => ({
      opacity: visibleSet.has(index) ? 1 : 0,
      transform: visibleSet.has(index) ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.75s ease, transform 0.75s ease",
    }),
    [visibleSet],
  );

  return { fadeRef, getFadeStyle };
}
