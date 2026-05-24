export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#BDF1E7] pt-20">
      {/* Giant logo-based cropped thin circle graphic (moon silhouette) */}
      <div className="absolute right-[-25vw] bottom-[-25vw] w-[85vw] h-[85vw] max-w-[1000px] max-h-[1000px] rounded-full border-[1.5px] border-black pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[88%] h-[88%] rounded-full border border-black/20 pointer-events-none" />
        <div className="w-[75%] h-[75%] rounded-full border border-black/5 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-28 pb-20">
        <div className="max-w-2xl">
          {/* Vector Brand Logo, drawn exactly as in logo.jpg (SM style layout) */}
          <div className="fade-up flex items-center h-16 group relative pl-3.5 mb-10 select-none">
            {/* The thin outline circle of the logo */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-black transition-transform duration-700 group-hover:rotate-45" />
            {/* The serif text "Boreum" */}
            <span
              className="relative z-10 text-4xl md:text-5xl font-bold text-black tracking-tight font-serif pl-5"
              style={{ 
                fontFamily: "var(--font-serif), serif",
                textShadow: "0 0 8px #BDF1E7, -3px -3px 0 #BDF1E7, 3px -3px 0 #BDF1E7, -3px 3px 0 #BDF1E7, 3px 3px 0 #BDF1E7, -5px 0 0 #BDF1E7, 5px 0 0 #BDF1E7, 0 -5px 0 #BDF1E7, 0 5px 0 #BDF1E7"
              }}
            >
              Boreum
            </span>
            {/* Elegant vertical separation line and sub-logo name, SM style */}
            <div className="h-8 w-[1px] bg-black/20 ml-6 mr-5" />
            <span className="text-xs font-bold text-black/50 tracking-[0.4em] uppercase pt-1">
              보름
            </span>
          </div>

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
  );
}
