export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#BDF1E7] pt-20">
      {/* Giant book- & moon-based cropped abstract graphic asset (SM style) */}
      <div className="absolute right-[-20vw] bottom-[-20vw] w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full border-[1.5px] border-black bg-[#F8FAFC] shadow-[0_20px_60px_rgba(0,0,0,0.06)] pointer-events-none z-0 overflow-hidden p-[8%]">
        <svg viewBox="0 0 500 500" className="w-full h-full text-black stroke-black fill-none opacity-85">
          {/* Spine/Center axis of the open book */}
          <line x1="250" y1="440" x2="250" y2="60" stroke="black" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Left Wing Pages (multiple thin sweeping lines) */}
          <path d="M 250,440 C 170,390 60,300 60,160" stroke="black" strokeWidth="1" />
          <path d="M 250,440 C 185,370 80,280 80,140" stroke="black" strokeWidth="1" />
          <path d="M 250,440 C 200,350 100,260 100,120" stroke="black" strokeWidth="1.2" />
          <path d="M 250,440 C 215,330 120,240 120,100" stroke="black" strokeWidth="1.2" />
          <path d="M 250,440 C 230,310 140,220 140,80" stroke="black" strokeWidth="1.5" />
          
          {/* Right Wing Pages (multiple thin sweeping lines) */}
          <path d="M 250,440 C 330,390 440,300 440,160" stroke="black" strokeWidth="1" />
          <path d="M 250,440 C 315,370 420,280 420,140" stroke="black" strokeWidth="1" />
          <path d="M 250,440 C 300,350 400,260 400,120" stroke="black" strokeWidth="1.2" />
          <path d="M 250,440 C 285,330 380,240 380,100" stroke="black" strokeWidth="1.2" />
          <path d="M 250,440 C 270,310 360,220 360,80" stroke="black" strokeWidth="1.5" />

          {/* Book bottom & top connecting flow lines */}
          <path d="M 60,160 C 120,200 180,180 250,80 C 320,180 380,200 440,160" stroke="black" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 60,160 L 440,160" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>
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
