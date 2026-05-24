"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "이번 달 책", href: "#book" },
  { label: "독서 기록", href: "#reviews" },
  { label: "모임 일정", href: "#schedule" },
  { label: "멤버", href: "#members" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-5 bg-[#BDF1E7]/90 backdrop-blur-md border-b border-black/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Vector Logo (Left) */}
        <Link href="/" className="flex items-center group relative h-10 pl-2">
          {/* Logo Circle */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-black transition-transform duration-500 group-hover:rotate-45" />
          {/* Logo Text */}
          <span 
            className="relative z-10 text-lg font-bold text-black tracking-tight font-serif pl-3.5 select-none" 
            style={{ 
              fontFamily: "var(--font-serif), serif",
              textShadow: "0 0 6px #BDF1E7, -2px -2px 0 #BDF1E7, 2px -2px 0 #BDF1E7, -2px 2px 0 #BDF1E7, 2px 2px 0 #BDF1E7, -3px 0 0 #BDF1E7, 3px 0 0 #BDF1E7, 0 -3px 0 #BDF1E7, 0 3px 0 #BDF1E7"
            }}
          >
            Boreum
          </span>
          {/* Thin separator line */}
          <div className="h-5 w-[1px] bg-black/15 ml-4 mr-3" />
          {/* Sub-label */}
          <span className="text-[9px] text-black/75 font-semibold tracking-widest leading-none pt-0.5">
            보름
          </span>
        </Link>

        {/* Right Aligned Navigation and CTAs (SM Style) */}
        <div className="hidden md:flex items-center gap-8">
          {/* Desktop nav links */}
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative group text-xs font-bold text-black/75 hover:text-black transition-colors duration-200 tracking-wider uppercase pt-2.5"
                >
                  {/* Small white dot above the text, appearing smoothly on hover */}
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 pl-4 border-l border-black/15">
            <button className="text-xs font-bold text-black/75 hover:text-black transition-colors">
              로그인
            </button>
            <button className="px-4 py-2 text-xs font-bold bg-white text-black rounded-lg hover:bg-white/90 border border-black/10 transition-colors shadow-sm">
              모임 참여
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 items-center"
          onClick={() => setOpen(!open)}
        >
          <span className={`w-5 h-0.5 bg-black transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-black transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-black transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-4 bg-white rounded-2xl shadow-xl border border-black/10 p-5">
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-bold text-black/70 hover:text-black hover:bg-[#BDF1E7]/45 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-black/10 flex gap-2.5">
            <button className="flex-1 py-2.5 text-xs font-bold text-black/70 border border-black/20 rounded-xl hover:bg-slate-50 transition-colors">
              로그인
            </button>
            <button className="flex-1 py-2.5 text-xs font-bold bg-black text-white rounded-xl hover:bg-black/90 transition-colors">
              모임 참여
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
