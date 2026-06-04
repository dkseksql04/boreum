'use client';

import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createMeeting } from '@/app/actions';
import { supabase } from '@/lib/supabase';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { User } from '@supabase/supabase-js';

type Book = { id: string; title: string };

export default function CreateMeetingClient({ books }: { books: Book[] }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [memberRole, setMemberRole] = useState<string>("멤버");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [state, action, pending] = useActionState(createMeeting, { success: false });

  const fetchMemberRole = async (currentUser: User) => {
    try {
      const emailPrefix = currentUser.email?.split("@")[0] || "";
      const { data, error } = await supabase
        .from("members")
        .select("role")
        .eq("name", emailPrefix)
        .single();

      if (!error && data?.role) {
        setMemberRole(data.role);
      } else {
        setMemberRole("멤버");
      }
    } catch (e) {
      console.warn("Failed to fetch member role in CreateMeeting page:", e);
      setMemberRole("멤버");
    } finally {
      setCheckingAuth(false);
    }
  };

  // Monitor auth status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const activeUser = session?.user ?? null;
      setUser(activeUser);
      if (activeUser) {
        fetchMemberRole(activeUser);
      } else {
        setMemberRole("멤버");
        setCheckingAuth(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const activeUser = session?.user ?? null;
      setUser(activeUser);
      if (activeUser) {
        fetchMemberRole(activeUser);
      } else {
        setMemberRole("멤버");
        setCheckingAuth(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Redirect on successful creation
  useEffect(() => {
    if (state.success) {
      alert("🌿 새로운 모임이 개설되었습니다!");
      router.push('/');
    }
  }, [state.success, router]);

  // Is the user allowed to create meetings?
  // They must be logged in and hold the role of '모임장' or '운영진'
  const isAuthorized = user && (memberRole === "운영진" || memberRole === "모임장");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#BDF1E7] pt-56 pb-24 px-8 flex items-center justify-center relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute -left-12 top-48 w-80 h-80 rounded-full border border-[#142825]/5 pointer-events-none z-0" />
        <div className="absolute right-12 bottom-20 w-96 h-96 rounded-full border border-[#142825]/5 pointer-events-none z-0" />

        <div className="max-w-xl w-full relative z-10">
          {checkingAuth ? (
            <div className="bg-white/70 backdrop-blur-md border-2 border-black rounded-3xl p-12 text-center shadow-[8px_8px_0_0_rgba(20,40,37,1)] flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-serif font-bold text-black/60 tracking-wider">권한을 확인하는 중...</p>
            </div>
          ) : !isAuthorized ? (
            /* Unauthorized Screen */
            <div className="bg-white/80 backdrop-blur-md border-2 border-black rounded-3xl p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(20,40,37,1)] text-[#142825]">
              <span className="text-5xl block mb-6">🔒</span>
              <h2 className="text-xl md:text-2xl font-serif font-bold mb-4">모임 개설 권한이 없습니다</h2>
              <p className="text-xs font-semibold leading-relaxed mb-8 text-[#142825]/70 max-w-sm mx-auto">
                보름 독서 모임의 **모임장** 혹은 **운영진** 계정으로 로그인해야 새로운 모임을 개설할 수 있습니다. 
                {user ? ` 현재 계정(${user.email})은 '일반 멤버' 권한입니다.` : ' 먼저 로그인을 진행해 주세요.'}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 border-2 border-black rounded-xl text-xs font-bold text-black hover:bg-black/5 transition-all cursor-pointer"
                >
                  홈으로 가기
                </button>
                {!user ? (
                  <button
                    onClick={() => router.push('/login')}
                    className="px-6 py-3 bg-black text-[#BDF1E7] border-2 border-black rounded-xl text-xs font-bold hover:bg-[#203D39] transition-all cursor-pointer"
                  >
                    로그인하러 가기
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push('/login');
                    }}
                    className="px-6 py-3 bg-black text-[#BDF1E7] border-2 border-black rounded-xl text-xs font-bold hover:bg-[#203D39] transition-all cursor-pointer"
                  >
                    다른 계정 로그인
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Authorized Form Screen */
            <div className="bg-white/70 backdrop-blur-md border-2 border-black rounded-3xl p-8 w-full shadow-[8px_8px_0px_0px_rgba(20,40,37,1)] text-black">
              
              <div className="flex items-center justify-between mb-6 border-b border-black/15 pb-4">
                <div>
                  <h1 className="font-serif font-bold text-xl md:text-2xl">새로운 모임 개설</h1>
                  <p className="text-[10px] font-bold text-black/50 uppercase tracking-widest mt-1">
                    Boreum Meeting Creation
                  </p>
                </div>
                <button 
                  onClick={() => router.push('/')} 
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-[#BDF1E7] transition-all cursor-pointer text-xs font-bold"
                  aria-label="Cancel"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6 p-4 bg-[#142825] text-[#BDF1E7] border-2 border-black rounded-xl text-[10px] font-bold leading-relaxed flex items-center gap-2">
                <span>👑</span>
                <span><strong>{user.email?.split('@')[0]}님</strong> ({memberRole} 권한): 보름의 리더로서 새로운 사유의 장을 만들어보세요.</span>
              </div>

              <form action={action} className="space-y-4">
                <input type="hidden" name="leader_id" value={user?.id || 'guest'} />

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">
                    모임 제목 *
                  </label>
                  <input 
                    name="title" 
                    required 
                    placeholder="예: 6월 정기 토론 모임 - STS 관점에서 바라본 인간" 
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold placeholder-black/35 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">
                    토론 도서 선택
                  </label>
                  <select 
                    name="book_id" 
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold focus:outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    <option value="">책 선택 안함 (선택사항)</option>
                    {books.map(b => (
                      <option key={b.id} value={b.id}>{b.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">
                      모임 날짜 *
                    </label>
                    <input 
                      name="meeting_date" 
                      type="date" 
                      required 
                      className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold focus:outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">
                      모임 정원
                    </label>
                    <input 
                      name="max_attendees" 
                      type="number" 
                      defaultValue={15} 
                      min={1} 
                      className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold focus:outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">
                    진행 시간
                  </label>
                  <input 
                    name="time_range" 
                    placeholder="예: 오후 3:00 – 5:30" 
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold placeholder-black/35 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">
                    모임 장소
                  </label>
                  <input 
                    name="location" 
                    placeholder="예: 서울 마포구 연남동 북카페 보름달" 
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold placeholder-black/35 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-black/60 mb-1.5 uppercase">
                    모임장 첫 공지사항 및 토론 질문
                  </label>
                  <textarea 
                    name="notice" 
                    rows={4}
                    placeholder="멤버들에게 안내할 첫 공지 및 독서 토론 질문을 자유롭게 남겨보세요..." 
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold placeholder-black/35 focus:outline-none focus:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all resize-none" 
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none py-1">
                  <input 
                    name="is_highlight" 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-black accent-black cursor-pointer" 
                  />
                  <span className="text-[10px] font-extrabold tracking-wider text-black/70 uppercase">
                    대표 모임으로 등록 (하이라이트)
                  </span>
                </label>

                {state.error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-650 rounded-xl text-xs font-bold">
                    ⚠️ {state.error}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="flex-1 py-3.5 border-2 border-black rounded-xl text-[10px] tracking-widest font-extrabold uppercase hover:bg-black/5 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={pending}
                    className="flex-1 py-3.5 bg-black text-[#BDF1E7] border-2 border-black rounded-xl font-extrabold text-[10px] tracking-widest uppercase hover:bg-black/90 active:scale-[0.98] transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {pending ? '저장 중...' : '새로운 모임 개설하기'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
