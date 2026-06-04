import { Suspense } from "react";
import MeetingDetailClient from "@/app/components/MeetingDetailClient";

export const unstable_instant = {
  prefetch: 'runtime',
  samples: [
    { params: { id: 'demian' } }
  ]
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MeetingDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#BDF1E7] flex flex-col items-center justify-center pt-32">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif font-bold text-black/60 tracking-wider">모임 상세 정보를 불러오는 중...</p>
      </div>
    }>
      {params.then(({ id }) => (
        <MeetingDetailClient id={id} />
      ))}
    </Suspense>
  );
}
