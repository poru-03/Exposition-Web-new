import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
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
import ScrollReveal from '../components/ScrollReveal';
import { StaggerContainer, StaggerCard } from '../components/StaggerReveal';
import TiltCard3D from '../components/TiltCard3D';

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
    statusColor: 'bg-[#B8894F]/10 text-[#E8C896] border-[#B8894F]/40',
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
    statusColor: 'bg-[#B8894F]/15 text-[#E8C896] border-[#B8894F]/50',
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
    statusColor: 'bg-[#B8894F]/10 text-[#E8C896] border-[#B8894F]/40',
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
    statusColor: 'bg-white/5 text-[#9A9A9A] border-white/15',
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
    statusColor: 'bg-white/5 text-[#9A9A9A] border-white/15',
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
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(selectedEvent.officialWebsite);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="techevent-hub"
      className="relative z-10 min-h-screen lg:h-screen w-full flex flex-col justify-center bg-transparent px-[4%] sm:px-[5%] py-4 sm:py-6 lg:py-6 overflow-hidden"
    >
      {/* Subtle Section Glow Pulse */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            opacity: glowOpacity,
            background: 'radial-gradient(circle at 50% 30%, rgba(184, 137, 79, 0.12), transparent 65%)',
          }}
        />
      )}

      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-3 sm:mb-4 lg:mb-5">
        <span className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-[#B8894F]/30 bg-[#161616]/70 px-3.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[#E8C896] backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-[#E8C896]" />
          University & Innovation Network
        </span>
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          TechEvent Hub
        </h2>
        <p className="mt-1 max-w-2xl text-center text-xs sm:text-sm leading-snug text-[#9A9A9A] font-light">
          Discover premier hackathons, academic symposiums, and spatial computing conclaves.
        </p>
      </ScrollReveal>

      {/* Split Screen Container: Left (Event Details Screen) | Right (Upcoming Events Selector) */}
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">

          {/* ================= LEFT SIDE SCREEN: Dynamic Active Event Console ================= */}
          <ScrollReveal y={16} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/15 bg-[#141414]/95 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl max-h-[calc(100vh-160px)] flex flex-col"
              >
                {/* Event Hero Cover Image */}
                <div className="relative h-28 sm:h-36 lg:h-40 w-full shrink-0 overflow-hidden">
                  <img
                    src={selectedEvent.coverImage}
                    alt={selectedEvent.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />

                  {/* Badges on Cover */}
                  <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider backdrop-blur-md ${selectedEvent.statusColor}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                      {selectedEvent.status}
                    </span>

                    <button
                      onClick={handleShare}
                      className="rounded-full bg-[#141414]/80 p-1.5 text-[#E8C896] border border-white/15 backdrop-blur-md transition-colors hover:bg-white hover:text-black cursor-pointer"
                      title="Share / Copy Link"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Share2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  {/* University Label on Image Bottom */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[0.65rem] font-mono uppercase tracking-widest text-[#9A9A9A] bg-[#0C0C0C]/80 px-2.5 py-0.5 rounded-md border border-white/10 backdrop-blur-md">
                      {selectedEvent.university}
                    </span>
                  </div>
                </div>

                {/* Event Core Details Body (Scrollable if needed on small screens) */}
                <div className="p-4 sm:p-5 space-y-3 overflow-y-auto custom-scrollbar flex-1">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-tight">
                      {selectedEvent.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[#9A9A9A] leading-snug">
                      {selectedEvent.tagline}
                    </p>
                  </div>

                  {/* Meta Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {/* Registration Start */}
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#181818]/90 p-2.5">
                      <div className="p-1.5 rounded-lg bg-white/5 text-[#E8C896] shrink-0">
                        <Calendar className="h-3.5 w-3.5 text-[#E8C896]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#9A9A9A] block">
                          Registration Start
                        </span>
                        <span className="text-xs font-semibold text-white truncate block">
                          {selectedEvent.regStartDate}
                        </span>
                      </div>
                    </div>

                    {/* Registration Closing */}
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#181818]/90 p-2.5">
                      <div className="p-1.5 rounded-lg bg-white/5 text-[#B8894F] shrink-0">
                        <Clock className="h-3.5 w-3.5 text-[#B8894F]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#9A9A9A] block">
                          Closing Date
                        </span>
                        <span className="text-xs font-semibold text-white truncate block">
                          {selectedEvent.regCloseDate}
                        </span>
                      </div>
                    </div>

                    {/* Event Duration */}
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#181818]/90 p-2.5">
                      <div className="p-1.5 rounded-lg bg-white/5 text-[#E8C896] shrink-0">
                        <Sparkles className="h-3.5 w-3.5 text-[#E8C896]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#9A9A9A] block">
                          Duration
                        </span>
                        <span className="text-xs font-semibold text-white truncate block">
                          {selectedEvent.duration}
                        </span>
                      </div>
                    </div>

                    {/* Prize Pool / Rewards */}
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#181818]/90 p-2.5">
                      <div className="p-1.5 rounded-lg bg-white/5 text-[#E8C896] shrink-0">
                        <Trophy className="h-3.5 w-3.5 text-[#E8C896]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#9A9A9A] block">
                          Prize Pool & Grants
                        </span>
                        <span className="text-xs font-semibold text-white truncate block">
                          {selectedEvent.prizePool}
                        </span>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="sm:col-span-2 flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#181818]/90 p-2.5">
                      <div className="p-1.5 rounded-lg bg-white/5 text-[#E8C896] shrink-0">
                        <MapPin className="h-3.5 w-3.5 text-[#E8C896]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#9A9A9A] block">
                          Venue & Location
                        </span>
                        <span className="text-xs font-semibold text-white truncate block">
                          {selectedEvent.venue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-[#9A9A9A] font-light line-clamp-2 sm:line-clamp-3">
                    {selectedEvent.description}
                  </p>

                  {/* Socials & Official Website Action Bar */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    {/* Social Media Links */}
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#9A9A9A] shrink-0">
                        Community:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {selectedEvent.socials.twitter && (
                          <a
                            href={selectedEvent.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/10 bg-[#1a1a1a] p-2 text-[#9A9A9A] hover:text-white hover:border-[#B8894F]/40 hover:bg-black transition-all"
                            title="Twitter / X"
                          >
                            <FaXTwitter className="h-3 w-3 text-white" />
                          </a>
                        )}
                        {selectedEvent.socials.linkedin && (
                          <a
                            href={selectedEvent.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/10 bg-[#1a1a1a] p-2 text-[#9A9A9A] hover:text-white hover:border-[#B8894F]/40 hover:bg-black transition-all"
                            title="LinkedIn"
                          >
                            <FaLinkedinIn className="h-3 w-3" />
                          </a>
                        )}
                        {selectedEvent.socials.youtube && (
                          <a
                            href={selectedEvent.socials.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/10 bg-[#1a1a1a] p-2 text-[#9A9A9A] hover:text-white hover:border-[#B8894F]/40 hover:bg-black transition-all"
                            title="YouTube"
                          >
                            <FaYoutube className="h-3 w-3" />
                          </a>
                        )}
                        {selectedEvent.socials.discord && (
                          <a
                            href={selectedEvent.socials.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/10 bg-[#1a1a1a] p-2 text-[#9A9A9A] hover:text-white hover:border-[#B8894F]/40 hover:bg-black transition-all"
                            title="Discord Community"
                          >
                            <FaDiscord className="h-3 w-3" />
                          </a>
                        )}
                        {selectedEvent.socials.github && (
                          <a
                            href={selectedEvent.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/10 bg-[#1a1a1a] p-2 text-[#9A9A9A] hover:text-white hover:border-[#B8894F]/40 hover:bg-black transition-all"
                            title="GitHub Repo"
                          >
                            <FaGithub className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Official Website Link CTA (Gold Gradient Pill CTA) */}
                    <a
                      href={selectedEvent.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#B8894F] to-[#E8C896] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#0C0C0C] shadow-[0_0_20px_rgba(184,137,79,0.3)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_30px_rgba(184,137,79,0.5)] shrink-0 cursor-pointer"
                    >
                      <span>Official Website</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>

          {/* ================= RIGHT SIDE SCREEN: Next Coming Event List ================= */}
          <div className="lg:col-span-5 flex flex-col max-h-[calc(100vh-160px)]">
            <ScrollReveal delay={0.1} className="flex items-center justify-between pb-2 shrink-0">
              <span className="text-[0.7rem] font-mono uppercase tracking-widest text-[#9A9A9A] font-semibold">
                Upcoming Event Schedule ({TECH_EVENTS.length})
              </span>
              <span className="text-[0.6rem] font-bold uppercase tracking-wider text-[#9A9A9A]/60">
                Click to preview
              </span>
            </ScrollReveal>

            <StaggerContainer
              staggerChildren={0.06}
              className="flex flex-col gap-2.5 overflow-y-auto pr-1.5 custom-scrollbar flex-1"
            >
              {TECH_EVENTS.map((event) => {
                const isSelected = selectedEvent.id === event.id;
                return (
                  <StaggerCard key={event.id}>
                    <TiltCard3D maxTilt={6} depth={8} scaleOnHover={1.01}>
                      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className={`group relative w-full text-left rounded-2xl border p-3 sm:p-3.5 transition-all duration-300 backdrop-blur-xl cursor-pointer ${isSelected
                            ? 'border-[#B8894F]/60 bg-[#1c1c1c] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
                            : 'border-white/10 bg-[#121212]/80 hover:border-[#B8894F]/30 hover:bg-[#181818]'
                            }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            {/* Number Badge + Title */}
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div
                                className={`rounded-xl size-7 sm:size-8 shrink-0 font-black text-xs flex items-center justify-center transition-colors ${isSelected
                                  ? 'bg-gradient-to-br from-[#B8894F] to-[#E8C896] text-[#0C0C0C] shadow-md'
                                  : 'bg-[#222222] text-silver-gradient border border-white/10 group-hover:bg-[#2c2c2c]'
                                  }`}
                              >
                                {event.number}
                              </div>

                              <div className="flex-1 min-w-0">
                                <span className="text-[0.6rem] font-mono uppercase tracking-wider text-[#9A9A9A] block truncate">
                                  {event.university}
                                </span>
                                <h4
                                  className={`text-xs sm:text-sm font-bold uppercase leading-snug tracking-tight transition-colors line-clamp-1 ${isSelected ? 'text-white' : 'text-white/85 group-hover:text-white'
                                    }`}
                                >
                                  {event.title}
                                </h4>
                              </div>
                            </div>

                            {/* Arrow Trigger */}
                            <div
                              className={`rounded-full p-1 transition-transform shrink-0 ${isSelected
                                ? 'bg-white text-black rotate-90 sm:rotate-0'
                                : 'text-[#9A9A9A] group-hover:text-white group-hover:translate-x-1'
                                }`}
                            >
                              <ChevronRight className="h-3.5 w-3.5" />
                            </div>
                          </div>

                          {/* Event Mini Meta Footer */}
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                            <div className="flex items-center gap-1.5 text-[0.65rem] text-[#9A9A9A]">
                              <Clock className="h-2.5 w-2.5 text-[#B8894F]" />
                              <span>{event.duration}</span>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    </TiltCard3D>
                  </StaggerCard>
                );
              })}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
