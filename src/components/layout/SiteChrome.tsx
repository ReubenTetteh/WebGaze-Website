"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Renders the public site chrome (nav, footer, theme toggle) for everything
 * except the /admin dashboard, which is a self-contained internal tool, and
 * /studio, the full-bleed stage used to screen-record social posts.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isStudio = pathname?.startsWith("/studio");

  if (isAdmin || isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
