import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';
import ScrollReveal from '../components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { SocialTooltip } from '@/components/ui/social-media';

export type TeamMember = {
  id: string;
  name: string;
  position: string;
  image: string;
  email: string;
  linkedin: string;
  whatsapp: string;
  bio?: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Dulaj Malporu',
    position: 'Editors-in-Chief',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    email: 'dulaj.m@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234501',
    bio: 'Overseeing editorial vision, publication standards, and executive publication strategies.',
  },
  {
    id: 'member-2',
    name: 'Andrina Fernando',
    position: 'Editors-in-Chief',
    image: '/resources/team/New folder/Andrina.png',
    email: 'andrina.f@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234502',
    bio: 'Leading editorial curation, article pipelines, and publication quality excellence.',
  },
  {
    id: 'member-3',
    name: 'Sithum Bamunuarachchi',
    position: 'Partnership Coordinator',
    image: '/resources/team/New folder/Sithum.png',
    email: 'sithum.b@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234503',
    bio: 'Driving strategic industrial partnerships, corporate sponsorships, and stakeholder alliances.',
  },
  {
    id: 'member-4',
    name: 'Sasina Maheshi',
    position: 'Partnership Coordinator',
    image: '/resources/team/New folder/Sasina.png',
    email: 'sasina.m@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234504',
    bio: 'Fostering corporate collaboration, sponsor relations, and event industry engagements.',
  },
  {
    id: 'member-5',
    name: 'Oshan Harischandra',
    position: 'Financial Coordinator',
    image: '/resources/team/New folder/Oshan.png',
    email: 'oshan.h@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234505',
    bio: 'Managing budgeting, financial governance, fund disbursements, and accounting records.',
  },
  {
    id: 'member-6',
    name: 'Himaya Isurandi',
    position: 'Financial Coordinator',
    image: '/resources/team/New folder/Himaya.png',
    email: 'himaya.i@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234506',
    bio: 'Handling resource allocations, financial audits, and fiscal operations.',
  },
  {
    id: 'member-7',
    name: 'Isuru Dharshana',
    position: 'Creative Director',
    image: '/resources/team/New folder/Isuru.png',
    email: 'isuru.d@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234507',
    bio: 'Shaping visual brand aesthetics, design languages, typography, and art direction.',
  },
  {
    id: 'member-8',
    name: 'Ravindu Aththanayake',
    position: 'Marketing Coordinator',
    image: '/resources/team/New folder/Ravindu.png',
    email: 'ravindu.a@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234508',
    bio: 'Directing marketing outreach, campaigns, promotional releases, and audience engagement.',
  },
  {
    id: 'member-9',
    name: 'Nadeesha',
    position: 'Marketing Coordinator',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
    email: 'nadeesha@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234509',
    bio: 'Driving brand visibility, social media marketing, and targeted community promotions.',
  },
  {
    id: 'member-10',
    name: 'Kaveesha Vimukthi',
    position: 'Video Content Coordinator',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=80',
    email: 'kaveesha.v@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234510',
    bio: 'Producing cinematic video teasers, event trailers, and multimedia storytelling.',
  },
  {
    id: 'member-11',
    name: 'Kavinda Sathsara',
    position: 'Main Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=80',
    email: 'kavinda.s@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234511',
    bio: 'Architecting the official web ecosystem, interactive 3D UI, and deployment pipelines.',
  },
  {
    id: 'member-12',
    name: 'Nethmi Imesha',
    position: 'Editorial Coordinator',
    image: '/resources/team/New folder/Nethmi.png',
    email: 'nethmi.i@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234512',
    bio: 'Reviewing student articles, editorial drafts, and technical symposium write-ups.',
  },
  {
    id: 'member-13',
    name: 'Kasun Rasinidu',
    position: 'Editorial Coordinator',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80',
    email: 'kasun.r@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234513',
    bio: 'Coordinating author communications, thematic article pipelines, and publication formatting.',
  },
  {
    id: 'member-14',
    name: 'Binithi Sarithya',
    position: 'Forum Coordinator',
    image: '/resources/team/New folder/Binithi.png',
    email: 'binithi.s@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234514',
    bio: 'Organizing the Industrial Forum keynote panels, speaker line-ups, and symposium flow.',
  },
  {
    id: 'member-15',
    name: 'Pathum Godamunna',
    position: 'Podcast Coordinator',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    email: 'pathum.g@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234515',
    bio: 'Hosting and curating the Voices of Vision podcast episodes with industry pioneers.',
  },
  {
    id: 'member-16',
    name: 'Sajana Jayawardhana',
    position: 'ER Coordinator',
    image: '/resources/team/New folder/Sajana.png',
    email: 'sajana.j@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234516',
    bio: 'Managing external relations, university administrative liaisons, and public announcements.',
  },
  {
    id: 'member-17',
    name: 'Roshini Premathilaka',
    position: 'ER Coordinator',
    image: '/resources/team/New folder/Roshini.png',
    email: 'roshini.p@exposition.lk',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/94771234517',
    bio: 'Coordinating guest protocols, institutional outreach, and stakeholder relations.',
  },
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [handleNext, isAutoPlaying]);

  return (
    <section
      id="team"
      className="relative z-10 min-h-screen bg-transparent px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden w-full"
    >
      {/* Section Header */}
      <ScrollReveal className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
        <h2
          className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
        >
          Our Team
        </h2>

        <p className="mt-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-white/90">
          Meet the team behind Exposition Issue 22.
        </p>
      </ScrollReveal>

      {/* ================= 3D PERSPECTIVE FEATURE CAROUSEL SHOWCASE ================= */}
      <div
        className="mx-auto max-w-7xl relative my-6"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative w-full h-[380px] sm:h-[420px] md:h-[450px] flex items-center justify-center">
          {/* 3D Carousel Wrapper */}
          <div className="relative w-full h-full flex items-center justify-center [perspective:1200px]">
            {TEAM_MEMBERS.map((member, index) => {
              const total = TEAM_MEMBERS.length;
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
                  className="group absolute w-[230px] sm:w-[260px] md:w-[290px] h-[340px] sm:h-[380px] md:h-[410px] transition-all duration-500 ease-out cursor-pointer rounded-2xl overflow-hidden border border-white/15 bg-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col justify-end"
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
                  {/* Member Photo with smooth hover zoom contained in overflow-hidden */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#18181b]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    {/* Bottom-half gradient overlay for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#101010] via-[#101010]/70 to-transparent pointer-events-none" />
                  </div>

                  {/* Member Details Overlay at the Bottom */}
                  <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-end w-full pointer-events-none">
                    {/* Name & Role — Shifts upward on hover */}
                    <div className="transition-transform duration-300 ease-out group-hover:-translate-y-2">
                      <h3 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-tight text-white line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-[0.72rem] sm:text-xs font-semibold uppercase tracking-wider text-[#E8C896] line-clamp-1 mt-0.5">
                        {member.position}
                      </p>
                    </div>

                    {/* Social & Contact Links — Fades in & slides up from bottom on hover ONLY */}
                    <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-center opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                      <SocialTooltip
                        items={[
                          {
                            href: `mailto:${member.email}`,
                            ariaLabel: 'Email',
                            tooltip: 'Email',
                            color: '#E8C896',
                            icon: <Mail className="size-3.5" />,
                          },
                          {
                            href: member.linkedin,
                            ariaLabel: 'LinkedIn',
                            tooltip: 'LinkedIn',
                            color: '#0077b5',
                            icon: <FaLinkedinIn className="size-3.5" />,
                          },
                          {
                            href: member.whatsapp,
                            ariaLabel: 'WhatsApp',
                            tooltip: 'WhatsApp',
                            color: '#25d366',
                            icon: <FaWhatsapp className="size-3.5" />,
                          },
                        ]}
                        containerSizeClass="w-8 h-8"
                        iconSizeClass="size-3.5"
                        className="gap-2"
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
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 sm:h-11 sm:w-11 z-30 bg-[#161616]/80 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md"
            onClick={handlePrev}
            aria-label="Previous Team Member"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 sm:h-11 sm:w-11 z-30 bg-[#161616]/80 border-white/20 text-white hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md"
            onClick={handleNext}
            aria-label="Next Team Member"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 flex-wrap max-w-md mx-auto px-4">
          {TEAM_MEMBERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 sm:w-8 bg-[#E8C896]' : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to team member ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
