import { supabase } from '@/lib/supabase'
import AddMeetingModal from './AddMeetingModal'

const DAY_LABELS = ['일', '월', '화', '수', '목', '금', '토']

function parseMeetingDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return {
    day: String(d.getDate()),
    dayLabel: DAY_LABELS[d.getDay()],
    date: `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${DAY_LABELS[d.getDay()]}요일`,
  }
}

export default async function ScheduleSection() {
  const [{ data: meetings }, { data: books }] = await Promise.all([
    supabase.from('meetings').select('*, books(*)').order('meeting_date', { ascending: false }),
    supabase.from('books').select('id, title'),
  ])

  const list = meetings ?? []

  return (
    <section id="schedule" className="py-28 px-8 bg-[#BDF1E7] relative overflow-hidden">
      {/* Subtle thin circle background art */}
      <div className="absolute left-1/4 -bottom-16 w-80 h-80 rounded-full border border-[#142825]/8 pointer-events-none" />
      <div className="absolute -right-12 top-12 w-64 h-64 rounded-full border border-[#142825]/8 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3.5">
            <div className="w-1.5 h-6 rounded-full bg-[#142825]" />
            <h2 className="text-2xl font-bold text-[#142825] font-serif" style={{ fontFamily: "var(--font-serif), serif" }}>
              모임 일정
            </h2>
          </div>
          <AddMeetingModal books={books ?? []} />
        </div>

        {list.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-[#142825]/20 p-20 text-center shadow-sm">
            <div className="text-5xl mb-5">📅</div>
            <p className="text-slate-600 font-semibold mb-2">등록된 모임 일정이 없어요</p>
            <p className="text-xs text-gray-400">오른쪽 위의 버튼을 눌러 모임을 추가해보세요</p>
          </div>
        ) : (
          <div className="w-full border-t border-[#142825]/15">
            {list.map(meeting => {
              const book = meeting.books as { title: string } | null
              const { day, dayLabel, date } = parseMeetingDate(meeting.meeting_date)
              const highlight = meeting.is_highlight
              const done = meeting.status === 'done'

              return (
                <div
                  key={meeting.id}
                  className={`py-6.5 border-b border-[#142825]/12 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                    highlight ? 'bg-[#142825]/5 -mx-4 px-4 rounded-xl' : done ? 'opacity-55' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-5 flex-1 min-w-0">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-16 text-left">
                      <span className="text-3xl font-bold font-serif text-[#142825] leading-none block">{day}</span>
                      <span className="text-[10px] font-bold tracking-widest text-[#142825]/50 mt-1 block uppercase">{dayLabel}</span>
                    </div>

                    {/* Details Info */}
                    <div className="flex-1 min-w-0 md:pl-8 md:border-l border-[#142825]/12">
                      <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                        <h3 className="font-bold text-base text-[#142825] tracking-tight">{meeting.title}</h3>
                        {done && <span className="px-2 py-0.5 text-[9px] font-bold bg-[#142825]/10 text-[#142825]/70 rounded-full border border-[#142825]/15">완료</span>}
                        {highlight && (
                          <span className="px-2.5 py-0.5 text-[9px] font-bold bg-[#142825] text-[#BDF1E7] rounded-full flex items-center gap-1.5 uppercase tracking-wider border border-[#142825]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#BDF1E7] animate-pulse" />
                            다음 모임
                          </span>
                        )}
                      </div>
                      {book && <p className="text-xs font-semibold mb-2.5 literary flex items-center gap-1.5 text-[#142825]/85">📖 {book.title}</p>}
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#142825]/55">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {date}{meeting.time_range ? ` · ${meeting.time_range}` : ''}
                        </span>
                        {meeting.location && (
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {meeting.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6 justify-between md:justify-end flex-shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#142825] font-serif">{meeting.attendees} / {meeting.max_attendees}</p>
                      <p className="text-[9px] font-bold tracking-wider uppercase mt-1 text-[#142825]/50">참석 예정</p>
                    </div>
                    {!done && (
                      <button className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                        highlight ? 'bg-[#142825] text-[#BDF1E7] hover:bg-[#203D39] hover:scale-[1.02] shadow-sm'
                        : 'border border-[#142825]/30 text-[#142825] bg-white/50 hover:bg-[#142825]/5 hover:border-[#142825]'
                      }`}>
                        참석 신청
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
