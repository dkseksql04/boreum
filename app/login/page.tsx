'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Redirect to home if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/');
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        setMessage({
          type: 'success',
          text: '보름 모임에 오신 것을 환영합니다! 로그인에 성공했습니다.',
        });
        setTimeout(() => {
          router.push('/');
        }, 1200);
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        setMessage({
          type: 'success',
          text: '보름 멤버 가입을 환영합니다! 입력하신 이메일의 인증 메일을 확인해 주시거나 바로 로그인해 주세요.',
        });
        setTimeout(() => {
          setMode('login');
          setMessage(null);
        }, 2500);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '인증 과정 중 에러가 발생했습니다. 다시 시도해 주세요.';
      console.error("Auth error:", err);
      setMessage({
        type: 'error',
        text: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'kakao' | 'google') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined
        }
      });
      if (error) throw error;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '인증 과정 중 에러가 발생했습니다. 다시 시도해 주세요.';
      console.error("OAuth error:", err);
      setMessage({ type: 'error', text: errorMsg });
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#BDF1E7] pt-56 pb-24 px-8 flex items-center justify-center relative overflow-hidden">
        {/* Dynamic background circles */}
        <div className="absolute -left-16 top-48 w-80 h-80 rounded-full border border-[#142825]/5 pointer-events-none z-0" />
        <div className="absolute right-12 bottom-20 w-96 h-96 rounded-full border border-[#142825]/5 pointer-events-none z-0" />

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center relative z-10">
          
          {/* Left Panel: Poetic/Editorial Quote */}
          <div className="md:col-span-6 text-black pr-0 md:pr-8">
            <span className="text-[10px] font-extrabold tracking-widest text-[#142825]/60 uppercase block mb-4">
              Boreum Editorial
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-6" style={{ fontFamily: "var(--font-serif), serif" }}>
              달이 차오를 때,<br />우리의 사유도<br />함께 물듭니다.
            </h1>
            <p className="text-xs font-semibold text-[#142825]/75 leading-relaxed max-w-sm">
              인공지능과 과학기술이 만연한 일상 속에서, 문학의 렌즈를 통해 삶과 인간성을 성찰하는 청년 독서 공동체 보름입니다. 지금 로그인하여 함께 사유의 알을 깨부수어 보세요.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-sm font-bold bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                🌙
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-black/50 uppercase tracking-widest">Active Community</p>
                <p className="text-xs font-extrabold text-black">YoungCoreCrew (YCC)</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Login Form Card */}
          <div className="md:col-span-6 w-full flex justify-center">
            <div className="bg-[#BDF1E7] border-2 border-black rounded-3xl p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(20,40,37,1)] relative overflow-hidden text-black bg-white/70 backdrop-blur-md">
              
              {/* Decorative mini moon inside card background */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full border border-black/5 pointer-events-none" />

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-serif font-extrabold tracking-tight">Welcome to Boreum</h2>
                <p className="text-xs text-black/60 font-semibold tracking-wider mt-1.5 uppercase">
                  {mode === 'login' ? '보름 독서 모임 로그인' : '보름 신규 멤버 가입'}
                </p>
              </div>

              {/* Tab Toggle between Login and Signup */}
              <div className="flex border-2 border-black rounded-xl overflow-hidden mb-6 bg-white font-extrabold text-[10px] tracking-widest uppercase">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setMessage(null); }}
                  className={`flex-1 py-2.5 transition-all cursor-pointer ${mode === 'login' ? 'bg-black text-[#BDF1E7]' : 'bg-white text-black hover:bg-black/5'}`}
                >
                  로그인
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setMessage(null); }}
                  className={`flex-1 py-2.5 transition-all cursor-pointer ${mode === 'signup' ? 'bg-black text-[#BDF1E7]' : 'bg-white text-black hover:bg-black/5'}`}
                >
                  회원가입
                </button>
              </div>

              {/* Status Messages */}
              {message && (
                <div
                  className={`mb-6 p-4 rounded-xl border text-xs font-bold transition-all duration-300 ${
                    message.type === 'success'
                      ? 'bg-black text-[#BDF1E7] border-black animate-bounce'
                      : 'bg-red-50 text-red-650 border-red-250'
                  }`}
                >
                  {message.type === 'success' ? '🌿 ' : '⚠️ '}
                  {message.text}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold tracking-widest text-black/70 mb-1.5 uppercase">
                    이메일 주소
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@boreum.com"
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold placeholder-black/40 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold tracking-widest text-black/70 mb-1.5 uppercase">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-xs font-semibold placeholder-black/40 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  />
                </div>

                {mode === 'login' && (
                  <div className="flex items-center justify-between text-[10px] font-extrabold tracking-wider text-black/60 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="rounded border-black text-black focus:ring-0 focus:ring-offset-0 accent-black cursor-pointer"
                      />
                      로그인 상태 유지
                    </label>
                    <a href="#" className="hover:text-black transition-colors underline decoration-black/25">
                      비밀번호 분실
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-black text-[#BDF1E7] border-2 border-black rounded-xl font-extrabold text-[10px] tracking-widest uppercase hover:bg-black/90 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-3 w-3 text-[#BDF1E7]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      인증 처리 중...
                    </>
                  ) : (
                    mode === 'login' ? '로그인' : '회원가입 완료하기'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center justify-between my-6">
                <div className="h-[1px] bg-black/15 flex-1" />
                <span className="text-[9px] font-extrabold tracking-widest text-black/40 px-3 uppercase">
                  소셜 계정 로그인
                </span>
                <div className="h-[1px] bg-black/15 flex-1" />
              </div>

              {/* Social Logins */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('kakao')}
                  className="py-2.5 bg-[#FEE500] hover:bg-[#FEE500]/95 border-2 border-black rounded-xl text-[9px] font-extrabold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[#191919]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#191919]" />
                  KAKAO
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('google')}
                  className="py-2.5 bg-white hover:bg-slate-50 border-2 border-black rounded-xl text-[9px] font-extrabold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer text-black"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  GOOGLE
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
