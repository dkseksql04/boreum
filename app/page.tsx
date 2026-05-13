import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CurrentBookSection from "./components/CurrentBookSection";
import ReviewsSection from "./components/ReviewsSection";
import ScheduleSection from "./components/ScheduleSection";
import MembersSection from "./components/MembersSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CurrentBookSection />
        <ReviewsSection />
        <ScheduleSection />
        <MembersSection />
      </main>
      <Footer />
    </>
  );
}
