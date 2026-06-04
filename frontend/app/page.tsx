import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import CurrentBookSection from "./components/CurrentBookSection"
import ScheduleSection from "./components/ScheduleSection"
import ReviewsSection from "./components/ReviewsSection"
import MembersSection from "./components/MembersSection"
import QuoteCompanionSection from "./components/QuoteCompanionSection"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CurrentBookSection />
        <ScheduleSection />
        <ReviewsSection />
        <MembersSection />
        <QuoteCompanionSection />
      </main>
      <Footer />
    </>
  )
}



