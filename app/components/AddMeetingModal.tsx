'use client'

import { useActionState, useState, useEffect } from 'react'
import { createMeeting } from '@/app/actions'
import { supabase } from '@/lib/supabase'

type Book = { id: string; title: string }

export default function AddMeetingModal({ books }: { books: Book[] }) {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [state, action, pending] = useActionState(createMeeting, { success: false })

  // Monitor Auth state to supply leader_id
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (state.success && open) setOpen(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 bg-black text-[#BDF1E7] border border-black rounded-xl text-xs font-bold hover:bg-[#203D39] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        모임 추가
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#BDF1E7] border-2 border-black rounded-3xl p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto text-black animate-scaleUp"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 border-b border-black/10 pb-3">
              <h3 className="font-serif font-bold text-lg">새로운 모임 개설</h3>
              <button 
                onClick={() => setOpen(false)} 
                className="w-7 h-7 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-[#BDF1E7] transition-all cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form action={action} className="space-y-4">
              {/* Pass active user's ID as the leader_id */}
              <input type="hidden" name="leader_id" value={user?.id || 'guest'} />

              {!user && (
                <div className="p-3 bg-white/50 border border-black/10 rounded-xl text-[10px] font-bold text-[#203D39] leading-relaxed">
                  ⚠️ 로그인되어 있지 않아 '게스트' 권한으로 모임이 생성됩니다. 로그인 후 개설하시면 모임장 전용 관리 기능을 쓰실 수 있습니다.
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">모임 제목 *</label>
                <input 
                  name="title" 
                  required 
                  placeholder="예: 5월 정기 토론 모임" 
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold placeholder-black/30 focus:border-black focus:outline-none transition-colors" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">토론 도서 선택</label>
                <select 
                  name="book_id" 
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold focus:border-black focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">책 선택 안함 (선택사항)</option>
                  {books.map(b => (
                    <option key={b.id} value={b.id}>{b.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">모임 날짜 *</label>
                  <input 
                    name="meeting_date" 
                    type="date" 
                    required 
                    className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold focus:border-black focus:outline-none transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">모임 정원</label>
                  <input 
                    name="max_attendees" 
                    type="number" 
                    defaultValue={15} 
                    min={1} 
                    className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold focus:border-black focus:outline-none transition-colors" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">진행 시간</label>
                <input 
                  name="time_range" 
                  placeholder="예: 오후 3:00 – 5:30" 
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold placeholder-black/30 focus:border-black focus:outline-none transition-colors" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">모임 장소</label>
                <input 
                  name="location" 
                  placeholder="예: 서울 마포구 연남동 북카페 보름달" 
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold placeholder-black/30 focus:border-black focus:outline-none transition-colors" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">모임장 첫 공지사항 (선택)</label>
                <textarea 
                  name="notice" 
                  rows={3}
                  placeholder="멤버들에게 안내할 첫 공지 및 독서 토론 질문을 자유롭게 남겨보세요..." 
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold placeholder-black/30 focus:border-black focus:outline-none transition-colors resize-none" 
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none py-1">
                <input name="is_highlight" type="checkbox" className="w-4 h-4 rounded border-black accent-black cursor-pointer" />
                <span className="text-[10px] font-extrabold tracking-wider text-black/70 uppercase">다음 대표 모임으로 하이라이트</span>
              </label>

              {state.error && <p className="text-red-600 text-xs font-bold">{state.error}</p>}

              <button
                type="submit"
                disabled={pending}
                className="w-full py-3.5 bg-black text-[#BDF1E7] border-2 border-black rounded-xl font-extrabold text-[10px] tracking-widest uppercase hover:bg-black/90 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer mt-2"
              >
                {pending ? '저장 중...' : '새로운 모임 개설하기'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
