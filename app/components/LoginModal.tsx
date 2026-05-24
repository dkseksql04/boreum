'use client';

import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulated authentic authentication flow
    setTimeout(() => {
      setIsLoading(false);
      if (email.includes('@') && password.length >= 4) {
        setMessage({
          type: 'success',
          text: '보름 모임에 오신 것을 환영합니다! 로그인에 성공했습니다.',
        });
        setTimeout(() => {
          onClose();
          setMessage(null);
        }, 1500);
      } else {
        setMessage({
          type: 'error',
          text: '이메일 주소 또는 비밀번호를 다시 확인해 주세요.',
        });
      }
    }, 1200);
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
        <div className="text-center mt-4 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-black mb-3 bg-white">
            <span className="font-serif font-bold text-lg">B</span>
          </div>
          <h2 className="text-2xl font-serif font-extrabold tracking-tight">Welcome to Boreum</h2>
          <p className="text-xs text-black/60 font-semibold tracking-wider mt-1.5 uppercase">
            보름 독서 모임 로그인
          </p>
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
              '로그인'
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
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                setMessage({ type: 'success', text: '카카오톡으로 로그인되었습니다.' });
                setTimeout(() => { onClose(); setMessage(null); }, 1500);
              }, 1000);
            }}
            className="py-2.5 bg-[#FEE500] hover:bg-[#FEE500]/95 border-2 border-black rounded-xl text-[9px] font-extrabold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[#191919]"
          >
            {/* Kakao logo placeholder/SVG */}
            <span className="w-2 h-2 rounded-full bg-[#191919]" />
            KAKAO
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                setMessage({ type: 'success', text: 'Google 계정으로 로그인되었습니다.' });
                setTimeout(() => { onClose(); setMessage(null); }, 1500);
              }, 1000);
            }}
            className="py-2.5 bg-white hover:bg-slate-50 border-2 border-black rounded-xl text-[9px] font-extrabold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer text-black"
          >
            {/* Google logo placeholder/SVG */}
            <span className="w-2 h-2 rounded-full bg-red-500" />
            GOOGLE
          </button>
        </div>

        {/* Sign Up Footer */}
        <div className="text-center text-[10px] font-bold text-black/50 mt-6 tracking-wide">
          아직 보름 멤버가 아니신가요?{' '}
          <a href="#members" onClick={onClose} className="text-black font-extrabold hover:underline">
            멤버 가입 신청
          </a>
        </div>
      </div>
    </div>
  );
}
