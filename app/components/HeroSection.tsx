export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#BDF1E7] pt-56">
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
