"use client";

import { useEffect, useRef } from "react";

// Cloudflare Turnstile widget. Renders nothing until you set
// NEXT_PUBLIC_TURNSTILE_SITE_KEY, so local/dev and pre-setup deploys still work.

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** True when a site key is configured — forms use this to decide whether to require a token. */
export const turnstileEnabled = !!SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

type TurnstileProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  theme?: "auto" | "light" | "dark";
  className?: string;
};

export default function Turnstile({ onVerify, onExpire, theme = "auto", className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  // Keep latest callbacks in a ref so the effect can run once without re-rendering the widget.
  const cbs = useRef({ onVerify, onExpire });
  cbs.current = { onVerify, onExpire };

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme,
        callback: (token: string) => cbs.current.onVerify(token),
        "expired-callback": () => cbs.current.onExpire?.(),
        "error-callback": () => cbs.current.onExpire?.(),
      });
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
      if (existing) {
        existing.addEventListener("load", renderWidget);
      } else {
        const script = document.createElement("script");
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", renderWidget);
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* widget already gone */
        }
      }
      widgetId.current = null;
    };
  }, [theme]);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className={className} />;
}
