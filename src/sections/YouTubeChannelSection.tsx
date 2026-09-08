import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Youtube, Clock, Sparkles } from 'lucide-react';
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
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10 px-[5%] max-w-5xl mx-auto relative z-10">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Voices Of Vision
        </h2>
      </ScrollReveal>

      {/* Main Two-Column Layout Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* ================= LEFT SIDE: MAIN FEATURED VIDEO PLAYER (lg:col-span-8) ================= */}
        <ScrollReveal delay={0.1} className="lg:col-span-8 flex flex-col space-y-5">
          {/* Responsive 16:9 Video Player Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#121110] border border-[#c9a25f]/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
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

          {/* Under-Player Metadata & Channel Subscribe Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#141312] border border-white/10 backdrop-blur-md shadow-lg">
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                {selectedVideo.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-[#9A9A9A]">
                <Clock className="w-3.5 h-3.5 text-[#c9a25f]" />
                <span>{selectedVideo.uploadedAgo}</span>
              </div>
            </div>

            {/* Subscribe on YouTube CTA Button */}
            <a
              href="https://www.youtube.com/@ExpositionMIT"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a25f]/60 bg-gradient-to-r from-[#c9a25f]/20 via-[#b8894f]/20 to-[#966d35]/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#e8c896] hover:text-white hover:border-[#c9a25f] hover:from-[#c9a25f] hover:to-[#b8894f] shadow-lg transition-all duration-300 shrink-0 active:scale-95"
            >
              <Youtube className="h-4 w-4" />
              <span>Subscribe Channel</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </ScrollReveal>

        {/* ================= RIGHT SIDE: "NEXT UP" SIDEBAR LIST (lg:col-span-4) ================= */}
        <ScrollReveal delay={0.2} className="lg:col-span-4 flex flex-col space-y-4">
          {/* Header Tag for Playlist */}
          <div className="flex items-center justify-between px-1">
            <h4 className="font-mono text-xs font-black uppercase tracking-[0.2em] text-[#c9a25f] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c9a25f] animate-pulse" />
              NEXT UP IN PLAYLIST
            </h4>
            <span className="text-[0.65rem] font-mono text-[#9A9A9A]">SELECT TO PLAY</span>
          </div>

          {/* Vertical Scrollable Playlist */}
          <div className="flex flex-col space-y-3 max-h-[520px] overflow-y-auto pr-1 custom-scrollbar">
            {YOUTUBE_VIDEOS.map((video) => {
              const isSelected = video.id === selectedVideo.id;
              return (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`group w-full flex items-start gap-3.5 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1815] border-[#c9a25f] shadow-[0_5px_20px_rgba(201,162,95,0.2)]'
                      : 'bg-[#121110] border-white/10 hover:border-[#c9a25f]/50 hover:bg-[#161513]'
                  }`}
                >
                  {/* Video Thumbnail Box */}
                  <div className="relative w-32 aspect-video rounded-lg overflow-hidden shrink-0 border border-white/10 bg-[#0a0908]">
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
                        <span className="text-[0.6rem] font-mono font-bold uppercase text-[#c9a25f] tracking-widest flex items-center gap-1">
                          <Sparkles className="w-3 h-3 animate-spin" /> PLAYING
                        </span>
                      </div>
                    ) : (
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[0.65rem] font-mono px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Video Metadata Info */}
                  <div className="flex flex-col space-y-1 min-w-0 flex-1">
                    <h5
                      className={`text-xs font-bold line-clamp-2 leading-tight transition-colors ${
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

          {/* Bottom Channel Link CTA */}
          <div className="pt-2">
            <a
              href="https://www.youtube.com/@ExpositionMIT"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-[#121110] text-xs font-mono font-semibold text-[#9A9A9A] hover:text-[#c9a25f] hover:border-[#c9a25f]/40 hover:bg-[#161514] transition-all duration-300"
            >
              <span>View all videos on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
