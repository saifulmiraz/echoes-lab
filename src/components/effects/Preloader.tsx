"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * "Signal detected" intro. Shows once per session, never blocks content for
 * reduced-motion visitors, and removes itself from the DOM when done.
 */
export default function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    if (sessionStorage.getItem("echoz-intro") === "seen") {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("echoz-intro", "seen");
    }, 1900);
    return () => clearTimeout(t);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-end gap-1" aria-hidden="true">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-signal-cyan"
                  initial={{ height: 6 }}
                  animate={{ height: [6, 34, 6] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <motion.p
              className="font-display text-eyebrow uppercase text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Signal detected
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
