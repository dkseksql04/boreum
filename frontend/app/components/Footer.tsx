const pastBooks = [
  "채식주의자 — 한강",
  "82년생 김지영 — 조남주",
  "파친코 — 이민진",
  "아몬드 — 손원평",
];

export default function Footer() {
  return (
    <footer className="bg-[#BDF1E7] border-t border-[#142825]/15 text-[#142825]/60 py-16 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#142825]/15 shadow-sm">
                <img
                  src="/logo.jpg"
                  alt="Boreum Brand Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#142825] tracking-wide font-serif leading-none" style={{ fontFamily: "var(--font-serif), serif" }}>
                  Boreum
                </span>
                <span className="text-[9px] text-[#142825]/75 font-semibold tracking-widest mt-0.5 leading-none">
                  보름
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed literary mb-5 text-[#142825]/70">
              AI 시대에도 문학의 힘을 믿는 청년들의 모임.<br />
              과학기술과 사회(STS) 관점으로 책을 읽고,<br />
              세상을 더 깊이 있게 이해합니다.
            </p>
            <div className="flex gap-2">
              {["Instagram", "카카오", "뉴스레터"].map((platform) => (
                <button
                  key={platform}
                  className="px-3.5 py-1.5 text-[11px] font-semibold border border-[#142825]/30 text-[#142825]/80 rounded-xl hover:border-[#142825] hover:bg-[#142825]/5 transition-all duration-200"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Past books */}
          <div>
            <p className="text-[#142825] font-bold text-sm mb-4">지난 도서</p>
            <ul className="space-y-2">
              {pastBooks.map((book) => (
                <li key={book} className="text-xs hover:text-[#142825] cursor-pointer transition-colors literary">
                  {book}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="text-[#142825] font-bold text-sm mb-4">바로가기</p>
            <ul className="space-y-2 text-xs">
              {["이번 달 책", "독서 기록", "모임 일정", "멤버 소개", "멤버 신청"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-[#142825] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#142825]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#142825]/50">
          <p>© 2026 보름 · YoungCoreCrew</p>
          <p className="literary italic">
            &ldquo;책은 달처럼 — 혼자서도 빛나고, 함께라면 더욱 환하다&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
