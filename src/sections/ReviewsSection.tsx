import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';
import ScrollReveal from '../components/ScrollReveal';
import { SocialTooltip, SocialItem } from '@/components/ui/social-media';
import {
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
  Github,
  Twitter,
  Youtube,
  Linkedin,
} from 'lucide-react';

export const FEATURED_REVIEWS = [
  {
    id: 'feat-1',
    name: 'Michael Chen',
    title: 'Senior Software Engineer, Cloud Infrastructure',
    company: 'Distributed Systems & Web3D',
    quote:
      'Working with this team completely changed our infrastructure game. The support and expertise were incredible. They delivered beyond our expectations and helped us scale to millions of users.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'feat-2',
    name: 'Mr. Asela Waidyalankara',
    title: 'Cyber Security & AI Policy Leader',
    company: 'Educator & Global Tech Speaker',
    quote:
      'Data democracy and universal access in the digital age was an exceptional forum. Our discussion highlighted crucial topics around data democratization and competitive advantage for organizations navigating the modern digital frontier.',
    image: '/resources/speakers/asela.jpeg',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'feat-3',
    name: 'Mr. Deepal Sooriyaarachchi',
    title: 'Management Consultant & Author',
    company: 'Former Managing Director, AVIVA NDB',
    quote:
      'Being part of Exposition was truly a privilege. The meticulous planning and flawless execution left a profound professional impression on all attendees involved across every technical track.',
    image: '/resources/speakers/deepal sooriyarachchi.png',
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'feat-4',
    name: 'Prof. Roshan G. Ragel',
    title: 'CEO, LEARN / Senior Lecturer',
    company: 'University of Peradeniya',
    quote:
      'The industrial forum was well-curated with engaging panels tackling enterprise milestones with exceptional technical depth and realistic industrial transformation.',
    image: '/resources/speakers/ananda handunge.png',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'feat-5',
    name: 'Mrs. Kanchana Priyakantha',
    title: 'Co-Founder & CEO, KReader / KBooks',
    company: 'EdTech Pioneer & Digital Publisher',
    quote:
      'The festive atmosphere and adept use of cutting-edge technology were commendable, managing delivery standards beautifully across all interactive streams.',
    image: '/resources/speakers/kanchana.png',
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
];

export const REVIEWS_DATA = [
  {
    name: 'Mr. Asela Waidyalankara',
    username: '@asela_cyber',
    body: 'Data democracy and universal access in the digital age was an exceptional forum addressing industrial milestones realistically.',
    img: '/resources/speakers/asela.jpeg',
    country: '🇱🇰 Sri Lanka',
    tagline: 'Cyber Security & AI Policy Leader',
  },
  {
    name: 'Mr. Deepal Sooriyarachchi',
    username: '@deepal_coach',
    body: 'Being part of Exposition was truly a privilege. The meticulous planning and execution left a profound professional impression.',
    img: '/resources/speakers/deepal sooriyarachchi.png',
    country: '🇱🇰 Sri Lanka',
    tagline: 'Former Managing Director, AVIVA NDB',
  },
  {
    name: 'Prof. Roshan G. Ragel',
    username: '@prof_ragel',
    body: 'The industrial forum was well-curated with engaging panels tackling enterprise milestones with exceptional technical depth.',
    img: '/resources/speakers/ananda handunge.png',
    country: '🇱🇰 Sri Lanka',
    tagline: 'CEO, LEARN / University of Peradeniya',
  },
  {
    name: 'Mr. Thushara Rathnaweera',
    username: '@thushara_mx',
    body: 'Organized with stellar professional standards, showcasing profound technical acumen and operational coordination.',
    img: '/resources/speakers/peterdealmeida.png',
    country: '🇰🇷 Samsung',
    tagline: 'Deputy General Manager, Samsung Electronics',
  },
  {
    name: 'Mr. Kosala Weerasena',
    username: '@kosala_telecom',
    body: 'Deeply impressed with the talents and digital capabilities exhibited during the event execution pipelines and corporate tracks.',
    img: '/resources/speakers/dhanika perera.png',
    country: '🇱🇰 Sri Lanka',
    tagline: 'Chartered Telecom Engineer',
  },
  {
    name: 'Mrs. Kanchana Priyakantha',
    username: '@kanchana_kbooks',
    body: 'The festive atmosphere and adept use of cutting-edge technology were commendable, managing delivery standards beautifully.',
    img: '/resources/speakers/kanchana.png',
    country: '🇱🇰 Sri Lanka',
    tagline: 'Co-Founder & CEO, KReader / KBooks',
  },
  {
    name: 'Dian Gomes',
    username: '@dian_gomes',
    body: 'A powerhouse of energy and innovation. Exposition sets the benchmark for technological thought leadership.',
    img: '/resources/speakers/dian gomez.png',
    country: '🇱🇰 Sri Lanka',
    tagline: 'Former Managing Director, MAS Holdings',
  },
  {
    name: 'Sushena Ranatunga',
    username: '@sushena_tech',
    body: 'Inspiring to witness young engineering talent pushing boundaries in spatial computing, AI, and distributed software systems.',
    img: '/resources/speakers/upendra pieris.png',
    country: '🇳🇴 Nordic Tech',
    tagline: 'Director & Co-Founder, Creative Software',
  },
  {
    name: 'Dhanika Perera',
    username: '@dhanika_p',
    body: 'Disrupting ecosystems through digital engineering platforms and empowering millions with accessible native tech products.',
    img: '/resources/speakers/dhanika perera.png',
    country: '🇱🇰 Bhasha',
    tagline: 'Founder & CEO, Bhasha / Helakuru',
  },
];

function ReviewCard({
  img,
  name,
  username,
  body,
  country,
  tagline,
}: (typeof REVIEWS_DATA)[number]) {
  return (
    <Card className="w-[270px] sm:w-[300px] rounded-2xl border border-white/10 bg-[#151515]/95 shadow-xl hover:border-[#B8894F]/35 transition-colors duration-200">
      <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-3">
            <Avatar className="size-10 border border-white/20 shadow-md shrink-0">
              <AvatarImage src={img} alt={name} className="object-cover object-top" />
              <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-white truncate">{name}</span>
                <span className="text-[0.65rem] shrink-0">{country}</span>
              </div>
              <p className="text-[0.65rem] font-mono text-[#9A9A9A] truncate">{username}</p>
            </div>
          </div>

          <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-wider text-[#E8C896] truncate">
            {tagline}
          </p>

          <blockquote className="mt-2.5 text-xs text-[#9A9A9A] font-light leading-relaxed">
            &ldquo;{body}&rdquo;
          </blockquote>
        </div>

        <div className="flex items-center gap-1 pt-2.5 mt-2.5 border-t border-white/5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReviewsSection() {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const activeFeatured = FEATURED_REVIEWS[featuredIndex];

  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev - 1 + FEATURED_REVIEWS.length) % FEATURED_REVIEWS.length);
  };

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev + 1) % FEATURED_REVIEWS.length);
  };

  return (
    <section
      id="reviews"
      className="relative z-10 min-h-screen bg-transparent px-[5%] py-14 sm:py-20 md:py-24 overflow-hidden w-full"
    >
      {/* ================= BACKGROUND: Full-Section Edge-to-Edge Marquee Flow (Visible From Top Title to Bottom) ================= */}
      <div className="absolute inset-0 w-full h-full min-h-full overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-40">
        <div
          className="flex flex-row items-center gap-6 sm:gap-8 justify-center w-[160vw] max-w-none h-[160%]"
          style={{
            transform:
              'translateX(-40px) translateY(0px) rotateX(14deg) rotateY(-6deg) rotateZ(10deg)',
          }}
        >
          {/* Column 1 (downwards) */}
          <Marquee vertical repeat={2} className="[--duration:28s]">
            {REVIEWS_DATA.slice(0, 5).map((review, i) => (
              <ReviewCard key={`${review.username}-1-${i}`} {...review} />
            ))}
          </Marquee>

          {/* Column 2 (upwards) */}
          <Marquee vertical reverse repeat={2} className="[--duration:34s]">
            {REVIEWS_DATA.slice(3, 8).map((review, i) => (
              <ReviewCard key={`${review.username}-2-${i}`} {...review} />
            ))}
          </Marquee>

          {/* Column 3 (downwards) */}
          <Marquee vertical repeat={2} className="[--duration:26s]">
            {REVIEWS_DATA.slice(4, 9).map((review, i) => (
              <ReviewCard key={`${review.username}-3-${i}`} {...review} />
            ))}
          </Marquee>

          {/* Column 4 (upwards) */}
          <Marquee vertical reverse repeat={2} className="[--duration:32s]">
            {REVIEWS_DATA.slice(0, 6).map((review, i) => (
              <ReviewCard key={`${review.username}-4-${i}`} {...review} />
            ))}
          </Marquee>

          {/* Column 5 (downwards on large screens) */}
          <Marquee vertical repeat={2} className="hidden lg:flex [--duration:30s]">
            {REVIEWS_DATA.slice(2, 7).map((review, i) => (
              <ReviewCard key={`${review.username}-5-${i}`} {...review} />
            ))}
          </Marquee>

          {/* Column 6 (upwards on xl screens) */}
          <Marquee vertical reverse repeat={2} className="hidden xl:flex [--duration:36s]">
            {REVIEWS_DATA.slice(1, 6).map((review, i) => (
              <ReviewCard key={`${review.username}-6-${i}`} {...review} />
            ))}
          </Marquee>
        </div>

        {/* Seamless Edge Fade Vignettes */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10" />
      </div>

      {/* ================= FOREGROUND: Title, Spotlight Card & Stats (Floating Over Marquee) ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 px-[5%]">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8894F]/30 bg-[#161616]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8C896] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#E8C896]" />
            Community Voices & Success Stories
          </span>

          <h2
            className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
          >
            Reviews & Voices
          </h2>

          <p className="mt-2 text-base sm:text-lg font-semibold uppercase tracking-widest text-[#E8C896]">
            Our success stories
          </p>

          <p className="mt-4 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-[#9A9A9A] font-light">
            Industry leaders, tech pioneers, and academic visionaries sharing their transformative
            experiences and endorsements from the Exposition ecosystem.
          </p>
        </ScrollReveal>

        {/* Spotlight Card in Middle of Review Section */}
        <ScrollReveal delay={0.15} className="w-full max-w-5xl px-[5%] my-6 sm:my-10 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeatured.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative flex flex-col md:flex-row items-center justify-center w-full"
            >
              {/* Left Side: Large Rounded Portrait Image */}
              <div className="w-full sm:w-[380px] md:w-[440px] aspect-square rounded-[36px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95)] border border-white/15 shrink-0 bg-[#1a1a1a]">
                <img
                  src={activeFeatured.image}
                  alt={activeFeatured.name}
                  className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Right Side: Overlapping Content Card */}
              <div className="w-full md:w-[480px] lg:w-[540px] -mt-12 md:mt-0 md:-ml-24 bg-[#141414]/95 border border-white/15 p-6 sm:p-8 md:p-10 rounded-[32px] shadow-[0_35px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-10 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    {activeFeatured.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#9A9A9A]">
                    {activeFeatured.title}
                  </p>
                  <p className="mt-4 text-xs sm:text-sm md:text-base text-white/85 font-light leading-relaxed">
                    {activeFeatured.quote}
                  </p>
                </div>

                {/* Circular Social Icons using SocialTooltip */}
                <div className="pt-6 mt-4 border-t border-white/10">
                  {(() => {
                    const reviewSocialItems: SocialItem[] = [];
                    if (activeFeatured.socials.github) {
                      reviewSocialItems.push({
                        href: activeFeatured.socials.github,
                        ariaLabel: 'GitHub',
                        tooltip: 'GitHub',
                        color: '#333333',
                        icon: <Github className="size-5" />,
                      });
                    }
                    if (activeFeatured.socials.twitter) {
                      reviewSocialItems.push({
                        href: activeFeatured.socials.twitter,
                        ariaLabel: 'Twitter',
                        tooltip: 'Twitter',
                        color: '#1da1f2',
                        icon: <Twitter className="size-5" />,
                      });
                    }
                    if (activeFeatured.socials.youtube) {
                      reviewSocialItems.push({
                        href: activeFeatured.socials.youtube,
                        ariaLabel: 'YouTube',
                        tooltip: 'YouTube',
                        color: '#ff0000',
                        icon: <Youtube className="size-5" />,
                      });
                    }
                    if (activeFeatured.socials.linkedin) {
                      reviewSocialItems.push({
                        href: activeFeatured.socials.linkedin,
                        ariaLabel: 'LinkedIn',
                        tooltip: 'LinkedIn',
                        color: '#0077b5',
                        icon: <Linkedin className="size-5" />,
                      });
                    }
                    return (
                      <SocialTooltip
                        items={reviewSocialItems}
                        containerSizeClass="w-11 h-11"
                        iconSizeClass="w-5 h-5"
                        className="justify-start gap-3"
                      />
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls: Arrow Left + Dots + Arrow Right */}
          <div className="flex items-center gap-4 mt-8 sm:mt-10">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="size-11 rounded-full bg-[#181818] border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white hover:text-black hover:border-white transition-all duration-200"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 px-2">
              {FEATURED_REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${idx === featuredIndex
                    ? 'w-6 h-2.5 bg-[#E8C896]'
                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="size-11 rounded-full bg-[#181818] border border-white/20 text-white flex items-center justify-center shadow-lg hover:bg-white hover:text-black hover:border-white transition-all duration-200"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Stats Counter Row (Silver Gradient Numerals Accent) */}
        <ScrollReveal delay={0.25} y={20} className="w-full max-w-6xl mt-12 px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-white/10 pt-10">
            <div className="p-4 rounded-2xl bg-[#141414]/80 border border-white/5 backdrop-blur-md">
              <h3 className="text-3xl sm:text-4xl font-black text-silver-gradient">20+</h3>
              <p className="text-xs font-mono uppercase tracking-widest text-[#9A9A9A] mt-1">Years of Legacy</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#141414]/80 border border-white/5 backdrop-blur-md">
              <h3 className="text-3xl sm:text-4xl font-black text-silver-gradient">5+</h3>
              <p className="text-xs font-mono uppercase tracking-widest text-[#9A9A9A] mt-1">Tech Segments</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#141414]/80 border border-white/5 backdrop-blur-md">
              <h3 className="text-3xl sm:text-4xl font-black text-silver-gradient">100+</h3>
              <p className="text-xs font-mono uppercase tracking-widest text-[#9A9A9A] mt-1">Corporate Partners</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#141414]/80 border border-white/5 backdrop-blur-md">
              <h3 className="text-3xl sm:text-4xl font-black text-silver-gradient">20+</h3>
              <p className="text-xs font-mono uppercase tracking-widest text-[#9A9A9A] mt-1">Published Issues</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
