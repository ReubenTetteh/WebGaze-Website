"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingThemeToggle from "@/components/ui/FloatingThemeToggle";

/**
 * Renders the public site chrome (nav, footer, theme toggle) for everything
 * except the /admin dashboard, which is a self-contained internal tool.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <FloatingThemeToggle />
      <main>{children}</main>
      <Footer />
    </>
  );
}
