const meetings = [
  {
    id: 1,
    title: "5월 정기 모임",
    book: "클라라와 태양",
    date: "2026년 5월 24일 토요일",
    day: "24",
    dayLabel: "토",
    time: "오후 3:00 – 5:30",
    location: "서울 마포구 연남동 카페 달빛",
    attendees: 12,
    maxAttendees: 15,
    status: "upcoming",
    highlight: true,
  },
  {
    id: 2,
    title: "온라인 번개 모임",
    book: "클라라와 태양 (1부 한정)",
    date: "2026년 5월 17일 토요일",
    day: "17",
    dayLabel: "토",
    time: "오후 8:00 – 9:30",
    location: "Zoom 온라인",
    attendees: 8,
    maxAttendees: 12,
    status: "upcoming",
    highlight: false,
  },
  {
    id: 3,
    title: "4월 정기 모임",
    book: "채식주의자",
    date: "2026년 4월 26일 토요일",
    day: "26",
    dayLabel: "토",
    time: "오후 3:00 – 5:30",
    location: "서울 종로구 북촌 독서실",
    attendees: 14,
    maxAttendees: 15,
    status: "done",
    highlight: false,
  },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="py-24 px-6 bg-[#F7FAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full bg-teal-400" />
            <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>
              모임 일정
            </h2>
          </div>
          <button className="text-sm text-teal-500 hover:text-teal-600 flex items-center gap-1 font-medium">
            전체 일정
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className={`rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-0.5 ${
                meeting.highlight
                  ? "bg-teal-400 border-teal-300 shadow-md shadow-teal-200"
                  : meeting.status === "done"
                  ? "bg-white border-gray-100 opacity-60"
                  : "bg-white border-gray-100 shadow-sm hover:border-teal-200 hover:shadow-md"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Date block */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center ${
                  meeting.highlight ? "bg-white/20" : meeting.status === "done" ? "bg-gray-100" : "bg-teal-50"
                }`}>
                  <span className={`text-xl font-bold leading-none ${
                    meeting.highlight ? "text-white" : meeting.status === "done" ? "text-gray-400" : "text-teal-600"
                  }`}>
                    {meeting.day}
                  </span>
                  <span className={`text-xs mt-0.5 ${
                    meeting.highlight ? "text-white/70" : "text-gray-400"
                  }`}>
                    {meeting.dayLabel}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold text-sm ${meeting.highlight ? "text-white" : "text-slate-700"}`}>
                      {meeting.title}
                    </h3>
                    {meeting.status === "done" && (
                      <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-400 rounded-full">완료</span>
                    )}
                    {meeting.highlight && (
                      <span className="px-2 py-0.5 text-xs bg-white/20 text-white rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        다음 모임
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-2 literary ${meeting.highlight ? "text-white/80" : "text-gray-500"}`}>
                    📖 {meeting.book}
                  </p>
                  <div className={`flex flex-wrap gap-3 text-xs ${meeting.highlight ? "text-white/60" : "text-gray-400"}`}>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {meeting.date} · {meeting.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {meeting.location}
                    </span>
                  </div>
                </div>

                {/* Attendees & CTA */}
                <div className="flex items-center gap-4 md:flex-col md:items-end flex-shrink-0">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${meeting.highlight ? "text-white" : "text-slate-600"}`}>
                      {meeting.attendees} / {meeting.maxAttendees}
                    </p>
                    <p className={`text-xs ${meeting.highlight ? "text-white/50" : "text-gray-400"}`}>참석 예정</p>
                  </div>
                  {meeting.status !== "done" && (
                    <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      meeting.highlight
                        ? "bg-white text-teal-500 hover:bg-teal-50"
                        : "border border-teal-200 text-teal-500 hover:bg-teal-50 hover:border-teal-300"
                    }`}>
                      참석 신청
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
