import { supabase } from '@/lib/supabase'
import AddReviewModal from './AddReviewModal'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= rating ? 'text-teal-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function ReviewsSection() {
  const [{ data: reviews }, { data: members }, { data: books }] = await Promise.all([
    supabase.from('reviews').select('*, members(*), books(*)').order('created_at', { ascending: false }).limit(3),
    supabase.from('members').select('id, name, avatar_char, avatar_bg, avatar_text'),
    supabase.from('books').select('id, title'),
  ])

  const list = reviews ?? []

  return (
    <section id="reviews" className="py-28 px-8 bg-[#BDF1E7] relative overflow-hidden">
      {/* Subtle thin circle background art */}
      <div className="absolute right-10 top-1/4 w-72 h-72 rounded-full border border-[#142825]/8 pointer-events-none" />
      <div className="absolute -left-20 bottom-10 w-96 h-96 rounded-full border border-[#142825]/8 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3.5">
            <div className="w-1.5 h-6 rounded-full bg-[#142825]" />
            <h2 className="text-2xl font-bold text-[#142825] font-serif" style={{ fontFamily: "var(--font-serif), serif" }}>
              독서 기록
            </h2>
          </div>
          {list.length > 0 && (
            <button className="text-xs text-[#142825]/75 hover:text-[#142825] flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors">
              전체 보기
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-[#142825]/20 p-20 text-center mb-10 shadow-sm">
            <div className="text-5xl mb-5">✍️</div>
            <p className="text-slate-600 font-semibold mb-2">아직 독서 기록이 없어요</p>
            <p className="text-xs text-gray-400">첫 번째 감상을 먼저 남겨보세요</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 md:gap-14 mb-14 border-y border-[#142825]/12 py-10">
            {list.map(review => {
              const member = review.members as { name: string; avatar_char: string; avatar_bg: string; avatar_text: string } | null
              const book = review.books as { title: string } | null
              return (
                <article
                  key={review.id}
                  className="relative flex flex-col justify-between md:pr-10 md:border-r border-[#142825]/12 last:border-0 last:pr-0 pb-8 md:pb-0 border-b md:border-b-0 border-[#142825]/10 last:border-b-0"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border border-[#142825]/10 shadow-sm"
                        style={{ background: member?.avatar_bg, color: member?.avatar_text }}
                      >
                        {member?.avatar_char}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#142825]">{member?.name}</p>
                        <p className="text-[10px] text-[#142825]/60 font-semibold tracking-wide mt-0.5">{formatDate(review.created_at)}</p>
                      </div>
                      <StarRating rating={review.rating ?? 0} />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#142825]/5 rounded-full mb-4.5 border border-[#142825]/10">
                      <svg className="w-3 h-3 text-[#142825]/70" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      <span className="text-[10px] text-[#142825] font-bold tracking-wide">{book?.title}</span>
                    </div>
                    <p className="text-[13px] text-slate-700 leading-[1.85] literary line-clamp-5 mb-6">&ldquo;{review.excerpt}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-4 pt-4.5 border-t border-[#142825]/10 mt-auto">
                    <button className="flex items-center gap-1.5 text-xs text-[#142825]/60 hover:text-[#142825] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {review.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-[#142825]/60 hover:text-[#142825] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {review.comments_count}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <div className="text-center">
          <AddReviewModal members={members ?? []} books={books ?? []} />
        </div>
      </div>
    </section>
  )
}
