import { Suspense } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import CurrentBookSection from "./components/CurrentBookSection"
import ReviewsSection from "./components/ReviewsSection"
import ScheduleSection from "./components/ScheduleSection"
import MembersSection from "./components/MembersSection"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="py-24 flex justify-center text-gray-300">불러오는 중...</div>}>
          <CurrentBookSection />
        </Suspense>
        <Suspense fallback={<div className="py-24 flex justify-center text-gray-300">불러오는 중...</div>}>
          <ReviewsSection />
        </Suspense>
        <Suspense fallback={<div className="py-24 flex justify-center text-gray-300">불러오는 중...</div>}>
          <ScheduleSection />
        </Suspense>
        <Suspense fallback={<div className="py-24 flex justify-center text-gray-300">불러오는 중...</div>}>
          <MembersSection />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
