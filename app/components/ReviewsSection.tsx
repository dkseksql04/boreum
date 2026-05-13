const reviews = [
  {
    id: 1,
    author: "김지유",
    avatar: "지",
    avatarBg: "#CCFBF1",
    avatarText: "#0F766E",
    book: "클라라와 태양",
    date: "2026.05.10",
    rating: 5,
    excerpt: "클라라가 태양을 바라보는 장면이 오래 머릿속에 남아요. 우리가 '영혼'이라고 부르는 것은 결국 관계 속에서만 존재하는 게 아닐까 싶었어요.",
    likes: 14,
    comments: 3,
  },
  {
    id: 2,
    author: "박준호",
    avatar: "준",
    avatarBg: "#E0F2FE",
    avatarText: "#0369A1",
    book: "클라라와 태양",
    date: "2026.05.08",
    rating: 5,
    excerpt: "이시구로가 AI를 서술자로 택한 게 탁월했어요. 인간을 가장 인간답게 볼 수 있는 시선이 오히려 외부에 있다는 역설 — STS 수업 내용이랑 연결됐습니다.",
    likes: 9,
    comments: 5,
  },
  {
    id: 3,
    author: "이서연",
    avatar: "서",
    avatarBg: "#FEF3C7",
    avatarText: "#92400E",
    book: "채식주의자",
    date: "2026.04.28",
    rating: 4,
    excerpt: "4월 마지막 모임에서 이 책을 두고 2시간 토론했는데도 모자랐어요. 폭력과 저항, 그 사이에서 영혜가 선택한 침묵의 의미가 계속 따라다녀요.",
    likes: 21,
    comments: 8,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= rating ? "text-teal-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full bg-teal-400" />
            <h2 className="text-xl font-bold text-slate-700" style={{ fontFamily: "var(--font-noto-serif-kr), serif" }}>
              독서 기록
            </h2>
          </div>
          <button className="text-sm text-teal-500 hover:text-teal-600 flex items-center gap-1 font-medium">
            전체 보기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: review.avatarBg, color: review.avatarText }}
                >
                  {review.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-600">{review.author}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 rounded-full mb-3 border border-teal-100">
                <svg className="w-3 h-3 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span className="text-xs text-teal-500 font-medium">{review.book}</span>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed literary line-clamp-4 mb-4">
                &ldquo;{review.excerpt}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-3 border-t border-gray-50">
                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {review.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-teal-500 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {review.comments}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 border border-dashed border-teal-200 text-teal-400 rounded-2xl text-sm hover:border-teal-400 hover:text-teal-500 hover:bg-teal-50/50 transition-all duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            나의 독서 기록 남기기
          </button>
        </div>
      </div>
    </section>
  );
}
