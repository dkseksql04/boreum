"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Quote {
  id?: string;
  book_title: string;
  quote_text: string;
  user_note: string;
  created_at?: string;
}

export default function QuoteCompanionSection() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [userNote, setUserNote] = useState("");
  
  const [userSituation, setUserSituation] = useState("");
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load quotes from Supabase, fallback to localStorage if table doesn't exist yet
  const loadQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_quotes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (e) {
      console.warn("Supabase saved_quotes table not ready. Falling back to localStorage.", e);
      const local = localStorage.getItem("boreum_saved_quotes");
      if (local) {
        setQuotes(JSON.parse(local));
      } else {
        // Default seed quotes for first-time gorgeous presentation
        const seed = [
          {
            book_title: "데미안 (헤르만 헤세)",
            quote_text: "새는 알에서 나오려고 투쟁한다. 알은 세계이다. 태어나려는 자는 하나의 세계를 깨뜨려야 한다.",
            user_note: "새로운 도전을 고민할 때마다 마음에 새기는 용기의 글귀."
          },
          {
            book_title: "명상록 (마르쿠스 아우렐리우스)",
            quote_text: "우리를 불안하게 만드는 것은 외부의 일들이 아니라, 그것들에 대해 우리가 내리는 판단이다.",
            user_note: "스트레스 받거나 흔들릴 때 가장 강한 버팀목이 되는 구절."
          }
        ];
        setQuotes(seed);
        localStorage.setItem("boreum_saved_quotes", JSON.stringify(seed));
      }
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  // Handle adding a new quote
  const handleAddQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle || !quoteText) return;

    const newQuote: Quote = {
      book_title: bookTitle,
      quote_text: quoteText,
      user_note: userNote,
      created_at: new Date().toISOString()
    };

    try {
      // 1. Try Supabase
      const { error } = await supabase.from("saved_quotes").insert([{
        user_id: "00000000-0000-0000-0000-000000000000", // guest UUID for prototyping
        book_title: bookTitle,
        quote_text: quoteText,
        user_note: userNote
      }]);

      if (error) throw error;
      await loadQuotes();
    } catch (e) {
      // 2. Fallback to localStorage
      console.warn("Saving to localStorage due to database migration pending.", e);
      const updated = [newQuote, ...quotes];
      setQuotes(updated);
      localStorage.setItem("boreum_saved_quotes", JSON.stringify(updated));
    }

    // Reset Form
    setBookTitle("");
    setQuoteText("");
    setUserNote("");
    setShowAddForm(false);
  };

  // Handle deleting a quote
  const handleDeleteQuote = async (idx: number, id?: string) => {
    try {
      if (id) {
        const { error } = await supabase.from("saved_quotes").delete().eq("id", id);
        if (error) throw error;
        await loadQuotes();
        return;
      }
      throw new Error("No database ID");
    } catch (e) {
      const updated = quotes.filter((_, i) => i !== idx);
      setQuotes(updated);
      localStorage.setItem("boreum_saved_quotes", JSON.stringify(updated));
    }
  };

  // Ask the NotebookLM Oracle for guidance based on saved quotes
  const handleAskOracle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSituation.trim()) return;

    setLoading(true);
    setAiResponse(null);

    try {
      const response = await fetch("/api/quote-companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userSituation })
      });

      const data = await response.json();
      setAiResponse(data);
    } catch (error) {
      console.error("Failed to query AI Oracle:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote-companion" className="py-28 px-8 bg-[#BDF1E7] relative overflow-hidden border-t border-black/5">
      {/* Decorative thin circles echoing the logo */}
      <div className="absolute -left-16 bottom-10 w-72 h-72 rounded-full border border-black/8 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-black/4" />
      </div>
      <div className="absolute right-12 top-10 w-96 h-96 rounded-full border border-black/8 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-black/4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex items-start gap-3.5">
            <div className="w-1.5 h-6 rounded-full bg-black mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-black font-serif" style={{ fontFamily: "var(--font-serif), serif" }}>
                나만의 사유 아카이브 & AI 컴패니언
              </h2>
              <p className="text-xs text-black/60 font-semibold tracking-wide mt-1.5 font-sans uppercase">
                NotebookLM Style · 수집된 지혜만을 바탕으로 하는 상황 맞춤 AI 조언
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start md:self-end px-5 py-2.5 bg-black text-[#BDF1E7] rounded-xl text-xs font-bold transition-all duration-300 hover:bg-[#203D39] hover:scale-[1.02] shadow-sm flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            마음에 드는 구절 스크랩
          </button>
        </div>

        {/* 1. Add Quote Form (Sliding drop-down sheet, clean lines) */}
        {showAddForm && (
          <form 
            onSubmit={handleAddQuote}
            className="mb-12 p-6 md:p-8 border border-black/15 bg-white/45 backdrop-blur-sm rounded-2xl max-w-3xl animate-fadeIn"
          >
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-5 border-b border-black/10 pb-2">
              새로운 영감 구절 등록
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-5">
              <div>
                <label className="block text-[10px] font-bold text-black/50 uppercase tracking-wider mb-1.5">출처 책 제목</label>
                <input
                  type="text"
                  required
                  placeholder="예: 명상록 (마르쿠스 아우렐리우스)"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-sm font-semibold text-black placeholder-black/30 focus:border-black focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-black/50 uppercase tracking-wider mb-1.5">감명 깊은 구절 본문</label>
                <textarea
                  required
                  rows={3}
                  placeholder="가슴에 새기고 싶은 책 속 소중한 한 줄을 적어보세요..."
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-sm font-semibold text-black placeholder-black/30 focus:border-black focus:outline-none transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-black/50 uppercase tracking-wider mb-1.5">나만의 감상 / 메모 (선택)</label>
                <input
                  type="text"
                  placeholder="구절을 스크랩하며 남기고 싶은 당신만의 깊은 생각을 기록해보세요..."
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-sm font-semibold text-black placeholder-black/30 focus:border-black focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 border border-black/20 rounded-xl text-xs font-bold text-black hover:bg-black/5 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-black text-[#BDF1E7] rounded-xl text-xs font-bold hover:bg-[#203D39] transition-all"
              >
                구절 저장하기
              </button>
            </div>
          </form>
        )}

        {/* Grid Container splitting Scrapbook left and AI Oracle right (Vogue style structure) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: Personal Quote Library Scrapbook (lg:col-span-7) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-5 flex items-center gap-2">
              📂 사유 보관소갈피 ({quotes.length})
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {quotes.map((q, idx) => (
                <div
                  key={idx}
                  className="group relative p-5 border border-black/12 bg-white/20 backdrop-blur-sm rounded-xl flex flex-col justify-between min-h-[160px] hover:border-black/30 transition-all duration-300"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteQuote(idx, q.id)}
                    className="absolute top-3 right-3 text-black/30 hover:text-black opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label="Delete quote"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Quote content */}
                  <div>
                    <span className="text-[9px] font-extrabold text-black/50 tracking-widest uppercase block mb-2">{q.book_title}</span>
                    <p className="text-xs font-bold text-black/90 font-serif leading-relaxed" style={{ fontFamily: "var(--font-serif), serif" }}>
                      "{q.quote_text}"
                    </p>
                  </div>

                  {/* Personal note */}
                  {q.user_note && (
                    <div className="mt-4 pt-3 border-t border-black/5">
                      <p className="text-[10px] font-medium text-black/60 italic leading-snug">
                        📝 {q.user_note}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: AI Quote Oracle Companion - NotebookLM style (lg:col-span-5) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 border border-black/15 bg-white/35 backdrop-blur-md p-6 md:p-8 rounded-2xl flex flex-col justify-between min-h-[500px] shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
            <div>
              <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-2 flex items-center gap-2 border-b border-black/10 pb-2.5">
                🔮 AI 구절 오라클 (Boreum Companion)
              </h3>
              <p className="text-[11px] font-semibold text-black/75 leading-relaxed mb-6">
                인터넷의 조각 정보나 타인의 해답을 배제합니다. 오직 당신이 읽고 수집한 위의 **사유 보관소 문장들만을 온전한 우주(Knowledge Base)로 삼아** 당신의 고민에 맞는 최고의 인생 문장과 사유를 제공합니다.
              </p>

              {/* Form to submit situation */}
              <form onSubmit={handleAskOracle} className="mb-6">
                <label className="block text-[10px] font-bold text-black/50 uppercase tracking-wider mb-2">오늘 당신의 심리 상황이나 고민</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="예: 오늘 선택을 앞두고 용기가 안 나 / 번아웃이 온 것 같아..."
                    value={userSituation}
                    onChange={(e) => setUserSituation(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white border border-black/10 rounded-xl text-xs font-semibold text-black placeholder-black/30 focus:border-black focus:outline-none transition-colors shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 bg-black text-[#BDF1E7] rounded-xl text-xs font-bold hover:bg-[#203D39] transition-all disabled:opacity-50"
                  >
                    질문하기
                  </button>
                </div>
              </form>

              {/* AI Response Display */}
              {loading && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  {/* Premium animated book drawing */}
                  <div className="w-12 h-12 relative mb-4 animate-pulse">
                    <svg className="w-full h-full text-black stroke-black fill-none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-bold tracking-[0.25em] text-black/60 uppercase pl-[0.25em] animate-pulse">
                    당신의 사유 서재 검색 중...
                  </p>
                </div>
              )}

              {aiResponse && !loading && (
                <div className="border border-black/10 bg-white/50 p-5 rounded-xl animate-fadeIn">
                  <span className="text-[8px] font-extrabold bg-black text-[#BDF1E7] px-2 py-0.5 rounded-full tracking-widest uppercase block w-max mb-3">
                    Selected Wisdom
                  </span>
                  
                  {/* Referenced book & quote */}
                  <div className="pl-3.5 border-l-2 border-black/30 mb-5">
                    <p className="text-xs font-bold text-black font-serif leading-relaxed mb-1.5" style={{ fontFamily: "var(--font-serif), serif" }}>
                      "{aiResponse.quote_text}"
                    </p>
                    <span className="text-[9px] font-bold text-black/50 uppercase tracking-widest block">
                      — 《{aiResponse.book_title}》 갈피 발췌
                    </span>
                  </div>

                  {/* AI Synthesized Advice Essay */}
                  <p className="text-xs text-black/85 leading-relaxed font-medium whitespace-pre-line border-t border-black/5 pt-4">
                    {aiResponse.aiAdvice}
                  </p>
                </div>
              )}

              {!aiResponse && !loading && (
                <div className="py-14 border border-dashed border-black/15 text-center rounded-xl bg-transparent">
                  <span className="text-3xl block mb-3">🔮</span>
                  <p className="text-xs font-bold text-black/60">당신의 고민을 위의 입력창에 들려주세요</p>
                  <p className="text-[9px] font-medium text-black/45 mt-1">당신이 사랑한 구절의 지혜로 답해드립니다</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
