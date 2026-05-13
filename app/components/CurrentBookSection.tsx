const tags = ["인문학", "AI와 인간", "철학적 SF"];

const discussionPoints = [
  "기술 발전 속 인간 정체성이란 무엇인가",
  "AI는 감정을 가질 수 있는가",
  "디지털 시대의 고독과 연대",
];

export default function CurrentBookSection() {
  return (
    <section id="book" className="py-24 px-6 bg-[#F7FAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-1 h-7 rounded-full bg-teal-400" />
          <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>
            이번 달 책
          </h2>
          <span className="px-2.5 py-1 text-xs bg-teal-100 text-teal-600 rounded-full font-medium">2026년 5월</span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Book cover */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 -m-6 rounded-full bg-teal-100/50 blur-2xl" />
                <div
                  className="relative w-48 h-68 rounded-2xl shadow-xl shadow-teal-100"
                  style={{
                    width: 192,
                    height: 272,
                    background: "linear-gradient(145deg, #CCFBF1 0%, #2DD4BF 50%, #0F766E 100%)",
                  }}
                >
                  <div className="absolute inset-0 flex flex-col justify-between p-6 rounded-2xl">
                    <div>
                      <p className="text-teal-100/60 text-xs font-medium tracking-widest uppercase">May 2026</p>
                      <h3 className="text-white text-xl font-bold mt-3 leading-snug literary">클라라와 태양</h3>
                      <p className="text-teal-100/80 text-sm mt-1">가즈오 이시구로</p>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center text-2xl">☀️</div>
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/5 rounded-l-2xl" />
                </div>

                {/* Progress badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-md px-4 py-3 border border-gray-100">
                  <p className="text-xs text-gray-400">읽는 중</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-3/5 h-full bg-teal-400 rounded-full" />
                    </div>
                    <span className="text-xs font-semibold text-teal-500">60%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs bg-teal-50 text-teal-600 rounded-full border border-teal-100">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-3xl font-bold text-slate-800 mb-1 literary">클라라와 태양</h3>
              <p className="text-gray-400 text-sm mb-4">가즈오 이시구로 · 2021 · 민음사</p>

              <p className="text-gray-500 leading-relaxed text-sm mb-6 literary">
                인공 친구(AF) 클라라의 눈으로 바라본 인간의 사랑, 희생, 그리고 영혼의 의미.
                AI와 인간의 경계를 묻는 이시구로의 섬세한 SF — STS 관점으로 함께 읽어봐요.
              </p>

              {/* Discussion points */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">이번 달 토론 주제</p>
                <ul className="space-y-2.5">
                  {discussionPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-500 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                        {i + 1}
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-teal-400 text-white rounded-xl text-sm font-medium hover:bg-teal-500 transition-colors shadow-sm shadow-teal-200">
                  감상 남기기
                </button>
                <button className="py-3 px-4 border border-gray-200 text-gray-500 rounded-xl text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors">
                  책 정보
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
