"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const services = [
  "Website Design & Development",
  "Website Maintenance",
  "Consulting & Audit",
  "Branding",
  "Search Engine Optimisation",
];

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer className="bg-[#080808] text-[#fafafa] border-t border-dark-border">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image src="/images/logo-white-cropped.png" alt="WebGaze" width={180} height={45} className="h-7 w-auto" />
            </Link>
            <p className="text-sm text-dark-muted font-body leading-relaxed max-w-[260px]">
              Empowering brands with smart, creative, and impactful web solutions — where ideas take shape online.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {/* Social placeholders */}
              {["in", "tw", "ig"].map((s) => (
                <span key={s} className="w-8 h-8 rounded-full border border-dark-border flex items-center justify-center text-xs font-display
                                          hover:border-red-brand hover:text-red-brand transition-colors duration-200 cursor-pointer">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-dark-muted mb-5">Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-[#c0c0c0] hover:text-red-brand transition-colors duration-200">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-dark-muted mb-5">Company</p>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#c0c0c0] hover:text-red-brand transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/terms-and-conditions" className="text-sm text-[#c0c0c0] hover:text-red-brand transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-dark-muted mb-5">Get In Touch</p>
            <ul className="space-y-3">
              <li>
                <a href="tel:0411078843" className="text-sm text-[#c0c0c0] hover:text-red-brand transition-colors duration-200">
                  04 1107 8843
                </a>
              </li>
              <li>
                <a href="mailto:hello@webgaze.com.au" className="text-sm text-[#c0c0c0] hover:text-red-brand transition-colors duration-200">
                  hello@webgaze.com.au
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs font-display font-semibold tracking-[0.12em] uppercase text-dark-muted mb-3">Newsletter</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-dark-surface border border-dark-border rounded-full px-4 py-2.5 text-sm text-[#fafafa]
                             placeholder:text-dark-muted focus:outline-none focus:border-red-brand transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="bg-red-brand rounded-full px-5 py-2.5 text-white text-xs font-display font-semibold
                             hover:bg-red-dark transition-colors duration-200"
                >
                  →
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-dark-muted">© 2026 WebGaze PTY LTD. All rights reserved. ABN 53 694 048 158</p>
          <div className="flex gap-5">
            <Link href="/terms-and-conditions" className="text-xs text-dark-muted hover:text-red-brand transition-colors duration-200">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-xs text-dark-muted hover:text-red-brand transition-colors duration-200">
              Privacy & Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
