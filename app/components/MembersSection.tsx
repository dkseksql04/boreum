const members = [
  { name: "김지유", role: "운영진", books: 18, interests: ["SF", "인문학", "철학"], avatar: "지", bg: "#CCFBF1", fg: "#0F766E" },
  { name: "박준호", role: "운영진", books: 15, interests: ["과학기술", "사회학", "STS"], avatar: "준", bg: "#DBEAFE", fg: "#1E40AF" },
  { name: "이서연", role: "멤버", books: 12, interests: ["한국문학", "여성서사", "시"], avatar: "서", bg: "#FEF3C7", fg: "#92400E" },
  { name: "최민준", role: "멤버", books: 10, interests: ["세계문학", "AI윤리"], avatar: "민", bg: "#F3E8FF", fg: "#6B21A8" },
  { name: "정하은", role: "멤버", books: 9, interests: ["에세이", "환경", "생태"], avatar: "하", bg: "#DCFCE7", fg: "#166534" },
  { name: "윤소율", role: "멤버", books: 7, interests: ["고전", "동아시아문학"], avatar: "율", bg: "#FFE4E6", fg: "#9F1239" },
];

export default function MembersSection() {
  return (
    <section id="members" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full bg-teal-400" />
            <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>
              멤버
            </h2>
          </div>
          <span className="text-sm text-gray-400">{members.length}명의 독서인</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-3xl p-5 border border-gray-100 hover:border-teal-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group text-center"
            >
              <div className="relative mx-auto mb-3 w-14 h-14">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: member.bg, color: member.fg }}
                >
                  {member.avatar}
                </div>
                {member.role === "운영진" && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              <p className="font-semibold text-slate-700 text-sm mb-0.5">{member.name}</p>
              <p className="text-xs text-teal-500 mb-3">{member.books}권 완독</p>

              <div className="flex flex-wrap gap-1 justify-center">
                {member.interests.slice(0, 2).map((interest) => (
                  <span key={interest} className="text-xs px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="bg-teal-400 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-4 right-8 w-24 h-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute top-1/2 right-16 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>
              함께 읽고 싶으신가요?
            </h3>
            <p className="text-white/80 text-sm mb-6">
              매달 한 권, 함께 읽고 나누는 보름 독서 모임에 참여해보세요.
            </p>
            <button className="px-8 py-3 bg-white text-teal-500 rounded-2xl font-medium hover:bg-teal-50 transition-colors shadow-sm">
              멤버 신청하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
