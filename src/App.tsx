import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import BackgroundFaceParallax from './components/BackgroundFaceParallax';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
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

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0C0C0C] w-full" style={{ overflowX: 'clip' }}>
      <ScrollProgressBar />
      <Navbar />
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




