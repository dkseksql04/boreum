'use client'

import { useActionState, useState } from 'react'
import { createMember } from '@/app/actions'

const COLOR_PRESETS = [
  { bg: '#CCFBF1', text: '#0F766E', label: '민트' },
  { bg: '#DBEAFE', text: '#1E40AF', label: '파랑' },
  { bg: '#FEF3C7', text: '#92400E', label: '노랑' },
  { bg: '#F3E8FF', text: '#6B21A8', label: '보라' },
  { bg: '#DCFCE7', text: '#166534', label: '초록' },
  { bg: '#FFE4E6', text: '#9F1239', label: '빨강' },
]

export default function AddMemberModal() {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(createMember, { success: false })
  const [color, setColor] = useState(COLOR_PRESETS[0])
  const [name, setName] = useState('')

  if (state.success && open) setOpen(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-8 py-3 bg-white text-teal-500 rounded-2xl font-medium hover:bg-teal-50 transition-colors shadow-sm"
      >
        멤버 신청하기
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
              <h3 className="font-bold text-slate-700 text-lg">멤버 신청</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">✕</button>
            </div>

            {/* 미리보기 */}
            <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-2xl">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                style={{ background: color.bg, color: color.text }}
              >
                {name.charAt(0) || '?'}
              </div>
              <div>
                <p className="font-semibold text-slate-700 text-sm">{name || '이름'}</p>
                <p className="text-xs text-gray-400">새 멤버</p>
              </div>
            </div>

            <form action={action} className="space-y-4">
              <input type="hidden" name="avatar_bg" value={color.bg} />
              <input type="hidden" name="avatar_text" value={color.text} />

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">이름 *</label>
                <input
                  name="name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">역할</label>
                <select name="role" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400 bg-white">
                  <option value="멤버">멤버</option>
                  <option value="운영진">운영진</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1.5">관심 분야 (쉼표로 구분)</label>
                <input name="interests" placeholder="SF, 인문학, 철학" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">아바타 색상</label>
                <div className="flex gap-2">
                  {COLOR_PRESETS.map(c => (
                    <button
                      key={c.bg}
                      type="button"
                      onClick={() => setColor(c)}
                      title={c.label}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${color.bg === c.bg ? 'border-slate-400 scale-110' : 'border-transparent'}`}
                      style={{ background: c.bg }}
                    />
                  ))}
                </div>
              </div>

              {state.error && <p className="text-red-500 text-sm">{state.error}</p>}

              <button
                type="submit"
                disabled={pending}
                className="w-full py-3 bg-teal-400 text-white rounded-2xl font-medium hover:bg-teal-500 transition-colors disabled:opacity-60 mt-2"
              >
                {pending ? '신청 중...' : '신청하기'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
