import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, Bell, Eye, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { ShinyButton } from '../components/ui/shiny-button';
import {
  fetchLatestYouTubeVideos,
  STATIC_YOUTUBE_VIDEOS,
  type YouTubeVideo,
} from '../services/youtube';

export default function YouTubeChannelSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>(STATIC_YOUTUBE_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo>(STATIC_YOUTUBE_VIDEOS[0]);

  useEffect(() => {
    let isMounted = true;
    async function loadVideos() {
      try {
        const data = await fetchLatestYouTubeVideos();
        if (isMounted && data.length > 0) {
          setVideos(data);
          setSelectedVideo(data[0]);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    }

    loadVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="voices-of-vision"
      className="relative z-10 bg-[#0C0C0C] px-[5%] py-16 sm:py-24 md:py-28 overflow-hidden w-full border-t border-white/5"
    >
      {/* Anchor for backward compatibility with #youtube-channel */}
      <div id="youtube-channel" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#c9a25f]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#e8a33d]/5 blur-[120px] pointer-events-none z-0" />

      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12 px-[5%] max-w-5xl mx-auto relative z-10">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Voices Of Vision
        </h2>
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

          {/* Under-Player Title & Channel/Stats Bar */}
          <div className="w-full max-w-4xl flex flex-col gap-4 p-5 sm:p-6 rounded-2xl bg-[#141312] border border-white/10 backdrop-blur-md shadow-lg">
            {/* Video Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
              {selectedVideo.title}
            </h3>

            {/* Channel Info & Actions Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-t border-white/5">
              {/* Channel Logo & Meta */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.youtube.com/@ExpositionMIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative size-10 sm:size-11 rounded-full overflow-hidden shrink-0 border border-white/15 hover:opacity-90 transition-opacity"
                >
                  <img
                    src="/podcast-logo-v3.png"
                    alt="Exposition Magazine"
                    className="w-full h-full object-cover"
                  />
                </a>
                <div className="flex flex-col text-left leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">Exposition Magazine</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#AAAAAA] fill-[#AAAAAA]/20" />
                  </div>
                  {/* YouTube Native Under-Player Metadata */}
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#AAAAAA] font-normal mt-1">
                    <span className="flex items-center gap-1 text-white/90">
                      <Eye className="w-3.5 h-3.5 text-[#E8C896]" />
                      {selectedVideo.views}
                    </span>
                    <span className="text-[9px] text-[#717171]">•</span>
                    <span className="flex items-center gap-1 text-neutral-300">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {selectedVideo.uploadedAgo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Red Subscribe CTA Button with Bell Icon */}
              <a
                href="https://www.youtube.com/@ExpositionMIT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300 shrink-0 cursor-pointer self-start sm:self-auto"
              >
                <span>Subscribe</span>
                <Bell className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* ================= 2. YOUTUBE-STYLE HORIZONTAL SLIDER ================= */}
        <ScrollReveal delay={0.2} className="w-full max-w-4xl flex flex-col gap-4 mt-2">
          {/* Header */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/90">
              Latest Episodes & Interviews
            </span>
            <span className="text-xs text-[#9A9A9A]">
              {videos.length} videos available
            </span>
          </div>

          {/* Horizontal Scrollable Slider Bar */}
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 custom-scrollbar w-full">
            {videos.map((video) => {
              const isSelected = video.id === selectedVideo.id;
              const thumbnail =
                video.thumbnailUrl || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

              return (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`group shrink-0 w-72 sm:w-80 flex flex-col gap-3 p-3 rounded-2xl text-left transition-all duration-300 cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#1a1714] border-2 border-[#E8C896] shadow-[0_12px_30px_rgba(232,200,150,0.2)] scale-[1.02]'
                      : 'bg-[#121110] border border-white/10 hover:border-[#E8C896]/50 hover:bg-[#161513]'
                  }`}
                >
                  {/* Video Thumbnail Box - Clean YouTube Preview */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                    <img
                      src={thumbnail}
                      alt={video.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                        isSelected ? 'brightness-105' : 'opacity-90 group-hover:opacity-100'
                      }`}
                    />

                    {/* YouTube Duration Pill in Bottom Right */}
                    <div className="absolute bottom-1.5 right-1.5 bg-black/85 text-white text-[11px] font-medium px-1.5 py-0.5 rounded backdrop-blur-[2px] tracking-tight border border-white/10">
                      {video.duration}
                    </div>
                  </div>

                  {/* YouTube Card Body (Avatar + Title + Channel Info + Views) */}
                  <div className="flex gap-2.5 items-start min-w-0 px-0.5 pb-0.5">
                    {/* Round Channel Avatar */}
                    <div className="size-8 rounded-full overflow-hidden shrink-0 border border-white/15 bg-neutral-900 mt-0.5">
                      <img
                        src="/podcast-logo-v3.png"
                        alt="Channel"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Video Info Column */}
                    <div className="flex flex-col space-y-1 min-w-0 flex-1">
                      {/* 2-Line Video Title */}
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold line-clamp-2 leading-snug transition-colors ${
                          isSelected ? 'text-[#E8C896]' : 'text-white group-hover:text-[#E8C896]'
                        }`}
                        title={video.title}
                      >
                        {video.title}
                      </h4>

                      {/* Channel Name with Checkmark */}
                      <div className="flex items-center gap-1 text-[11px] text-[#AAAAAA] leading-none">
                        <span className="truncate">Exposition Magazine</span>
                        <CheckCircle2 className="size-3 text-[#AAAAAA] shrink-0 fill-[#AAAAAA]/20" />
                      </div>

                      {/* Metadata Row: Views • Time Ago (Native Sans-Serif Body Font) */}
                      <div className="flex items-center gap-1.5 text-[12px] text-[#AAAAAA] font-normal leading-tight pt-0.5">
                        <span>{video.views}</span>
                        <span className="text-[9px] text-[#717171]">•</span>
                        <span>{video.uploadedAgo}</span>
                      </div>
                    </div>
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
              className="inline-block"
            >
              <ShinyButton className="font-poppins text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap">
                <span className="whitespace-nowrap">View All Videos on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-current shrink-0" />
              </ShinyButton>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
