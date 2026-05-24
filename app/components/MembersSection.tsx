import { supabase } from '@/lib/supabase'
import AddMemberModal from './AddMemberModal'

export default async function MembersSection() {
  const { data: members } = await supabase
    .from('members')
    .select('*')
    .order('books_count', { ascending: false })

  const list = members ?? []

  return (
    <section id="members" className="py-28 px-8 bg-[#BDF1E7] relative overflow-hidden">
      {/* Elegant thin line circles like the brand logo */}
      <div className="absolute left-0 bottom-1/4 w-[320px] h-[320px] rounded-full border border-[#142825]/8 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-[#142825]/4 pointer-events-none" />
      </div>
      <div className="absolute -right-16 top-1/4 w-[400px] h-[400px] rounded-full border border-[#142825]/8 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-[#142825]/4 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-14">
          <div className="flex items-center gap-3.5">
            <div className="w-1.5 h-6 rounded-full bg-[#142825]" />
            <h2 className="text-2xl font-bold text-[#142825] font-serif" style={{ fontFamily: "var(--font-serif), serif" }}>
              멤버
            </h2>
          </div>
          {list.length > 0 && <span className="text-xs text-[#142825]/70 font-bold uppercase tracking-widest">{list.length}명의 독서인</span>}
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#142825]/20 p-20 text-center mb-10 bg-transparent">
            <div className="text-5xl mb-5">👥</div>
            <p className="text-[#142825]/85 font-bold mb-2">아직 멤버가 없어요</p>
            <p className="text-xs text-[#142825]/60">보름 독서 모임의 첫 번째 멤버가 되어보세요</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-14">
            {list.map(member => (
              <div
                key={member.id}
                className="group p-5 border border-[#142825]/12 transition-all duration-300 hover:border-[#142825]/35 hover:-translate-y-1 cursor-pointer text-center relative overflow-hidden bg-transparent rounded-2xl flex flex-col justify-between"
              >
                <div className="relative mx-auto mb-4 w-14 h-14">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border border-[#BDF1E7] shadow-sm transition-transform duration-300 group-hover:scale-105"
                    style={{ background: member.avatar_bg, color: member.avatar_text }}
                  >
                    {member.avatar_char}
                  </div>
                  {member.role === '운영진' && (
                    <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 bg-[#142825] rounded-full flex items-center justify-center border border-[#BDF1E7] shadow-sm">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-[#142825] text-sm mb-0.5">{member.name}</p>
                    <p className="text-[10px] font-bold text-[#142825]/60 mb-3 tracking-wide">{member.books_count}권 완독</p>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center mt-1">
                    {(member.interests ?? []).slice(0, 2).map((interest: string) => (
                      <span key={interest} className="text-[10px] font-semibold px-2 py-0.5 bg-[#142825]/5 text-[#142825] rounded-full border border-[#142825]/10">{interest}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="bg-[#142825] p-10 md:p-14 text-center relative overflow-hidden border border-[#142825] rounded-none">
          {/* Abstract thin line circles inside the banner */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#BDF1E7]/8 pointer-events-none z-0 flex items-center justify-center">
            <div className="w-[85%] h-[85%] rounded-full border border-[#BDF1E7]/4 pointer-events-none" />
          </div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full border border-[#BDF1E7]/8 pointer-events-none z-0" />

          <div className="relative z-10 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#BDF1E7]/10 flex items-center justify-center mx-auto mb-5.5 border border-[#BDF1E7]/15 backdrop-blur-sm">
              <svg className="w-5 h-5 text-[#BDF1E7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-2xl mb-3 font-serif" style={{ fontFamily: "var(--font-serif), serif" }}>
              함께 읽고 싶으신가요?
            </h3>
            <p className="text-[#BDF1E7]/80 text-xs font-medium leading-relaxed mb-8">
              매달 한 권, 함께 읽고 밀도 있게 나누는 보름 독서 모임에 지금 참여해보세요.<br />
              따뜻하고 다정한 독서 메이트들이 기다리고 있습니다.
            </p>
            <AddMemberModal />
          </div>
        </div>
      </div>
    </section>
  )
}
