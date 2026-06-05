"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function safeRedirectPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/admin";

  try {
    const url = new URL(value, window.location.origin);
    const isAdminPath = url.pathname === "/admin" || url.pathname.startsWith("/admin/");
    const isLoginPath = url.pathname === "/admin/login";
    return url.origin === window.location.origin && isAdminPath && !isLoginPath
      ? `${url.pathname}${url.search}${url.hash}`
      : "/admin";
  } catch {
    return "/admin";
  }
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const from = safeRedirectPath(new URLSearchParams(window.location.search).get("from"));
        router.replace(from);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-dark-bg px-5 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8"
      >
        <div className="mb-1 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E01B24]" />
          <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            WebGaze Admin
          </span>
        </div>
        <h1 className="mb-6 font-display text-2xl font-bold">Sign in</h1>

        <label className="mb-2 block font-display text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
          Password
        </label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-white/12 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-[#E01B24]"
          placeholder="••••••••"
        />

        {error && <p className="mt-3 text-sm text-[#ff6b6b]">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 w-full rounded-lg bg-[#E01B24] px-4 py-3 font-display text-sm font-semibold text-white transition hover:bg-[#b8141b] disabled:opacity-50"
        >
          {loading ? "Checking…" : "Enter dashboard"}
        </button>
      </form>
    </main>
  );
}
