"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface Meeting {
  id: string;
  title: string;
  book_id?: string;
  meeting_date: string;
  time_range?: string;
  location?: string;
  attendees: number;
  max_attendees: number;
  status: string;
  is_highlight: boolean;
  leader_id?: string;
  notice?: string;
  books?: { title: string } | null;
}

interface Announcement {
  id: string;
  content: string;
  created_at: string;
}

const seedMeetings: Record<string, Meeting> = {
  "demian": {
    id: "demian",
    title: "헤르만 헤세 《데미안》과 현대 사회의 주체적 자아 성찰",
    meeting_date: "2026-06-15",
    time_range: "오후 3:00 - 5:30",
    location: "서울 마포구 연남동 북카페 보름달 아지트",
    attendees: 8,
    max_attendees: 15,
    status: "upcoming",
    is_highlight: true,
    leader_id: "guest", // matches the guest state or prototype account
    notice: "반갑습니다! 첫 모임 전까지 헤르만 헤세의 《데미안》을 완독하고, 가장 인상 깊었던 구절 1개와 그 이유를 적어오세요. 당일 오프라인 모임에서는 각자 부수고 싶은 자신만의 알(세계)과 현대인들의 한계에 대해 심도 깊은 대화를 나눌 예정입니다.",
    books: { title: "데미안 (헤르만 헤세)" }
  },
  "meditation": {
    id: "meditation",
    title: "마르쿠스 아우렐리우스 《명상록》으로 읽는 불안과 내면의 평온",
    meeting_date: "2026-06-22",
    time_range: "오후 4:00 - 6:30",
    location: "온라인 실시간 Zoom 회의실",
    attendees: 5,
    max_attendees: 12,
    status: "upcoming",
    is_highlight: false,
    leader_id: "leader-meditation",
    notice: "안녕하세요. 이번 모임은 온라인으로 진행됩니다. 명상록을 읽으며 일상에서 마음을 흔드는 불안 요소들을 나열하고, 스토아 철학 관점에서 이를 어떻게 흘려보낼 수 있을지 의견을 준비해 주시기 바랍니다.",
    books: { title: "명상록 (마르쿠스 아우렐리우스)" }
  }
};

