import BackgroundFaceParallax from './components/BackgroundFaceParallax';
import ScrollProgressBar from './components/ScrollProgressBar';
import AboutSection from './sections/AboutSection';
import FooterSection from './sections/FooterSection';
import HeroSection from './sections/HeroSection';
import InterviewHighlightsSection from './sections/InterviewHighlightsSection';
import KeynoteSpeakersSection from './sections/KeynoteSpeakersSection';
import PartnersSection from './sections/PartnersSection';
import QASection from './sections/QASection';
import ReviewsSection from './sections/ReviewsSection';
import TeamSection from './sections/TeamSection';
import TechEventHubSection from './sections/TechEventHubSection';
import TimelineSection from './sections/TimelineSection';

export default function App() {
  return (
    <main className="relative min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <ScrollProgressBar />
      <BackgroundFaceParallax />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <TechEventHubSection />
      <KeynoteSpeakersSection />
      <InterviewHighlightsSection />
      <ReviewsSection />
      <PartnersSection />
      <TeamSection />
      <QASection />
      <FooterSection />
    </main>
  );
}




