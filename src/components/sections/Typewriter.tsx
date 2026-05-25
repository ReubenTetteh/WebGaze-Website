"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const ROTATING_PHRASES = ["deliver results.", "build trust.", "drive growth."] as const;

/* Typewriter timing (ms) */
const TYPE_MS = 70;        // per character while typing
const DELETE_MS = 38;      // per character while deleting
const HOLD_FULL_MS = 1500; // pause once a word is fully typed
const HOLD_EMPTY_MS = 350; // pause after clearing, before the next word

const LONGEST_PHRASE = ROTATING_PHRASES.reduce((a, b) => (a.length > b.length ? a : b));

/* ──────────────────────────────────────────────────────────
   Typewriter — types the ending word, holds, clears, types the
   next one, looping. The fixed lead-in ("Designed to") lives in
   the caller.
   ────────────────────────────────────────────────────────── */
export function Typewriter() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return; // honour reduced-motion: render the word statically
    const current = ROTATING_PHRASES[index];

    let delay: number;
    if (!deleting) delay = text.length < current.length ? TYPE_MS : HOLD_FULL_MS;
    else delay = text.length > 0 ? DELETE_MS : HOLD_EMPTY_MS;

    const id = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) setText(current.slice(0, text.length + 1));
        else setDeleting(true);
      } else {
        if (text.length > 0) setText(current.slice(0, text.length - 1));
        else {
          setDeleting(false);
          setIndex((i) => (i + 1) % ROTATING_PHRASES.length);
        }
      }
    }, delay);

    return () => clearTimeout(id);
  }, [text, deleting, index, reduceMotion]);

  const display = reduceMotion ? ROTATING_PHRASES[0] : text;

  return (
    // Inline-flex with an invisible sizer (longest phrase + cursor) locks the box
    // width so the line's right edge never reflows and stays aligned with the rest
    // of the hero. The typed text overlays it absolutely, anchored to the left so it
    // reads left-to-right immediately after "Designed to".
    <span className="relative inline-flex align-baseline whitespace-pre">
      <span aria-hidden="true" className="invisible font-bold">{LONGEST_PHRASE}|</span>
      {/* static label so screen readers don't read the animation character-by-character */}
      <span className="sr-only">deliver results, build trust, drive growth</span>
      <span aria-hidden="true" className="absolute left-0 top-0 text-left font-bold text-red-brand">
        {display}
        {!reduceMotion && (
          <motion.span
            className="font-normal"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: "linear" }}
          >
            |
          </motion.span>
        )}
      </span>
    </span>
  );
}
