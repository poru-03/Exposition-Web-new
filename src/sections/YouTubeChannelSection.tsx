import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Youtube, Clock, Sparkles, Bell } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export type YouTubeVideo = {
  id: string;
  title: string;
  views: string;
  uploadedAgo: string;
  duration: string;
  description?: string;
};

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'dQw4w9WgXcQ', // Placeholder Video ID 1
    title: 'Exposition Issue 22 Official Launch & Keynote Ceremony',
    views: '12.4K views',
    uploadedAgo: '2 weeks ago',
    duration: '14:20',
    description:
      'Highlights from the grand unveiling of Exposition Issue 22 featuring keynote remarks from leading industry leaders.',
  },
  {
    id: '3JZ_D3ELwOQ', // Placeholder Video ID 2
    title: 'Digital Transformation & Enterprise AI Panel Discussion',
    views: '8.1K views',
    uploadedAgo: '1 month ago',
    duration: '28:45',
    description:
      'Industry experts delve into enterprise cloud architectures, AI policy, and digital strategy for modern organizations.',
  },
  {
    id: 'L_LUpnjgPso', // Placeholder Video ID 3
    title: 'Future of Tech Innovation — Industrial Management Forum',
    views: '15.9K views',
    uploadedAgo: '2 months ago',
    duration: '19:10',
    description:
      'Exploration of emerging tech trends, software engineering leadership, and academic-industry collaboration.',
  },
  {
    id: 'fJ9rUzIMcZQ', // Placeholder Video ID 4
    title: 'Exposition IPN Conclave | Executive Interview Highlights',
    views: '6.7K views',
    uploadedAgo: '3 months ago',
    duration: '22:05',
    description:
      'Exclusive interviews with visionaries and CEOs sharing insights on leadership and corporate resilience.',
  },
];

export default function YouTubeChannelSection() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo>(YOUTUBE_VIDEOS[0]);

  return (
    <section
      id="youtube-channel"
      className="relative z-10 bg-[#0C0C0C] px-[5%] py-16 sm:py-24 md:py-28 overflow-hidden w-full border-t border-white/5"
    >
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#c9a25f]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#e8a33d]/5 blur-[120px] pointer-events-none z-0" />

      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10 px-[5%] max-w-5xl mx-auto relative z-10 gap-5">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Voices Of Vision
        </h2>

        {/* Channel Subscribe Banner directly below Title */}
        <a
          href="https://www.youtube.com/@ExpositionMIT"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 bg-white rounded-full px-4 sm:px-5 py-2.5 text-black shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-neutral-200 max-w-md w-full hover:scale-105 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative size-10 sm:size-11 rounded-full border-2 border-red-600 p-0.5 overflow-hidden shrink-0 bg-neutral-900 shadow-sm">
              <img
                src="/podcast-logo-v3.png"
                alt="Voices of Vision Channel Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col text-left min-w-0 leading-tight">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-neutral-900 truncate">
                Voices of Vision
              </span>
              <span className="text-[0.65rem] font-semibold text-neutral-500">
                Official YouTube Channel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-red-600 group-hover:bg-red-700 active:scale-95 transition-all text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-md shrink-0">
            <span>Subscribe</span>
            <Bell className="w-3.5 h-3.5 fill-current" />
          </div>
        </a>
      </ScrollReveal>

      {/* Main Single Column Centered Layout Container */}
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8 relative z-10 w-full">
        
        {/* ================= 1. CENTERED MAIN FEATURED VIDEO PLAYER ================= */}
        <ScrollReveal delay={0.1} className="w-full flex flex-col items-center gap-5">
          {/* Responsive 16:9 Video Player Container (Centered) */}
          <div className="relative w-full aspect-video max-w-4xl rounded-2xl overflow-hidden bg-[#121110] border border-[#c9a25f]/25 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={selectedVideo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=0&rel=0`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </AnimatePresence>
          </div>

          {/* Under-Player Title & Red Subscribe Button */}
          <div className="w-full max-w-4xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#141312] border border-white/10 backdrop-blur-md shadow-lg">
            <div className="space-y-1.5 min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug truncate">
                {selectedVideo.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-[#9A9A9A]">
                <Clock className="w-3.5 h-3.5 text-[#c9a25f]" />
                <span>{selectedVideo.uploadedAgo}</span>
              </div>
            </div>

            {/* Red Subscribe Channel CTA Button */}
            <a
              href="https://www.youtube.com/@ExpositionMIT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300 shrink-0 cursor-pointer"
            >
              <Youtube className="h-4 w-4 fill-current" />
              <span>Subscribe Channel</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </ScrollReveal>

        {/* ================= 2. HORIZONTAL SLIDER BELOW MAIN VIDEO ================= */}
        <ScrollReveal delay={0.2} className="w-full max-w-4xl flex flex-col gap-4 mt-4">
          {/* Header Tag for Playlist */}
          <div className="flex items-center justify-between px-1">
            <h4 className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#c9a25f] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c9a25f] animate-pulse" />
              MORE FROM VOICES OF VISION
            </h4>
            <span className="text-[0.65rem] font-mono text-[#9A9A9A]">SELECT TO PLAY</span>
          </div>

          {/* Horizontal Scrollable Slider Bar */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 custom-scrollbar w-full">
            {YOUTUBE_VIDEOS.map((video) => {
              const isSelected = video.id === selectedVideo.id;
              return (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`group shrink-0 w-64 sm:w-72 flex flex-col gap-2.5 p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1c1915] border-[#c9a25f] shadow-[0_10px_25px_rgba(201,162,95,0.25)] scale-[1.02]'
                      : 'bg-[#121110] border-white/10 hover:border-[#c9a25f]/50 hover:bg-[#161513]'
                  }`}
                >
                  {/* Video Thumbnail Box */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#0a0908]">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isSelected ? 'brightness-105 contrast-105' : 'opacity-80 group-hover:opacity-100'
                      }`}
                    />

                    {/* Playing indicator or duration overlay */}
                    {isSelected ? (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="text-xs font-mono font-bold uppercase text-[#c9a25f] tracking-widest flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 animate-spin" /> PLAYING NOW
                        </span>
                      </div>
                    ) : (
                      <div className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-[0.65rem] font-mono px-2 py-0.5 rounded-md border border-white/10">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Video Title & Date */}
                  <div className="flex flex-col space-y-1 min-w-0">
                    <h5
                      className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug transition-colors ${
                        isSelected ? 'text-[#e8c896]' : 'text-white group-hover:text-[#e8c896]'
                      }`}
                    >
                      {video.title}
                    </h5>
                    <span className="text-[0.65rem] font-mono text-[#9A9A9A]">
                      {video.uploadedAgo}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ================= 3. VIEW ALL BUTTON BELOW THE SLIDER ================= */}
          <div className="pt-2 flex justify-center">
            <a
              href="https://www.youtube.com/@ExpositionMIT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 py-3 px-8 rounded-full border border-[#c9a25f]/50 bg-gradient-to-r from-[#1c1915] via-[#241e17] to-[#1c1915] text-xs font-mono font-bold uppercase tracking-widest text-[#e8c896] hover:text-white hover:border-[#c9a25f] hover:shadow-[0_0_25px_rgba(201,162,95,0.3)] transition-all duration-300 cursor-pointer active:scale-95"
            >
              <span>View All Videos on YouTube</span>
              <ExternalLink className="w-4 h-4 text-[#c9a25f]" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
