import type { Metadata } from "next";

// robots.txt already disallows /admin, but a disallow alone doesn't stop the
// URL being indexed if something links to it — noindex does.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
