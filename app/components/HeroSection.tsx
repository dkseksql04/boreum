"use client";

export default function HeroSection() {
  return (
    <div className="w-full bg-[#BDF1E7]">
      {/* Custom Styles for Gentle Scroll Bounce Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gentleBounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 6px); }
        }
        .gentle-bounce {
          animation: gentleBounce 2.2s infinite ease-in-out;
        }
      `}} />

      {/* ========================================================================= */}
      {/* 제 1페이지: Entrance Cover Screen (보그 코리아 벤치마킹 초대형 로고 및 배너) */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-52 pb-24 px-8 overflow-hidden select-none">


        {/* 2. 초대형 매거진 에디토리얼 프레임 배너 */}
        <div className="w-full max-w-6xl h-[420px] bg-white border border-black/15 overflow-hidden relative flex flex-col justify-between p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-none z-10">
          {/* 배너 배경: 추상 기하학 라인 아트워크 */}
          <div className="absolute inset-0 opacity-40 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
            {/* Concentric nested brand line circles in banner background */}
            <div className="w-[500px] h-[500px] rounded-full border border-black/10 flex items-center justify-center translate-x-12 translate-y-12">
              <div className="w-[85%] h-[85%] rounded-full border border-black/8 flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full border border-black/5" />
              </div>
            </div>
            {/* Secondary abstract book grid lines */}
            <div className="absolute top-1/4 bottom-1/4 left-1/3 w-[1px] bg-black/5" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/5" />
          </div>

          {/* 배너 내부 텍스트 1단: 매거진 메타 정보 (Vogue style) */}
          <div className="relative z-10 flex items-start justify-between w-full border-b border-black/10 pb-4 text-[10px] tracking-[0.3em] font-bold text-black/50 uppercase">
            <div>
              <span>Issue No. 05</span>
              <span className="mx-3 text-black/20">|</span>
              <span>May 2026</span>
            </div>
            <div className="text-right">
              <span>Boreum Book Club</span>
            </div>
          </div>

          {/* 배너 내부 텍스트 2단: 거대 에디토리얼 타이틀 */}
          <div className="relative z-10 my-auto py-6">
            <h2 
              className="text-4xl md:text-7xl font-black text-black leading-none font-serif tracking-normal"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              The Silent Power of Ink
            </h2>
            <p className="text-[10px] md:text-xs font-bold text-black/60 tracking-[0.4em] uppercase mt-4.5 pl-1.5">
              과학 · 기술 · 사회 그리고 청년들의 깊이 있는 사유
            </p>
          </div>

          {/* 배너 내부 텍스트 3단: 하단 저널 설명 */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 w-full border-t border-black/10 pt-4 text-[9px] md:text-[10px] tracking-[0.2em] font-bold text-black/55 uppercase">
            <div className="max-w-md">
              <p className="leading-relaxed">
                AI 시대에도 문학의 힘을 믿는 청년들의 모임. 보름은 매달 책 한 권을 탐독하고 밀도 높은 가치를 교류합니다.
              </p>
            </div>
            <div>
              <span className="text-black font-extrabold tracking-[0.35em] block md:inline">YoungCoreCrew · All rights reserved</span>
            </div>
          </div>
        </div>

        {/* 3. 스크롤 유도 마이크로 인디케이터 */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-center select-none cursor-pointer gentle-bounce">
          <span className="text-[10px] font-bold tracking-[0.4em] text-black/55 uppercase pl-[0.4em]">
            Scroll to Explore
          </span>
          <svg className="w-4 h-4 mx-auto mt-2 text-black/55 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 제 2페이지: Core Slogan & Details Screen (원래 메인 페이지) */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden border-t border-black/5 pt-36 pb-24 px-8">
        {/* Giant book line graphic with architectural grid lines (SM Style) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[90vw] md:w-[50vw] h-[75vh] max-w-[800px] z-0 pointer-events-none flex items-center justify-end pr-8 md:pr-16">
          {/* Structural Grid lines crossing the screen */}
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-black/10 hidden md:block" />
          <div className="absolute left-[-20vw] right-0 bottom-1/4 h-[1px] bg-black/10 hidden md:block" />
          <div className="absolute left-[-10vw] right-0 top-1/4 h-[1px] bg-black/10 hidden md:block" />

          {/* The open book outline SVG (recreating user reference exactly in black lines) */}
          <svg viewBox="0 0 600 600" className="w-full h-full text-black stroke-black fill-none opacity-85 scale-[1.1] origin-right">
            {/* Outer Layer of Pages (3D effect background page borders) */}
            {/* Left Outer Page */}
            <path d="M 300,105 C 230,85 150,95 90,115 L 90,495 C 150,475 230,465 300,485 Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Right Outer Page */}
            <path d="M 300,105 C 370,85 450,95 510,115 L 510,495 C 450,475 370,465 300,485 Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Inner Layer of Pages (Main open pages) */}
            {/* Left Inner Page */}
            <path d="M 300,135 C 240,115 170,125 110,145 L 110,465 C 170,445 240,435 300,455 Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Right Inner Page */}
            <path d="M 300,135 C 360,115 430,125 490,145 L 490,465 C 430,445 360,435 300,455 Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Spine Center Axis Lines */}
            <line x1="300" y1="135" x2="300" y2="455" stroke="black" strokeWidth="2" />
            <line x1="300" y1="105" x2="300" y2="485" stroke="black" strokeWidth="1" strokeDasharray="3 3" />

            {/* Text Line Placeholders on Left Page (4 curved horizontal lines) */}
            <path d="M 160,220 C 200,205 230,200 255,208" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M 160,265 C 200,250 230,245 255,253" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M 160,310 C 200,295 230,290 255,298" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M 160,355 C 200,340 230,335 255,343" stroke="black" strokeWidth="2" strokeLinecap="round" />

            {/* Text Line Placeholders on Right Page (4 curved horizontal lines) */}
            <path d="M 345,208 C 370,200 400,205 440,220" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M 345,253 C 370,245 400,250 440,265" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M 345,298 C 370,290 400,295 440,310" stroke="black" strokeWidth="2" strokeLinecap="round" />
            <path d="M 345,343 C 370,335 400,340 440,355" stroke="black" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl">


            {/* Slogan Typography Title */}
            <div className="fade-up delay-1 mb-8">
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tight leading-[1.1] font-serif"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                달처럼 함께 읽고,<br />함께 빛나다
              </h1>
            </div>

            {/* Slogan Description */}
            <p className="fade-up delay-2 text-sm md:text-base text-black/75 leading-relaxed mb-10 max-w-md font-sans">
              AI 시대에도 문학의 힘을 믿는 청년들의 모임.<br />
              과학·기술·사회의 눈으로 깊이 있게 책을 읽고 밀도 있는 담론을 만들어갑니다.
            </p>

            {/* White Point Button (CTA) */}
            <div className="fade-up delay-3 mb-16">
              <a
                href="#book"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-black font-bold text-sm tracking-wide rounded-full border border-black/10 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer"
              >
                독서모임 둘러보기 &rarr;
              </a>
            </div>

            {/* Stats */}
            <div className="fade-up delay-4 flex gap-12 pt-8 border-t border-black/15">
              {[
                { num: "24명", label: "멤버" },
                { num: "18권", label: "완독 도서" },
                { num: "3년", label: "함께한 시간" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-black font-serif" style={{ fontFamily: "var(--font-serif), serif" }}>{stat.num}</p>
                  <p className="text-xs text-black/60 font-semibold tracking-wide mt-1.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
