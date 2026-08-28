import { useEffect, useState } from 'react';
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
import Elite10Page from './pages/Elite10Page';
import MagazineReaderPage from './pages/MagazineReaderPage';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    if (currentPath === '/elite-10' || currentPath.startsWith('/magazine-reader')) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: false,
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
  }, [currentPath]);

  if (currentPath === '/elite-10') {
    return <Elite10Page />;
  }

  if (currentPath.startsWith('/magazine-reader')) {
    return <MagazineReaderPage />;
  }

  return (
    <main className="relative min-h-screen bg-[#0C0C0C] w-full" style={{ overflowX: 'clip' }}>
      <ScrollProgressBar />
      <Navbar />
      <BackgroundFaceParallax />

      {/* Foreground Content Stack */}
      <div className="relative z-10 w-full bg-[#0C0C0C]">
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
      </div>

      {/* Background Sticky Reveal Footer */}
      <div className="sticky bottom-0 z-0 w-full bg-black">
        <FooterSection />
      </div>
    </main>
  );
}




