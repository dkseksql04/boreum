'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

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
          onClose();
          setMessage(null);
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
    } catch (err: any) {
      console.error("Auth error:", err);
      setMessage({
        type: 'error',
        text: err.message || '인증 과정 중 에러가 발생했습니다. 다시 시도해 주세요.',
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
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      console.error("OAuth error:", err);
      setMessage({ type: 'error', text: err.message });
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#BDF1E7] border-2 border-black rounded-3xl p-8 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden text-black animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Subtle decorative Moon outline inside the modal background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border border-black/10 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full border border-black/5 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-[#BDF1E7] transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mt-4 mb-6 flex flex-col items-center justify-center">
          {/* Real Brand Logo Mini Art for Login Modal */}
          <div className="relative flex items-center justify-center h-12 mb-3 select-none">
            <svg
              width="150"
              height="54"
              viewBox="0 0 220 80"
              className="overflow-visible select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <mask id="logo-mask-modal">
                  <rect x="-10" y="-10" width="240" height="100" fill="white" />
                  <text
                    x="48"
                    y="49"
                    fontFamily="var(--font-serif), 'Playfair Display', Georgia, serif"
                    fontSize="26"
                    fontWeight="400"
                    fill="black"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    letterSpacing="-0.03em"
                    className="select-none pointer-events-none"
                  >
                    Boreum
                  </text>
                </mask>
              </defs>
              <circle
                cx="60"
                cy="40"
                r="30"
                fill="none"
                stroke="#142825"
                strokeWidth="0.6"
                mask="url(#logo-mask-modal)"
                className="origin-[60px_40px] transition-transform duration-700 ease-out hover:rotate-45"
              />
              <text
                x="48"
                y="49"
                fontFamily="var(--font-serif), 'Playfair Display', Georgia, serif"
                fontSize="26"
                fontWeight="400"
                fill="#142825"
                letterSpacing="-0.03em"
                className="select-none pointer-events-none"
              >
                Boreum
              </text>
            </svg>
          </div>
          <h2 className="text-lg font-serif font-extrabold tracking-tight mt-1">Welcome to Boreum</h2>
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
                : 'bg-red-50 text-red-600 border-red-200'
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
              <label className="flex items-center gap-1.5 cursor-pointer">
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
                Processing...
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
            OR login with
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

        {/* Sign Up Footer Toggle */}
        <div className="text-center text-[10px] font-bold text-black/50 mt-6 tracking-wide">
          {mode === 'login' ? (
            <>
              아직 보름 멤버가 아니신가요?{' '}
              <button onClick={() => setMode('signup')} className="text-black font-extrabold hover:underline bg-transparent border-none cursor-pointer p-0">
                멤버 가입 신청
              </button>
            </>
          ) : (
            <>
              이미 보름 멤버이신가요?{' '}
              <button onClick={() => setMode('login')} className="text-black font-extrabold hover:underline bg-transparent border-none cursor-pointer p-0">
                로그인 화면으로
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
