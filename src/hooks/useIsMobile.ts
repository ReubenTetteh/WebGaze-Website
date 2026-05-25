"use client";
import { useEffect, useLayoutEffect, useState } from "react";

// Layout effect before paint on the client (so mobile never flashes the
// desktop tree); plain effect on the server where layout effects are no-ops.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** True on phones/tablets. Matches the Tailwind `lg` divide by default. */
export function useIsMobile(query = "(max-width: 1023px)") {
  const [isMobile, setIsMobile] = useState(false);
  useIsoLayoutEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return isMobile;
}
