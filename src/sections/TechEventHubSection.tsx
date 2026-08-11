import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Sparkles,
  Trophy,
  ChevronRight,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import {
  FaXTwitter,
  FaDiscord,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';
import FadeIn from '../components/FadeIn';

export type TechEvent = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  university: string;
  category: string;
  regStartDate: string;
  regCloseDate: string;
  duration: string;
  venue: string;
  prizePool: string;
  teamSize: string;
  status: 'Registration Open' | 'Upcoming' | 'Closing Soon' | 'Featured';
  statusColor: string;
  officialWebsite: string;
  coverImage: string;
  description: string;
  tags: string[];
  socials: {
    twitter?: string;
    discord?: string;
    github?: string;
    linkedin?: string;
    youtube?: string;
  };
};

export const TECH_EVENTS: TechEvent[] = [
  {
    id: 'event-1',
    number: '01',
    title: 'Global AI & 3D Synthesis Hackathon 2026',
    tagline: 'Pioneering Next-Gen Generative 3D, Spatial Agents & CGI Intelligence',
    university: 'Stanford University Tech Guild & AI Lab',
    category: 'AI & 3D Spatial Computing',
    regStartDate: 'August 15, 2026',
    regCloseDate: 'September 10, 2026',
    duration: '48 Hours Non-Stop Live Hackathon',
    venue: 'Huang Engineering Quad & Global Metaverse Hub',
    prizePool: '$65,000 + Silicon Valley Venture Fast-Track',
    teamSize: '2 - 4 Members',
    status: 'Registration Open',
    statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    officialWebsite: 'https://stanford.edu/events/ai-3d-hackathon-2026',
    coverImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    description:
      'Join top university researchers, 3D artists, and AI engineers in building groundbreaking spatial algorithms, neural radiance models, and interactive web experiences with mentorship from industry leaders.',
    tags: ['Generative AI', '3D Vision', 'WebGL', 'Neural Renders'],
    socials: {
      twitter: 'https://twitter.com',
      discord: 'https://discord.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com',
    },
  },
  {
    id: 'event-2',
    number: '02',
    title: 'NextGen Robotics & Autonomous Systems Summit',
    tagline: 'Bridging Physical Intelligence, Kinematics & Robotics Simulation',
    university: 'MIT Media Lab & Robotics Society',
    category: 'Robotics & Automation',
    regStartDate: 'September 01, 2026',
    regCloseDate: 'September 25, 2026',
    duration: '3 Days Comprehensive Expo & Challenge',
    venue: 'MIT Kresge Auditorium, Cambridge MA',
    prizePool: '$45,000 Hardware Research Grants',
    teamSize: '1 - 4 Members',
    status: 'Closing Soon',
    statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    officialWebsite: 'https://mit.edu/robotics-summit-2026',
    coverImage:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
    description:
      'Explore cutting-edge physical AI, human-robot collaboration, and high-fidelity 3D simulation physics. Features live hardware demos, keynote panels, and international venture matchmaking.',
    tags: ['Robotics', 'ROS 2', 'Simulation Physics', 'Automation'],
    socials: {
      twitter: 'https://twitter.com',
      discord: 'https://discord.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'event-3',
    number: '03',
    title: 'CyberSpatial 3D & Metaverse Design Conclave',
    tagline: 'Shaping Interactive Web3D Architecture & Spatial UX Frontiers',
    university: 'ETH Zurich Computing & Interactive Architecture',
    category: 'Spatial Design & Web3D',
    regStartDate: 'September 12, 2026',
    regCloseDate: 'October 05, 2026',
    duration: '36 Hours Intensive Design Sprint',
    venue: 'ETH Zurich Main Campus & WebGL Stream',
    prizePool: '$35,000 Design Fellowships & Grants',
    teamSize: '2 - 3 Members',
    status: 'Featured',
    statusColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    officialWebsite: 'https://ethz.ch/cyberspatial-2026',
    coverImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    description:
      'A global convergence of creative technologists and digital architects competing to design photorealistic real-time virtual spaces, shader systems, and brand immersive environments.',
    tags: ['Spline 3D', 'Three.js', 'Shader Art', 'Spatial Audio'],
    socials: {
      twitter: 'https://twitter.com',
      discord: 'https://discord.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'event-4',
    number: '04',
    title: 'Quantum Computing & Cryptographic Challenge',
    tagline: 'Solving Tomorrow’s Post-Quantum Algorithms & Security Frontiers',
    university: 'Cambridge University Quantum Computing Society',
    category: 'Quantum Tech & Security',
    regStartDate: 'October 01, 2026',
    regCloseDate: 'October 20, 2026',
    duration: '4 Days International Challenge',
    venue: 'Cavendish Laboratory, Cambridge UK',
    prizePool: '$50,000 Research Grants & Fellowships',
    teamSize: 'Individual / Team of 2',
    status: 'Upcoming',
    statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    officialWebsite: 'https://cam.ac.uk/quantum-challenge-2026',
    coverImage:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop',
    description:
      'Test your mathematical problem solving and algorithmic reasoning against quantum circuit design problems, QKD protocols, and lattice-based cryptography puzzles.',
    tags: ['Qiskit', 'Quantum Circuits', 'Zero-Knowledge', 'Cryptography'],
    socials: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'event-5',
    number: '05',
    title: 'Interactive XR & Game Innovation Fest',
    tagline: 'Building the Future of Real-Time Game Mechanics & Virtual Storytelling',
    university: 'Carnegie Mellon Entertainment Technology Center',
    category: 'XR & Interactive Gaming',
    regStartDate: 'October 15, 2026',
    regCloseDate: 'November 08, 2026',
    duration: '72 Hours Global Game Jam',
    venue: 'ETC Pittsburgh Campus & Steam Livestream',
    prizePool: '$30,000 Publisher Backing & Steam Showcase',
    teamSize: '1 - 5 Members',
    status: 'Upcoming',
    statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    officialWebsite: 'https://etc.cmu.edu/xr-gamefest-2026',
    coverImage:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    description:
      'Create immersive gameplay experiences, stylized 3D art pipelines, and novel player interactions using Unreal Engine 5, Unity, and custom WebGL engines.',
    tags: ['Unreal Engine 5', 'XR Gameplay', '3D Animation', 'Game Audio'],
    socials: {
      twitter: 'https://twitter.com',
      discord: 'https://discord.com',
      youtube: 'https://youtube.com',
    },
  },
];

export default function TechEventHubSection() {
  const [selectedEvent, setSelectedEvent] = useState<TechEvent>(TECH_EVENTS[0]);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(selectedEvent.officialWebsite);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="techevent-hub"
      className="relative z-10 min-h-screen bg-transparent px-[5%] py-24 md:py-32"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
        <FadeIn
          as="span"
          delay={0}
          y={20}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-[#161616]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7E2EA]/80 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#D7E2EA]" />
          University & Innovation Network
        </FadeIn>
        <FadeIn
          as="h2"
          delay={0.1}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[#D7E2EA]"
          style={{ fontSize: 'clamp(2.2rem, 6.5vw, 84px)' }}
        >
          TechEvent Hub
        </FadeIn>
        <FadeIn
          as="p"
          delay={0.2}
          y={20}
          className="mt-6 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-[#D7E2EA]/70 font-light"
        >
          Discover premier hackathons, academic symposiums, and spatial computing conclaves.
          Explore live registration schedules, official portals, and upcoming events.
        </FadeIn>
      </div>

      {/* Split Screen Container: Left (Event Details Screen) | Right (Upcoming Events Selector) */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ================= LEFT SIDE SCREEN: Dynamic Active Event Console ================= */}
          <div className="lg:col-span-7 sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-[32px] border border-[#D7E2EA]/20 bg-[#141414]/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
              >
                {/* Event Hero Cover Image */}
                <div className="relative h-56 sm:h-72 w-full overflow-hidden">
                  <img
                    src={selectedEvent.coverImage}
                    alt={selectedEvent.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />

                  {/* Badges on Cover */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md ${selectedEvent.statusColor}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      {selectedEvent.status}
                    </span>

                    <button
                      onClick={handleShare}
                      className="rounded-full bg-[#141414]/80 p-2 text-[#D7E2EA] border border-white/15 backdrop-blur-md transition-colors hover:bg-white hover:text-black"
                      title="Share / Copy Link"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* University Label on Image Bottom */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/80 bg-[#0C0C0C]/80 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md">
                      {selectedEvent.university}
                    </span>
                  </div>
                </div>

                {/* Event Core Details Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#D7E2EA] leading-tight">
                      {selectedEvent.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm font-medium text-[#D7E2EA]/60 leading-relaxed">
                      {selectedEvent.tagline}
                    </p>
                  </div>

                  {/* Meta Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {/* Registration Start */}
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#181818]/90 p-3.5">
                      <div className="p-2 rounded-xl bg-white/5 text-[#D7E2EA] shrink-0">
                        <Calendar className="h-4 w-4 text-indigo-300" />
                      </div>
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#D7E2EA]/50 block">
                          Registration Start
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#D7E2EA]">
                          {selectedEvent.regStartDate}
                        </span>
                      </div>
                    </div>

                    {/* Registration Closing */}
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#181818]/90 p-3.5">
                      <div className="p-2 rounded-xl bg-white/5 text-[#D7E2EA] shrink-0">
                        <Clock className="h-4 w-4 text-amber-300" />
                      </div>
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#D7E2EA]/50 block">
                          Closing Date
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#D7E2EA]">
                          {selectedEvent.regCloseDate}
                        </span>
                      </div>
                    </div>

                    {/* Event Duration */}
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#181818]/90 p-3.5">
                      <div className="p-2 rounded-xl bg-white/5 text-[#D7E2EA] shrink-0">
                        <Sparkles className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#D7E2EA]/50 block">
                          Event Duration
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#D7E2EA]">
                          {selectedEvent.duration}
                        </span>
                      </div>
                    </div>

                    {/* Prize Pool / Rewards */}
                    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#181818]/90 p-3.5">
                      <div className="p-2 rounded-xl bg-white/5 text-[#D7E2EA] shrink-0">
                        <Trophy className="h-4 w-4 text-emerald-300" />
                      </div>
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#D7E2EA]/50 block">
                          Prize Pool & Grants
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#D7E2EA]">
                          {selectedEvent.prizePool}
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="sm:col-span-2 flex items-start gap-3 rounded-2xl border border-white/10 bg-[#181818]/90 p-3.5">
                      <div className="p-2 rounded-xl bg-white/5 text-[#D7E2EA] shrink-0">
                        <MapPin className="h-4 w-4 text-rose-300" />
                      </div>
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#D7E2EA]/50 block">
                          Venue & Location
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#D7E2EA]">
                          {selectedEvent.venue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-[#D7E2EA]/75 font-light">
                    {selectedEvent.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedEvent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-[#222222] px-2.5 py-1 text-[0.7rem] font-medium text-[#D7E2EA]/70 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Socials & Official Website Action Bar */}
                  <div className="pt-4 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Social Media Links */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[#D7E2EA]/50 shrink-0">
                        Community:
                      </span>
                      <div className="flex items-center gap-2">
                        {selectedEvent.socials.twitter && (
                          <a
                            href={selectedEvent.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-white/10 bg-[#1a1a1a] p-2.5 text-[#D7E2EA]/80 hover:text-white hover:border-white/40 hover:bg-black transition-all"
                            title="Twitter / X"
                          >
                            <FaXTwitter className="h-3.5 w-3.5 text-white" />
                          </a>
                        )}
                        {selectedEvent.socials.linkedin && (
                          <a
                            href={selectedEvent.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-300 hover:text-white hover:border-sky-500 hover:bg-sky-600 transition-all"
                            title="LinkedIn"
                          >
                            <FaLinkedinIn className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {selectedEvent.socials.youtube && (
                          <a
                            href={selectedEvent.socials.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-red-300 hover:text-white hover:border-red-500 hover:bg-red-600 transition-all"
                            title="YouTube"
                          >
                            <FaYoutube className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {selectedEvent.socials.discord && (
                          <a
                            href={selectedEvent.socials.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-2.5 text-indigo-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-600 transition-all"
                            title="Discord Community"
                          >
                            <FaDiscord className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {selectedEvent.socials.github && (
                          <a
                            href={selectedEvent.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-white/10 bg-[#1a1a1a] p-2.5 text-[#D7E2EA]/80 hover:text-white hover:border-white/40 hover:bg-[#333] transition-all"
                            title="GitHub Repo"
                          >
                            <FaGithub className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Official Website Link CTA */}
                    <a
                      href={selectedEvent.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#D7E2EA] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0C0C0C] transition-all duration-200 hover:bg-white hover:shadow-[0_0_25px_rgba(215,226,234,0.4)]"
                    >
                      <span>Official Website</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ================= RIGHT SIDE SCREEN: Next Coming Event List ================= */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D7E2EA]/60 font-semibold">
                Upcoming Event Schedule ({TECH_EVENTS.length})
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#D7E2EA]/40">
                Click to preview details
              </span>
            </div>

            <div className="flex flex-col gap-3.5">
              {TECH_EVENTS.map((event, index) => {
                const isSelected = selectedEvent.id === event.id;
                return (
                  <FadeIn key={event.id} delay={index * 0.08} y={20}>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className={`group relative w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 backdrop-blur-xl ${
                        isSelected
                          ? 'border-[#D7E2EA]/60 bg-[#1c1c1c] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                          : 'border-white/10 bg-[#121212]/80 hover:border-white/25 hover:bg-[#181818]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Number Badge + Title */}
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          <div
                            className={`rounded-xl size-8 sm:size-9 shrink-0 font-black text-xs flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-white text-black shadow-md'
                                : 'bg-[#222222] text-[#D7E2EA]/70 border border-white/10 group-hover:bg-[#2c2c2c]'
                            }`}
                          >
                            {event.number}
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="text-[0.65rem] font-mono uppercase tracking-wider text-[#D7E2EA]/50 block truncate">
                              {event.university}
                            </span>
                            <h4
                              className={`text-sm sm:text-base font-bold uppercase leading-snug tracking-tight transition-colors line-clamp-2 ${
                                isSelected ? 'text-white' : 'text-[#D7E2EA]/90 group-hover:text-white'
                              }`}
                            >
                              {event.title}
                            </h4>
                          </div>
                        </div>

                        {/* Arrow Trigger */}
                        <div
                          className={`rounded-full p-1.5 transition-transform shrink-0 ${
                            isSelected
                              ? 'bg-white text-black rotate-90 sm:rotate-0'
                              : 'text-[#D7E2EA]/40 group-hover:text-white group-hover:translate-x-1'
                          }`}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Event Mini Meta Footer */}
                      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[0.7rem] text-[#D7E2EA]/60">
                          <Clock className="h-3 w-3 text-indigo-400" />
                          <span>{event.duration}</span>
                        </div>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider border ${event.statusColor}`}
                        >
                          {event.status}
                        </span>
                      </div>
                    </button>
                  </FadeIn>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
