import AboutSection from './sections/AboutSection';
import HeroSection from './sections/HeroSection';
import KeynoteSpeakersSection from './sections/KeynoteSpeakersSection';
import MarqueeSection from './sections/MarqueeSection';
import ProjectsSection from './sections/ProjectsSection';
import ReviewsSection from './sections/ReviewsSection';
import ServicesSection from './sections/ServicesSection';
import TechEventHubSection from './sections/TechEventHubSection';
import TimelineSection from './sections/TimelineSection';

export default function App() {
  return (
    <main className="min-h-screen bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <TechEventHubSection />
      <KeynoteSpeakersSection />
      <ReviewsSection />
      <MarqueeSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}




