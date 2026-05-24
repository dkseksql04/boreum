'use client'

import { useActionState, useState } from 'react'
import { createBook } from '@/app/actions'

const EMOJIS = ['📚', '☀️', '🌿', '🌙', '🔥', '💡', '🌊', '🦋', '🪐', '🌸']

export default function AddBookModal() {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(createBook, { success: false })
  const [emoji, setEmoji] = useState('📚')

  if (state.success && open) setOpen(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-teal-400 text-white rounded-2xl font-medium hover:bg-teal-500 transition-colors shadow-sm"
      >
        + 책 등록하기
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-700 text-lg">이번 달 책 등록</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>

            <form action={action} className="space-y-4">
              {/* 이모지 선택 */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">표지 이모지</label>
                <div className="flex gap-2 flex-wrap">
                  {EMOJIS.map(e => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`w-10 h-10 text-xl rounded-xl border-2 transition-colors ${emoji === e ? 'border-teal-400 bg-teal-50' : 'border-gray-100 hover:border-teal-200'}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="cover_emoji" value={emoji} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">제목 *</label>
                  <input name="title" required placeholder="책 제목" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">저자</label>
                  <input name="author" placeholder="저자명" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">출판사</label>
                  <input name="publisher" placeholder="출판사" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">출판연도</label>
                  <input name="year" type="number" placeholder="2024" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">월 표시</label>
                  <input name="month_label" placeholder="2026년 5월" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">소개</label>
                <textarea name="description" rows={2} placeholder="책 소개를 입력하세요" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">태그 (쉼표로 구분)</label>
                <input name="tags" placeholder="인문학, SF, 철학" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">읽기 진행률 (%)</label>
                <input name="reading_progress" type="number" min="0" max="100" defaultValue="0" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">토론 주제 (선택)</label>
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <input key={i} name={`point_${i}`} placeholder={`토론 주제 ${i}`} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
                  ))}
                </div>
              </div>

              {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

              <button
                type="submit"
                disabled={pending}
                className="w-full py-3 bg-teal-400 text-white rounded-2xl font-medium hover:bg-teal-500 transition-colors disabled:opacity-60 mt-2"
              >
                {pending ? '저장 중...' : '등록하기'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
