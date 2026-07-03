"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A soft radial light that trails the cursor across the whole page. Disabled
 * for reduced-motion and for coarse (touch) pointers where it has no meaning.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...pos };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    const loop = () => {
      eased.x += (pos.x - eased.x) * 0.12;
      eased.y += (pos.y - eased.y) * 0.12;
      el.style.transform = `translate3d(${eased.x - 300}px, ${eased.y - 300}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[600px] w-[600px] rounded-full opacity-60 blur-[120px] md:block"
      style={{
        background: "rgba(20, 48, 91, 0.35)",
        willChange: "transform",
      }}
    />
  );
}
