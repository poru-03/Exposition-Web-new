import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';
import ScrollReveal from '../components/ScrollReveal';
import { SocialTooltip, SocialItem } from '@/components/ui/social-media';
import {
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
    id: 'interview-1',
    name: 'Dhanika Perera',
    title: 'Founder & CEO, Bhasha / Helakuru',
    company: 'Bhasha / Helakuru',
    quote:
      'Building native platforms that serve millions requires deep cultural empathy combined with relentless software architecture discipline.',
    image: '/resources/speakers/dhanika perera.png',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'interview-2',
    name: 'Dr. Harsha Subasinghe',
    title: 'Founder & CEO, CodeGen & Vega Innovations',
    company: 'CodeGen International & Vega Innovations',
    quote:
      'To build world-class electric supercars and autonomous AI algorithms from South Asia, you must foster fearless engineering curiosity without borders.',
    image: '/resources/speakers/harsha.png',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'interview-3',
    name: 'Deepal Sooriyaarachchi',
    title: 'Management Consultant & Author',
    company: 'Former Managing Director, AVIVA NDB',
    quote:
      'True corporate leadership is not merely steering financial metrics; it is the mindfulness to unlock the latent creative spirit of your people.',
    image: '/resources/speakers/deepal sooriyarachchi.png',
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'interview-4',
    name: 'Dian Gomes',
    title: 'Global Business Leader & Motivational Icon',
    company: 'Former Managing Director, MAS Holdings',
    quote:
      'Winning in the global market demands an uncompromising championship mindset, relentless discipline, and championing homegrown talent.',
    image: '/resources/speakers/dian gomez.png',
    socials: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'interview-5',
    name: 'Peter De Almeida',
    title: 'Managing Director / CEO, N-able',
    company: 'N-able',
    quote:
      'Digital transformation begins with unlearning obsolete habits and empowering engineers to challenge architectural status quos fearlessly.',
    image: '/resources/speakers/peterdealmeida.png',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'interview-6',
    name: 'Upendra Pieris',
    title: 'Director & Co-Founder, Creative Software',
    company: 'Creative Software',
    quote:
      'Scaling international engineering teams across continents hinges on trust, radical engineering transparency, and continuous technological upskilling.',
    image: '/resources/speakers/upendra pieris.png',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
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
  country,
  tagline,
}: (typeof REVIEWS_DATA)[number]) {
  return (
    <Card className="w-[210px] sm:w-[230px] rounded-xl border border-white/10 bg-[#151515]/95 shadow-md hover:border-[#B8894F]/35 transition-all duration-200">
      <CardContent className="p-3.5 flex flex-col justify-between h-full space-y-2">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9 border border-white/20 shadow-md shrink-0">
            <AvatarImage src={img} alt={name} className="object-cover object-top" />
            <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-white truncate">{name}</span>
              <span className="text-[0.6rem] shrink-0">{country}</span>
            </div>
            <p className="text-[0.6rem] font-mono text-[#9A9A9A] truncate">{username}</p>
          </div>
        </div>

        <p className="text-[0.62rem] font-medium text-[#E8C896] truncate">
          {tagline}
        </p>

        <div className="flex items-center gap-1 pt-1.5 border-t border-white/5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReviewsSection() {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const activeFeatured = FEATURED_REVIEWS[featuredIndex];

  // Automatic 5-second carousel cycle through all reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % FEATURED_REVIEWS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
        <ScrollReveal className="flex flex-col items-center justify-center text-center mb-4 sm:mb-6 px-[5%]">
          <h2
            className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 76px)' }}
          >
            Reviews & Voices
          </h2>

          <p className="mt-2 text-base sm:text-lg font-semibold uppercase tracking-widest text-[#E8C896]">
            Our success stories
          </p>
        </ScrollReveal>

        {/* Spotlight Card in Middle of Review Section */}
        <ScrollReveal delay={0.15} className="w-full max-w-6xl px-[5%] mt-1 mb-6 sm:mt-2 sm:mb-8 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeatured.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative flex flex-col md:flex-row items-center justify-center w-full"
            >
              {/* Left Side: Scaled Portrait Image */}
              <div className="w-[240px] sm:w-[280px] md:w-[320px] aspect-square rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/15 shrink-0 bg-[#1a1a1a]">
                <img
                  src={activeFeatured.image}
                  alt={activeFeatured.name}
                  className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Right Side: Content Card with Large Quote Styling */}
              <div className="w-full sm:w-[420px] md:w-[500px] lg:w-[560px] -mt-10 md:mt-0 md:-ml-16 bg-[#141414]/95 border border-white/15 p-5 sm:p-6 md:p-8 rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-10 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                    {activeFeatured.name}
                  </h3>
                  <p className="text-xs font-medium text-[#9A9A9A]">
                    {activeFeatured.title}
                  </p>

                  {/* Quote Message styled with Oversized Metallic Gold Quotation Marks */}
                  <div className="relative py-2 my-2">
                    <span className="absolute -top-3 -left-2 text-[#c9a25f]/30 font-serif text-5xl sm:text-6xl font-bold leading-none select-none pointer-events-none">
                      “
                    </span>
                    <blockquote className="relative z-10 text-xs sm:text-sm font-extrabold italic text-[#f5ebd9] leading-relaxed px-3">
                      {activeFeatured.quote}
                    </blockquote>
                    <span className="absolute -bottom-4 -right-1 text-[#c9a25f]/30 font-serif text-5xl sm:text-6xl font-bold leading-none select-none pointer-events-none">
                      ”
                    </span>
                  </div>
                </div>

                {/* Circular Social Icons using SocialTooltip */}
                <div className="pt-4 mt-3 border-t border-white/10">
                  {(() => {
                    const reviewSocialItems: SocialItem[] = [];
                    if (activeFeatured.socials.github) {
                      reviewSocialItems.push({
                        href: activeFeatured.socials.github,
                        ariaLabel: 'GitHub',
                        tooltip: 'GitHub',
                        color: '#333333',
                        icon: <Github className="size-4" />,
                      });
                    }
                    if (activeFeatured.socials.twitter) {
                      reviewSocialItems.push({
                        href: activeFeatured.socials.twitter,
                        ariaLabel: 'Twitter',
                        tooltip: 'Twitter',
                        color: '#1da1f2',
                        icon: <Twitter className="size-4" />,
                      });
                    }
                    if (activeFeatured.socials.youtube) {
                      reviewSocialItems.push({
                        href: activeFeatured.socials.youtube,
                        ariaLabel: 'YouTube',
                        tooltip: 'YouTube',
                        color: '#ff0000',
                        icon: <Youtube className="size-4" />,
                      });
                    }
                    if (activeFeatured.socials.linkedin) {
                      reviewSocialItems.push({
                        href: activeFeatured.socials.linkedin,
                        ariaLabel: 'LinkedIn',
                        tooltip: 'LinkedIn',
                        color: '#0077b5',
                        icon: <Linkedin className="size-4" />,
                      });
                    }
                    return (
                      <SocialTooltip
                        items={reviewSocialItems}
                        containerSizeClass="w-9 h-9"
                        iconSizeClass="w-4 h-4"
                        className="justify-start gap-2.5"
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
