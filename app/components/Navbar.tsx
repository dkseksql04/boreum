"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { label: "이번 달 책", href: "#book" },
  { label: "모임 일정", href: "#schedule" },
  { label: "독서 기록", href: "#reviews" },
  { label: "멤버", href: "#members" },
  { label: "사유 아카이브", href: "#quote-companion" },
];

const notices = [
  "🌿 [모집] 보름 독서 모임 5월 멤버 대모집 중! (5월 31일 모집 마감)",
  "📖 [도서] 이달의 도서가 선정되었습니다. '이번 달 책' 섹션에서 만나보세요.",
  "📅 [모임] 다음 독서 토론 모임은 5월 30일 토요일 15:00에 보름 아지트에서 열립니다.",
  "✏️ [저널] 신규 독서 저널 등록 기능 오픈! 여러분의 깊이 있는 생각을 남겨보세요."
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Monitor Supabase Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Auto-rolling timer for notices (horizontal slide every 3.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setNoticeIndex((prev) => (prev + 1) % notices.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#BDF1E7]/95 backdrop-blur-md border-b border-black/10">

      {/* 1단: Utility Top Bar (SNS Left, Mini Menu Right) */}
      <div className="max-w-7xl mx-auto px-8 py-2.5 flex items-center justify-between border-b border-black/5 text-[10px] tracking-widest text-black/50 font-bold uppercase select-none">
        {/* Left: Tiny Social SVG Icons */}
        <div className="flex items-center gap-4 text-black/60">
          {/* Instagram */}
          <a href="#" className="hover:text-black transition-colors" aria-label="Instagram">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          {/* Twitter (X) */}
          <a href="#" className="hover:text-black transition-colors" aria-label="Twitter">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" className="hover:text-black transition-colors" aria-label="YouTube">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          {/* Kakao/Medium/Blog */}
          <a href="#" className="hover:text-black transition-colors text-[9px] tracking-tighter" aria-label="Medium">
            BLOG
          </a>
        </div>

        {/* Right: Tiny Utility Links & Login Buttons */}
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-black transition-colors hidden sm:inline-block">Side Menu</a>
          <a href="#" className="hover:text-black transition-colors hidden sm:inline-block">Subscribe</a>
          <a href="#" className="hover:text-black transition-colors">My Library</a>
          {/* Subtle vertical separator line */}
          <div className="h-3 w-[1px] bg-black/15 mx-1" />
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-black font-extrabold normal-case">
                🌿 {user.email?.split('@')[0]} 님
              </span>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                }}
                className="text-black/50 hover:text-black transition-colors cursor-pointer font-bold"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              className="text-black font-extrabold hover:text-black/70 transition-colors cursor-pointer"
            >
              로그인
            </Link>
          )}
          <Link 
            href="/meetings/create"
            className="px-3.5 py-1.5 bg-black text-[#BDF1E7] border border-black hover:bg-black/90 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-full font-extrabold cursor-pointer text-[9px] leading-none block text-center"
          >
            모임 참여
          </Link>
        </div>
      </div>

      {/* 2단: Main Logo Center (Centered Elegant Serif Brand Logo with Exact Brand Ratios) */}
      <div className="max-w-7xl mx-auto px-8 py-1.5 flex justify-center border-b border-black/5 relative">
        <Link href="/" className="relative flex items-center h-16 group select-none" aria-label="보름 홈으로 이동">
          <svg
            width="200"
            height="72"
            viewBox="0 0 220 80"
            className="overflow-visible select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="logo-mask-nav">
                <rect x="-10" y="-10" width="240" height="100" fill="white" />
                <text
                  x="48"
                  y="49"
                  fontFamily="var(--font-serif), 'Playfair Display', Georgia, serif"
                  fontSize="26"
                  fontWeight="400"
                  fill="black"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  letterSpacing="-0.03em"
                  className="select-none pointer-events-none"
                >
                  Boreum
                </text>
              </mask>
            </defs>
            <circle
              cx="60"
              cy="40"
              r="30"
              fill="none"
              stroke="#142825"
              strokeWidth="0.6"
              mask="url(#logo-mask-nav)"
              className="origin-[60px_40px] transition-transform duration-700 ease-out group-hover:rotate-45"
            />
            <text
              x="48"
              y="49"
              fontFamily="var(--font-serif), 'Playfair Display', Georgia, serif"
              fontSize="26"
              fontWeight="400"
              fill="#142825"
              letterSpacing="-0.03em"
              className="select-none pointer-events-none"
            >
              Boreum
            </text>
          </svg>
        </Link>
      </div>

      {/* 3단: GNB Navigation Links & Search */}
      <div className="border-b border-black/10 bg-[#BDF1E7]/20">
        <nav className="max-w-7xl mx-auto px-8 py-2.5 flex items-center justify-between">
          <div className="w-8 hidden md:block" />

          {/* Centered Navigation Menu */}
          <ul className="hidden md:flex items-center justify-center gap-10 flex-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative group text-xs font-bold text-black/75 hover:text-black transition-colors duration-200 tracking-widest uppercase py-1.5"
                >
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: GNB Search & Mobile Menu CTA */}
          <div className="flex items-center gap-4 ml-auto md:ml-0">
            <button className="text-black/70 hover:text-black transition-colors p-1.5" aria-label="Search">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 items-center p-1"
              onClick={() => setOpen(!open)}
            >
              <span className={`w-5 h-0.5 bg-black transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-black transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-black transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* 4단: Auto-rolling Ticker */}
      <div className="bg-black text-[#BDF1E7] text-[10px] font-bold py-2.5 px-8 flex items-center justify-between overflow-hidden relative h-9 border-b border-black">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden h-5 relative flex-1">
            {notices.map((notice, idx) => (
              <div
                key={idx}
                className={`absolute left-0 w-full transition-all duration-700 ease-in-out flex items-center gap-2 truncate ${
                  idx === noticeIndex
                    ? "translate-x-0 opacity-100"
                    : idx === (noticeIndex - 1 + notices.length) % notices.length
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#BDF1E7] animate-pulse flex-shrink-0" />
                <span>{notice}</span>
              </div>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2.5 text-[#BDF1E7]/70 text-[9px] uppercase tracking-widest pl-4">
            <span>Notice Ticker</span>
            <div className="flex gap-1">
              {notices.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    idx === noticeIndex ? "bg-[#BDF1E7] w-2.5" : "bg-[#BDF1E7]/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden mt-0 bg-white border-b border-black/10 p-5 animate-fadeIn">
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-xs font-bold text-black/70 hover:text-black hover:bg-[#BDF1E7]/45 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-black/10 flex gap-2.5">
            {user ? (
              <div className="flex-1 flex flex-col gap-2.5 items-center">
                <span className="text-[10px] font-extrabold text-black/70">
                  🌿 {user.email?.split('@')[0]} 님 로그인 중
                </span>
                <button 
                  onClick={async () => {
                    setOpen(false);
                    await supabase.auth.signOut();
                  }}
                  className="w-full py-2.5 text-[10px] font-bold text-black/70 border border-black/20 rounded-xl hover:bg-slate-50 transition-colors uppercase tracking-widest cursor-pointer"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 text-[10px] font-bold text-black/70 border border-black/20 rounded-xl hover:bg-slate-50 transition-colors uppercase tracking-widest cursor-pointer text-center block"
              >
                로그인
              </Link>
            )}
            <Link 
              href="/meetings/create"
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 text-[10px] font-bold bg-black text-[#BDF1E7] rounded-xl hover:bg-black/90 transition-colors uppercase tracking-widest cursor-pointer text-center block"
            >
              모임 참여
            </Link>
          </div>
        </div>
      )}
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
