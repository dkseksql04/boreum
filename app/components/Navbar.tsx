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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <nav className="max-w-6xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-sm shadow-gray-100 border border-gray-100">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center shadow-sm shadow-teal-200">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>보</span>
          </div>
          <span className="text-base font-bold text-slate-700 tracking-tight" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>
            보름
          </span>
          <span className="text-xs text-teal-400 font-medium hidden sm:block border border-teal-100 rounded-full px-2 py-0.5 bg-teal-50">
            YCC
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            로그인
          </button>
          <button className="px-4 py-2 text-sm bg-teal-400 text-white rounded-xl hover:bg-teal-500 transition-colors shadow-sm shadow-teal-200">
            모임 참여
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 items-center"
          onClick={() => setOpen(!open)}
        >
          <span className={`w-5 h-0.5 bg-gray-400 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-gray-400 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-gray-400 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
            <button className="flex-1 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              로그인
            </button>
            <button className="flex-1 py-2.5 text-sm bg-teal-400 text-white rounded-xl hover:bg-teal-500 transition-colors">
              모임 참여
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
