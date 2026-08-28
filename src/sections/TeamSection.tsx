import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  ChevronLeft,
  ChevronRight,
  Mail,
  Sparkles,
} from 'lucide-react';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import ScrollReveal from '../components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { SocialTooltip } from '@/components/ui/social-media';

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  department: 'Leadership' | 'Editorial' | 'Tech & Creative' | 'Corporate & Ops';
  image: string;
  email: string;
  linkedin: string;
  whatsapp: string;
  bio?: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Kavindu Senanayake',
    position: 'Editor-in-Chief',
    department: 'Leadership',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    email: 'kavindu.sen@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234561',
    bio: 'Overseeing editorial direction, thematic curation, and executive publication standards.',
  },
  {
    id: 'member-2',
    name: 'Dilhara Wickramasinghe',
    position: 'President & Organizing Chair',
    department: 'Leadership',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    email: 'dilhara.w@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234562',
    bio: 'Directing the 21st Edition symposium roadmap, university relations, and cross-team execution.',
  },
  {
    id: 'member-3',
    name: 'Thisari Jayawardena',
    position: 'Vice Chair & Operations Lead',
    department: 'Leadership',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    email: 'thisari.j@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234563',
    bio: 'Managing event operations, timeline synchronization, and logistics pipelines.',
  },
  {
    id: 'member-4',
    name: 'Nuwan Perera',
    position: 'Lead Editorial Director',
    department: 'Editorial',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    email: 'nuwan.p@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234564',
    bio: 'Leading technical journalism, corporate interviews, and research paper reviews.',
  },
  {
    id: 'member-5',
    name: 'Rashmi Fernando',
    position: 'Associate Editor',
    department: 'Editorial',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    email: 'rashmi.f@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234565',
    bio: 'Coordinating student articles, technological spotlights, and feature stories.',
  },
  {
    id: 'member-6',
    name: 'Janith Alahakoon',
    position: 'Head of UI/UX & Web Tech',
    department: 'Tech & Creative',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    email: 'janith.a@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234566',
    bio: 'Architecting the web experience, 3D WebGL interactions, and digital platforms.',
  },
  {
    id: 'member-7',
    name: 'Dinithi Gunasekara',
    position: 'Creative & Art Director',
    department: 'Tech & Creative',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    email: 'dinithi.g@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234567',
    bio: 'Shaping the visual identity, magazine typography, and brand design language.',
  },
  {
    id: 'member-8',
    name: 'Malik De Silva',
    position: 'Lead 3D & Motion Artist',
    department: 'Tech & Creative',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    email: 'malik.d@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234568',
    bio: 'Creating cinematic 3D renders, promotional teasers, and visual effects.',
  },
  {
    id: 'member-9',
    name: 'Anuki Mendis',
    position: 'Corporate Partnerships Head',
    department: 'Corporate & Ops',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    email: 'anuki.m@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234569',
    bio: 'Managing tier relationships with Dialog, CodeGen, MAS, Creative Software, and GTN.',
  },
  {
    id: 'member-10',
    name: 'Charith Rajapakse',
    position: 'Finance & Sponsorship Manager',
    department: 'Corporate & Ops',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
    email: 'charith.r@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234570',
    bio: 'Overseeing budget allocations, sponsor commitments, and financial governance.',
  },
  {
    id: 'member-11',
    name: 'Tharushi Weerakoon',
    position: 'TechEvent Hub Coordinator',
    department: 'Tech & Creative',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
    email: 'tharushi.w@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234571',
    bio: 'Managing hackathon registrations, university network portals, and event logistics.',
  },
  {
    id: 'member-12',
    name: 'Sahan Dissanayake',
    position: 'Keynote & Speaker Liaison',
    department: 'Leadership',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80',
    email: 'sahan.d@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234572',
    bio: 'Facilitating international keynote panelists and executive industrial guests.',
  },
  {
    id: 'member-13',
    name: 'Pravini Ranasinghe',
    position: 'Head of Public Relations',
    department: 'Corporate & Ops',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80',
    email: 'pravini.r@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234573',
    bio: 'Managing media press releases, university communications, and public visibility.',
  },
  {
    id: 'member-14',
    name: 'Kusal Jayasuriya',
    position: 'Digital Marketing Strategist',
    department: 'Corporate & Ops',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    email: 'kusal.j@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234574',
    bio: 'Driving social campaigns, YouTube video showcases, and audience growth.',
  },
  {
    id: 'member-15',
    name: 'Sanduni Abeyrathne',
    position: 'Publications & Print Manager',
    department: 'Editorial',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80',
    email: 'sanduni.a@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234575',
    bio: 'Supervising high-grade magazine printing, distribution, and archival records.',
  },
  {
    id: 'member-16',
    name: 'Gayan Pathirana',
    position: 'Multimedia & Video Director',
    department: 'Tech & Creative',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=80',
    email: 'gayan.p@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234576',
    bio: 'Directing interview recording sessions, podcasts, and highlight trailers.',
  },
  {
    id: 'member-17',
    name: 'Hansani Karunaratne',
    position: 'Delegate & Venue Experience Lead',
    department: 'Corporate & Ops',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80',
    email: 'hansani.k@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234577',
    bio: 'Curating the in-person delegate experience, badge protocols, and auditorium setup.',
  },
  {
    id: 'member-18',
    name: 'Ruwantha Lokuge',
    position: 'Quality Assurance & Archival Lead',
    department: 'Leadership',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    email: 'ruwantha.l@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234578',
    bio: 'Ensuring rigorous proofing, institutional compliance, and archival delivery.',
  },
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDepartment, setActiveDepartment] = useState<'All' | 'Leadership' | 'Editorial' | 'Tech & Creative' | 'Corporate & Ops'>('All');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const filteredMembers = activeDepartment === 'All'
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter((m) => m.department === activeDepartment);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredMembers.length);
  }, [filteredMembers.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredMembers.length) % filteredMembers.length);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [handleNext, isAutoPlaying]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeDepartment]);

  return (
    <section
      id="team"
      className="relative z-10 min-h-screen bg-transparent px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden w-full"
    >
      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8894F]/30 bg-[#161616]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8C896] backdrop-blur-md">
          <Users className="h-3.5 w-3.5 text-[#E8C896]" />
          The Visionaries Behind Exposition
        </span>

        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Our Team
        </h2>

        <p className="mt-2 text-base sm:text-lg font-semibold uppercase tracking-widest text-[#E8C896]">
          Meet the team behind Exposition Issue 22.
        </p>

        <p className="mt-4 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-[#9A9A9A] font-light">
          Meet the dedicated committee of leaders, editors, creatives, and technical pioneers from the
          Department of Industrial Management (MIT), University of Kelaniya driving the 22nd Edition.
        </p>

        {/* Department Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {(['All', 'Leadership', 'Editorial', 'Tech & Creative', 'Corporate & Ops'] as const).map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDepartment(dept)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${activeDepartment === dept
                ? 'bg-gradient-to-r from-[#B8894F] to-[#E8C896] text-black border-transparent shadow-[0_0_20px_rgba(184,137,79,0.3)]'
                : 'bg-[#161616] text-[#9A9A9A] border-white/10 hover:border-[#B8894F]/30 hover:text-white'
                }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* ================= 3D PERSPECTIVE FEATURE CAROUSEL SHOWCASE ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDepartment}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-7xl relative my-8"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] flex items-center justify-center">
            {/* 3D Carousel Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center [perspective:1200px]">
              {filteredMembers.map((member, index) => {
                const total = filteredMembers.length;
                const offset = index - currentIndex;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;
                const isSecondAdjacent = Math.abs(pos) === 2;

                return (
                  <div
                    key={member.id}
                    onClick={() => setCurrentIndex(index)}
                    className="absolute w-[260px] sm:w-[300px] md:w-[340px] h-[430px] sm:h-[470px] md:h-[500px] transition-all duration-500 ease-out cursor-pointer rounded-3xl overflow-hidden border border-white/15 bg-[#141414]/95 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between"
                    style={{
                      transform: `
                      translateX(${pos * 48}%) 
                      scale(${isCenter ? 1 : isAdjacent ? 0.85 : isSecondAdjacent ? 0.7 : 0.5})
                      rotateY(${pos * -12}deg)
                      translateZ(${isCenter ? 40 : 0}px)
                    `,
                      zIndex: isCenter ? 20 : isAdjacent ? 10 : isSecondAdjacent ? 5 : 1,
                      opacity: isCenter ? 1 : isAdjacent ? 0.45 : isSecondAdjacent ? 0.2 : 0,
                      filter: isCenter ? 'blur(0px)' : 'blur(3px)',
                      visibility: Math.abs(pos) > 2 ? 'hidden' : 'visible',
                    }}
                  >
                    {/* Member Photo */}
                    <div className="relative h-[60%] w-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />

                      {/* Department Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/70 border border-[#B8894F]/30 px-2.5 py-1 text-[0.62rem] font-mono uppercase tracking-wider text-[#E8C896] backdrop-blur-md">
                          <Sparkles className="size-2.5 text-[#E8C896]" />
                          {member.department}
                        </span>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white line-clamp-1">
                          {member.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-[#E8C896] line-clamp-1 mt-0.5">
                          {member.position}
                        </p>
                      </div>

                      {/* Social & Contact Links using SocialTooltip */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-center">
                        <SocialTooltip
                          items={[
                            {
                              href: `mailto:${member.email}`,
                              ariaLabel: 'Email',
                              tooltip: 'Email',
                              color: '#E8C896',
                              icon: <Mail className="size-4" />,
                            },
                            {
                              href: member.linkedin,
                              ariaLabel: 'LinkedIn',
                              tooltip: 'LinkedIn',
                              color: '#0077b5',
                              icon: <FaLinkedinIn className="size-4" />,
                            },
                            {
                              href: member.whatsapp,
                              ariaLabel: 'WhatsApp',
                              tooltip: 'WhatsApp',
                              color: '#25d366',
                              icon: <FaWhatsapp className="size-4" />,
                            },
                          ]}
                          containerSizeClass="w-9 h-9"
                          iconSizeClass="size-4"
                          className="gap-2.5"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Previous & Next Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full h-11 w-11 z-30 bg-[#161616]/80 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md"
              onClick={handlePrev}
              aria-label="Previous Team Member"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full h-11 w-11 z-30 bg-[#161616]/80 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md"
              onClick={handleNext}
              aria-label="Next Team Member"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {filteredMembers.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-[#E8C896]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                aria-label={`Go to team member ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
