const pastBooks = [
  "채식주의자 — 한강",
  "82년생 김지영 — 조남주",
  "파친코 — 이민진",
  "아몬드 — 손원평",
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 text-gray-400 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center shadow-sm shadow-teal-200">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>보</span>
              </div>
              <span className="text-base font-bold text-slate-600" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>
                보름
              </span>
            </div>
            <p className="text-sm leading-relaxed literary mb-4 text-gray-400">
              AI 시대에도 문학의 힘을 믿는 청년들의 모임.<br />
              과학기술과 사회(STS) 관점으로 책을 읽고,<br />
              세상을 더 깊이 이해합니다.
            </p>
            <div className="flex gap-2">
              {["Instagram", "카카오", "뉴스레터"].map((platform) => (
                <button
                  key={platform}
                  className="px-3 py-1.5 text-xs border border-gray-200 text-gray-400 rounded-xl hover:border-teal-300 hover:text-teal-500 transition-colors"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Past books */}
          <div>
            <p className="text-slate-500 font-semibold text-sm mb-4">지난 도서</p>
            <ul className="space-y-2">
              {pastBooks.map((book) => (
                <li key={book} className="text-xs hover:text-teal-500 cursor-pointer transition-colors literary">
                  {book}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="text-slate-500 font-semibold text-sm mb-4">바로가기</p>
            <ul className="space-y-2 text-xs">
              {["이번 달 책", "독서 기록", "모임 일정", "멤버 소개", "멤버 신청"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-teal-500 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© 2026 보름 · YoungCoreCrew</p>
          <p className="literary text-gray-300 italic">
            &ldquo;책은 달처럼 — 혼자서도 빛나고, 함께라면 더욱 환하다&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
