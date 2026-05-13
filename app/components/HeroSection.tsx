export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#2DD4BF 1px, transparent 1px), linear-gradient(90deg, #2DD4BF 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top-right moon area */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] pointer-events-none">
        {/* Outer glow rings */}
        <div className="absolute top-8 right-8 w-[480px] h-[480px] rounded-full bg-teal-50 glow-pulse" />
        <div className="absolute top-20 right-20 w-[360px] h-[360px] rounded-full bg-teal-100/60" />

        {/* Moon */}
        <div className="absolute top-24 right-24 moon-float">
          <div
            className="w-[280px] h-[280px] rounded-full shadow-2xl shadow-teal-200/60"
            style={{
              background: "radial-gradient(circle at 38% 35%, #E6FEFA, #A7F3D0 35%, #2DD4BF 65%, #0F766E 90%)",
            }}
          >
            {/* Highlight */}
            <div
              className="absolute top-[12%] left-[15%] w-[38%] h-[30%] rounded-full opacity-60"
              style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.8), transparent 70%)" }}
            />
            {/* Craters */}
            <div className="absolute top-[38%] left-[55%] w-10 h-10 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, rgba(0,0,0,0.5), transparent)" }} />
            <div className="absolute top-[60%] left-[28%] w-6 h-6 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, rgba(0,0,0,0.4), transparent)" }} />
          </div>
        </div>

        {/* Decorative dots */}
        {[
          { top: "18%", left: "8%", size: 4, opacity: 0.3 },
          { top: "12%", left: "30%", size: 3, opacity: 0.2 },
          { top: "28%", left: "15%", size: 5, opacity: 0.25 },
          { top: "6%", left: "55%", size: 3, opacity: 0.2 },
          { top: "42%", left: "5%", size: 4, opacity: 0.15 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-400"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, opacity: dot.opacity }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="max-w-lg">
          {/* Badge */}
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-600 text-xs font-medium tracking-wide">YoungCoreCrew · 5월 모임 모집 중</span>
          </div>

          {/* Title */}
          <h1
            className="fade-up delay-1 text-6xl md:text-8xl font-bold text-slate-800 leading-[1.05] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}
          >
            보름
          </h1>

          <p
            className="fade-up delay-2 text-xl md:text-2xl font-light text-slate-500 mb-3 literary"
          >
            달처럼 함께 읽고, 함께 빛나다
          </p>

          <p className="fade-up delay-3 text-sm text-slate-400 leading-relaxed mb-10 literary max-w-sm">
            AI 시대에도 문학의 힘을 믿는 청년들의 모임.<br />
            과학·기술·사회의 눈으로 책을 읽어요.
          </p>

          {/* CTAs */}
          <div className="fade-up delay-4 flex flex-wrap gap-3 mb-14">
            <button className="px-6 py-3 bg-teal-400 text-white rounded-2xl text-sm font-medium hover:bg-teal-500 transition-all shadow-md shadow-teal-200 hover:shadow-teal-300 hover:-translate-y-0.5 duration-200">
              이번 달 모임 보기
            </button>
            <button className="px-6 py-3 bg-white text-slate-600 rounded-2xl text-sm font-medium border border-gray-200 hover:border-teal-300 hover:text-teal-600 transition-all duration-200">
              독서 기록 보기
            </button>
          </div>

          {/* Stats */}
          <div className="fade-up delay-4 flex gap-10 pt-8 border-t border-gray-100">
            {[
              { num: "24", label: "멤버" },
              { num: "18", label: "완독 도서" },
              { num: "3년", label: "함께한 시간" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-teal-500">{stat.num}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent" />
    </section>
  );
}
