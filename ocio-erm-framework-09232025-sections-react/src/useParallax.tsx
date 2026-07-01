import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type CSSProperties,
} from "react";

export function useParallax() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Returns a translateY offset for a slide's background layer.
   * Progress is calculated relative to each slide's viewport position,
   * so the effect stays consistent regardless of slide index.
   *
   * speed 0.08 → max ±72px offset (background extends -25%, so ~225px headroom).
   */
  const getParallaxStyle = useCallback(
    (index: number, speed: number): CSSProperties => {
      const vh = typeof window !== "undefined" ? window.innerHeight : 900;
      const slideCenter = index * vh + vh / 2;
      const viewportCenter = scrollY + vh / 2;
      const progress = (viewportCenter - slideCenter) / vh;
      const offset = progress * speed * vh;
      return { transform: `translateY(${offset}px)` };
    },
    [scrollY],
  );

  return { scrollRef, getParallaxStyle };
}
