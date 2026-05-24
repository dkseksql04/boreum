'use client'

import { useActionState, useState } from 'react'
import { createReview } from '@/app/actions'

type Member = { id: string; name: string; avatar_char: string; avatar_bg: string; avatar_text: string }
type Book = { id: string; title: string }

export default function AddReviewModal({ members, books }: { members: Member[]; books: Book[] }) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(createReview, { success: false })
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  if (state.success && open) setOpen(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 border border-dashed border-teal-200 text-teal-400 rounded-2xl text-sm hover:border-teal-400 hover:text-teal-500 hover:bg-teal-50/50 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        나의 독서 기록 남기기
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-700 text-lg">독서 기록 남기기</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>

            <form action={action} className="space-y-4">
              <input type="hidden" name="rating" value={rating} />

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">멤버</label>
                <select name="member_id" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 bg-white">
                  <option value="">멤버 선택</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">책</label>
                <select name="book_id" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 bg-white">
                  <option value="">책 선택</option>
                  {books.map(b => (
                    <option key={b.id} value={b.id}>{b.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">별점 *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i)}
                      onMouseEnter={() => setHoveredStar(i)}
                      onMouseLeave={() => setHoveredStar(0)}
                    >
                      <svg
                        className={`w-8 h-8 transition-colors ${i <= (hoveredStar || rating) ? 'text-teal-400' : 'text-gray-200'}`}
                        fill="currentColor" viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">감상 *</label>
                <textarea
                  name="excerpt"
                  required
                  rows={4}
                  placeholder="책을 읽고 느낀 점을 자유롭게 적어주세요"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

              <button
                type="submit"
                disabled={pending}
                className="w-full py-3 bg-teal-400 text-white rounded-2xl font-medium hover:bg-teal-500 transition-colors disabled:opacity-60 mt-2"
              >
                {pending ? '저장 중...' : '기록 남기기'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
