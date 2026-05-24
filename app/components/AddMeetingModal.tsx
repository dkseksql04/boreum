'use client'

import { useActionState, useState } from 'react'
import { createMeeting } from '@/app/actions'

type Book = { id: string; title: string }

export default function AddMeetingModal({ books }: { books: Book[] }) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(createMeeting, { success: false })

  if (state.success && open) setOpen(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-2.5 bg-teal-400 text-white rounded-xl text-sm font-medium hover:bg-teal-500 transition-colors"
      >
        + 모임 추가
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-700 text-lg">모임 추가</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>

            <form action={action} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">모임 제목 *</label>
                <input name="title" required placeholder="5월 정기 모임" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">책</label>
                <select name="book_id" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 bg-white">
                  <option value="">책 선택 (선택사항)</option>
                  {books.map(b => (
                    <option key={b.id} value={b.id}>{b.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">날짜 *</label>
                  <input name="meeting_date" type="date" required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">최대 인원</label>
                  <input name="max_attendees" type="number" defaultValue={15} min={1} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">시간</label>
                <input name="time_range" placeholder="오후 3:00 – 5:30" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">장소</label>
                <input name="location" placeholder="서울 마포구 연남동 카페 달빛" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input name="is_highlight" type="checkbox" className="w-4 h-4 rounded accent-teal-500" />
                <span className="text-sm text-slate-600">다음 모임으로 강조 표시</span>
              </label>

              {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

              <button
                type="submit"
                disabled={pending}
                className="w-full py-3 bg-teal-400 text-white rounded-2xl font-medium hover:bg-teal-500 transition-colors disabled:opacity-60 mt-2"
              >
                {pending ? '저장 중...' : '모임 추가하기'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