export default function MeetingDetailPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [user, setUser] = useState<any>(null);
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  // Monitor Supabase Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch meeting data and local storage state
  useEffect(() => {
    if (!id) return;

    const fetchMeeting = async () => {
      setLoading(true);
      try {
        // 1. Try to fetch from Supabase
        const { data, error } = await supabase
          .from("meetings")
          .select("*, books(*)")
          .eq("id", id)
          .single();

        if (error || !data) {
          throw new Error("Supabase fetch failed or empty");
        }

        // If data exists, format it
        const formatted: Meeting = {
          id: data.id,
          title: data.title,
          book_id: data.book_id,
          meeting_date: data.meeting_date,
          time_range: data.time_range,
          location: data.location,
          attendees: data.attendees,
          max_attendees: data.max_attendees,
          status: data.status,
          is_highlight: data.is_highlight,
          leader_id: data.leader_id || "guest",
          notice: data.notice || "",
          books: data.books ? { title: data.books.title } : null
        };
        setMeeting(formatted);
      } catch (err) {
        console.warn("Could not retrieve meeting from DB, falling back to local seed/cache:", err);
        // Fallback to seeds or mock local storage
        if (seedMeetings[id]) {
          setMeeting(seedMeetings[id]);
        } else {
          // Check if there is a cached meeting in localStorage
          const localMeta = localStorage.getItem(`boreum_meeting_meta_${id}`);
          if (localMeta) {
            setMeeting(JSON.parse(localMeta));
          } else {
            // Ultimate fallback so the page never blanks out
            const mockMeeting: Meeting = {
              id,
              title: "신규 독서 토론 모임",
              meeting_date: new Date().toISOString().split("T")[0],
              time_range: "오후 2:00 - 4:30",
              location: "연남동 아지트",
              attendees: 2,
              max_attendees: 10,
              status: "upcoming",
              is_highlight: false,
              leader_id: "guest",
              notice: "새로 등록된 모임입니다. 모임장 공지사항이 준비 중입니다.",
              books: { title: "데미안 (헤르만 헤세)" }
            };
            setMeeting(mockMeeting);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id]);

  // Load announcements and join status from localStorage/state cache
  useEffect(() => {
    if (!id) return;
    
    // Load announcements
    const localAnnouncements = localStorage.getItem(`boreum_announcements_${id}`);
    if (localAnnouncements) {
      setAnnouncements(JSON.parse(localAnnouncements));
    } else if (meeting?.notice) {
      // Default to initial notice
      setAnnouncements([
        {
          id: "initial",
          content: meeting.notice,
          created_at: new Date().toISOString()
        }
      ]);
    }

    // Load user join status
    const joinedKey = user ? `boreum_joined_${id}_${user.id}` : `boreum_joined_${id}_guest`;
    const localJoined = localStorage.getItem(joinedKey);
    setIsJoined(localJoined === "true");
  }, [id, meeting, user]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#BDF1E7] flex flex-col items-center justify-center pt-32">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-serif font-bold text-black/60 tracking-wider">모임 상세 정보를 구성하는 중...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!meeting) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#BDF1E7] flex flex-col items-center justify-center pt-32 text-black">
          <span className="text-5xl mb-4">🔍</span>
          <h2 className="text-xl font-bold font-serif mb-2">모임을 찾을 수 없습니다</h2>
          <button onClick={() => router.push("/")} className="px-4 py-2 bg-black text-[#BDF1E7] rounded-xl font-bold text-xs hover:bg-[#203D39]">
            메인 페이지로 이동
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Check authorization
  // If leader_id matches current user's ID, or if it is "guest" and user is logged in as guest/anonymous
  const isLeader = user && (user.id === meeting.leader_id || meeting.leader_id === "guest");

  // Handle Join/Cancel meeting
  const handleJoinToggle = () => {
    if (!user) {
      // If not logged in, trigger login modal
      alert("모임 참석 신청을 위해 먼저 로그인해 주세요.");
      // Open Login Modal via clicking the navbar's login button programmatically or telling them
      const loginBtn = document.querySelector('button[onClick*="setIsLoginOpen(true)"]') as HTMLButtonElement;
      if (loginBtn) {
        loginBtn.click();
      } else {
        // Fallback: alert
        alert("상단 바의 [로그인] 버튼을 통해 보름에 입장하실 수 있습니다.");
      }
      return;
    }

    const nextState = !isJoined;
    setIsJoined(nextState);

    const joinedKey = `boreum_joined_${meeting.id}_${user.id}`;
    localStorage.setItem(joinedKey, String(nextState));

    // Update local attendees count
    const updatedMeeting = {
      ...meeting,
      attendees: nextState ? meeting.attendees + 1 : Math.max(0, meeting.attendees - 1)
    };
    setMeeting(updatedMeeting);
    localStorage.setItem(`boreum_meeting_meta_${meeting.id}`, JSON.stringify(updatedMeeting));

    alert(nextState ? "🌿 모임 참석 신청이 완료되었습니다! 일정을 잊지 마세요." : "참석 신청이 취소되었습니다.");
  };

  // Handle leader publishing a new announcement
  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;

    const newObj: Announcement = {
      id: Math.random().toString(36).substr(2, 9),
      content: newAnnouncement.trim(),
      created_at: new Date().toISOString()
    };

    const updatedList = [newObj, ...announcements];
    setAnnouncements(updatedList);
    localStorage.setItem(`boreum_announcements_${meeting.id}`, JSON.stringify(updatedList));
    setNewAnnouncement("");
    alert("📢 새로운 공지사항이 성공적으로 등록되었습니다!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#BDF1E7] pt-32 pb-24 px-8 text-[#142825]">
        
        {/* Dynamic circular background art */}
        <div className="absolute -left-12 top-48 w-80 h-80 rounded-full border border-[#142825]/5 pointer-events-none z-0" />
        <div className="absolute right-12 bottom-20 w-96 h-96 rounded-full border border-[#142825]/5 pointer-events-none z-0" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Back Navigation Link */}
          <button 
            onClick={() => router.push("/")}
            className="mb-8 flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#142825]/60 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            메인 홈으로 돌아가기
          </button>

          {/* Hero Banner Header */}
          <div className="p-8 md:p-12 border-2 border-black rounded-3xl bg-white shadow-[8px_8px_0px_0px_rgba(20,40,37,1)] mb-10 overflow-hidden relative">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border border-[#142825]/8" />
            
            <span className="text-[10px] font-extrabold tracking-widest bg-black text-[#BDF1E7] px-3 py-1 rounded-full uppercase block w-max mb-4">
              독서 토론 모임 일정
            </span>
            <h1 className="text-2xl md:text-4xl font-bold font-serif leading-tight mb-4 tracking-tight" style={{ fontFamily: "var(--font-serif), serif" }}>
              {meeting.title}
            </h1>

            {meeting.books && (
              <p className="text-sm font-bold text-[#142825]/80 flex items-center gap-2 font-sans mb-6">
                <span>📖 선정 도서:</span>
                <span className="underline decoration-black/25 font-extrabold text-black">{meeting.books.title}</span>
              </p>
            )}

            {/* Quick Details Icons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-black/10">
              <div className="flex items-start gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <h4 className="text-[10px] font-extrabold text-black/40 uppercase tracking-wider">모임 일시</h4>
                  <p className="text-xs font-extrabold mt-0.5">{meeting.meeting_date} {meeting.time_range ? `· ${meeting.time_range}` : ""}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <h4 className="text-[10px] font-extrabold text-black/40 uppercase tracking-wider">모임 장소</h4>
                  <p className="text-xs font-extrabold mt-0.5">{meeting.location || "장소 추후 공지"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-xl">👥</span>
                <div>
                  <h4 className="text-[10px] font-extrabold text-black/40 uppercase tracking-wider">모임 정원</h4>
                  <p className="text-xs font-extrabold mt-0.5">{meeting.attendees} / {meeting.max_attendees} 명 참여 예정</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ========================================================================= */}
            {/* LEFT COLUMN: announcements & guide (lg:col-span-7) */}
            {/* ========================================================================= */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Notice / Announcements area */}
              <div className="p-6 md:p-8 border border-black/15 bg-white/45 backdrop-blur-md rounded-2xl">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/10">
                  <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    📢 모임장 공지사항 피드
                  </h3>
                  {isLeader && (
                    <span className="text-[9px] font-extrabold bg-[#142825] text-[#BDF1E7] px-2 py-0.5 rounded-full tracking-wider">
                      ADMIN
                    </span>
                  )}
                </div>

                {/* Conditional Form: Only visible to the Leader */}
                {isLeader && (
                  <form onSubmit={handlePublishAnnouncement} className="mb-8 p-5 bg-white/60 border border-black/10 rounded-xl">
                    <label className="block text-[9px] font-bold text-black/50 uppercase tracking-widest mb-2">
                      🔒 새로운 공지 또는 토론 주제 등록
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newAnnouncement}
                      onChange={(e) => setNewAnnouncement(e.target.value)}
                      placeholder="멤버들에게 전달할 새로운 공지사항이나 독서 질문을 입력하세요..."
                      className="w-full px-4 py-2.5 bg-white border border-black/10 rounded-xl text-xs font-semibold text-black placeholder-black/30 focus:border-black focus:outline-none transition-colors resize-none mb-3"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-black text-[#BDF1E7] rounded-xl text-xs font-bold hover:bg-[#203D39] transition-all"
                      >
                        공지 등록하기
                      </button>
                    </div>
                  </form>
                )}

                {/* Announcements Feed list */}
                {announcements.length === 0 ? (
                  <div className="py-8 text-center border border-dashed border-black/10 rounded-xl bg-white/20">
                    <span className="text-2xl block mb-2">📭</span>
                    <p className="text-xs font-bold text-black/50">아직 등록된 공지사항이 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((ann, idx) => (
                      <div key={ann.id || idx} className="p-5 bg-white/60 border border-black/10 rounded-xl relative">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs">📢</span>
                          <span className="text-[10px] font-extrabold text-[#142825]/70">
                            {idx === announcements.length - 1 ? "최초 모임 개설 공지" : "추가 공지"}
                          </span>
                          <span className="text-[9px] font-bold text-[#142825]/40 ml-auto">
                            {new Date(ann.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-black/85 leading-relaxed font-semibold whitespace-pre-line">
                          {ann.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* General guide */}
              <div className="p-6 md:p-8 border border-black/15 bg-white/25 backdrop-blur-sm rounded-2xl">
                <h3 className="text-xs font-bold uppercase tracking-wider mb-4">
                  🌿 보름(Boreum) 독서 모임 가이드
                </h3>
                <div className="text-xs font-semibold leading-relaxed space-y-3 text-black/75">
                  <p>• 보름 모임은 한 달에 한 번 만나 2시간 반 동안 하나의 주제로 인문학 및 STS 관점의 토론을 나눕니다.</p>
                  <p>• 멤버 전원은 첫 모임 3일 전까지 자신의 독서 아카이브에 인용 구절 1개 이상을 수집하고, 간단한 메모를 작성해야 모임 참가가 가능합니다.</p>
                  <p>• 참가 신청 후 당일 노쇼 시 다음 모임 신청에 제한이 생길 수 있으니 신중히 일정을 조절해 주세요.</p>
                </div>
              </div>

            </div>

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: Sidebar Action card (lg:col-span-5) */}
            {/* ========================================================================= */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Attendance action card */}
              <div className="p-6 md:p-8 border border-black/15 bg-white/35 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
                <h3 className="text-xs font-bold uppercase tracking-wider mb-4 border-b border-black/10 pb-2.5">
                  참석 신청 현황
                </h3>
                
                {/* Visual Gauge Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-extrabold mb-2">
                    <span>참석 예정 멤버</span>
                    <span>{meeting.attendees} / {meeting.max_attendees} 명</span>
                  </div>
                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden border border-black/5">
                    <div 
                      className="h-full bg-black transition-all duration-500 ease-out"
                      style={{ width: `${Math.min(100, (meeting.attendees / meeting.max_attendees) * 100)}%` }}
                    />
                  </div>
                </div>

                {isLeader ? (
                  <div className="p-4 border border-dashed border-black/25 bg-white/50 rounded-xl text-center">
                    <span className="text-xl block mb-1">🔒</span>
                    <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">모임장 관리 모드</h4>
                    <p className="text-[10px] text-black/60 font-semibold leading-relaxed mt-1">
                      당신은 이 모임의 관리자입니다. 왼쪽 메뉴에서 새로운 공지나 과제 피드를 등록할 수 있습니다.
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleJoinToggle}
                    className={`w-full py-4 rounded-xl text-xs font-extrabold tracking-widest uppercase transition-all duration-300 active:scale-[0.98] ${
                      isJoined 
                        ? 'border-2 border-black text-black bg-transparent hover:bg-black/5' 
                        : 'bg-black text-[#BDF1E7] border-2 border-black hover:bg-[#203D39] hover:scale-[1.02] shadow-sm'
                    }`}
                  >
                    {isJoined ? "참석 신청 취소하기" : "이 문학 모임 참석 신청하기"}
                  </button>
                )}

                {/* Mock attendees list to make it look active */}
                <div className="mt-8 pt-6 border-t border-black/10">
                  <h4 className="text-[10px] font-extrabold text-black/50 uppercase tracking-widest mb-3">
                    참석자 명단
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1.5 bg-white/80 border border-black/10 rounded-lg text-[10px] font-extrabold">👑 모임장</span>
                    <span className="px-2.5 py-1.5 bg-white/50 border border-black/5 rounded-lg text-[10px] font-semibold text-black/70">김민수</span>
                    <span className="px-2.5 py-1.5 bg-white/50 border border-black/5 rounded-lg text-[10px] font-semibold text-black/70">이지은</span>
                    <span className="px-2.5 py-1.5 bg-white/50 border border-black/5 rounded-lg text-[10px] font-semibold text-black/70">박지성</span>
                    {isJoined && (
                      <span className="px-2.5 py-1.5 bg-black text-[#BDF1E7] rounded-lg text-[10px] font-extrabold animate-bounce">
                        ✨ {user?.email?.split('@')[0] || "나"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Book Details Box */}
              {meeting.books && (
                <div className="p-6 md:p-8 border border-black/15 bg-white/15 backdrop-blur-sm rounded-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-3">
                    📖 선정 도서 소개
                  </h3>
                  <h4 className="text-sm font-bold font-serif mb-2">{meeting.books.title}</h4>
                  <p className="text-xs text-black/60 font-semibold leading-relaxed">
                    자아의 발견과 영혼의 도전을 그린 문학적 고전. 이번 모임에서는 책 속에 깃든 '알을 깨는 투쟁'을 현대 사회의 개인주의 및 기술 발달 양상과 매핑하여 다각도로 사유해 봅니다.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
