import { supabase } from '@/lib/supabase'
import AddBookModal from './AddBookModal'

export default async function CurrentBookSection() {
  const { data: book } = await supabase
    .from('books')
    .select('*, discussion_points(*)')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const tags: string[] = book?.tags ?? []
  const discussionPoints: string[] = (book?.discussion_points ?? [])
    .sort((a: { order_num: number }, b: { order_num: number }) => a.order_num - b.order_num)
    .map((dp: { content: string }) => dp.content)

  return (
    <section id="book" className="py-28 px-8 bg-[#BDF1E7] relative overflow-hidden">
      {/* Subtle thin circle background art */}
      <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full border border-[#142825]/8 pointer-events-none" />
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full border border-[#142825]/8 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3.5 mb-14">
          <div className="w-1.5 h-6 rounded-full bg-[#142825]" />
          <h2 className="text-2xl font-bold text-[#142825] font-serif" style={{ fontFamily: "var(--font-serif), serif" }}>
            이번 달 책
          </h2>
          {book && (
            <span className="px-3 py-1 text-xs bg-[#142825]/10 text-[#142825] border border-[#142825]/15 rounded-full font-bold tracking-wider">{book.month_label}</span>
          )}
        </div>

        {!book ? (
          <div className="bg-white rounded-3xl border border-dashed border-[#142825]/20 p-20 text-center shadow-sm">
            <div className="text-5xl mb-5">📚</div>
            <p className="text-slate-600 font-semibold mb-2">이번 달 책이 아직 없어요</p>
            <p className="text-xs text-gray-400 mb-8">모임에서 읽을 책을 첫 번째로 등록해보세요</p>
            <AddBookModal />
          </div>
        ) : (
          <div className="w-full">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              {/* Book cover (Left) */}
              <div className="md:col-span-5 flex justify-center md:justify-start pb-8 md:pb-0">
                <div className="relative">
                  <div
                    className="relative rounded-2xl shadow-[0_20px_50px_rgba(20,40,37,0.22)] border border-slate-200"
                    style={{ width: 220, height: 310, background: "linear-gradient(135deg, #203D39 0%, #142825 100%)" }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-between p-6.5 rounded-2xl">
                      <div>
                        <p className="text-[#BDF1E7]/50 text-[10px] font-bold tracking-widest uppercase">{book.month_label}</p>
                        <h3 className="text-[#BDF1E7] text-2xl font-bold mt-4 leading-snug literary">{book.title}</h3>
                        <p className="text-[#BDF1E7]/80 text-xs mt-2 font-medium">{book.author}</p>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl border border-white/15 backdrop-blur-sm shadow-inner">{book.cover_emoji}</div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/5 rounded-l-2xl" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#BDF1E7] rounded-2xl px-4.5 py-3 border border-[#142825]/15 shadow-sm">
                    <p className="text-[10px] text-[#142825]/60 font-bold uppercase tracking-wider">완독률</p>
                    <div className="flex items-center gap-3.5 mt-1.5">
                      <div className="w-24 h-2 bg-[#142825]/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#142825] rounded-full transition-all duration-500" style={{ width: `${book.reading_progress}%` }} />
                      </div>
                      <span className="text-xs font-bold text-[#142825]">{book.reading_progress}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info (Right) */}
              <div className="md:col-span-7 md:pl-12 md:border-l border-[#142825]/12 w-full">
                <div className="flex flex-wrap gap-2 mb-5">
                  {tags.map(tag => (
                    <span key={tag} className="px-3.5 py-1 text-xs bg-[#142825]/5 text-[#142825] rounded-full border border-[#142825]/10 font-bold">{tag}</span>
                  ))}
                </div>
                <h3 className="text-4xl font-bold text-[#142825] mb-2.5 font-serif" style={{ fontFamily: "var(--font-serif), serif" }}>{book.title}</h3>
                <p className="text-[#142825]/60 text-xs font-bold tracking-wide mb-6">{[book.author, book.year, book.publisher].filter(Boolean).join(' · ')}</p>
                <p className="text-[#142825]/80 leading-relaxed text-sm mb-8 literary">{book.description}</p>

                {discussionPoints.length > 0 && (
                  <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6.5 mb-8 border border-[#142825]/8">
                    <p className="text-[11px] font-bold text-[#142825] uppercase tracking-widest mb-4">이번 달 토론 주제</p>
                    <ul className="space-y-3.5">
                      {discussionPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3.5 text-sm text-[#142825]/80 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-[#142825]/10 text-[#142825] text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">{i + 1}</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex-1 py-3.5 bg-[#142825] text-[#BDF1E7] rounded-xl text-sm font-bold hover:bg-[#203D39] transition-all hover:scale-[1.01] shadow-sm">감상 남기기</button>
                  <button className="py-3.5 px-6 border border-[#142825]/35 text-[#142825] rounded-xl text-sm font-bold hover:bg-[#142825]/5 transition-all">책 정보</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
