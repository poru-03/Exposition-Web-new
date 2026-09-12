import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export type InterviewItem = {
  id: string;
  name: string;
  issue: number | string;
  role: string;
  company: string;
  quote: string;
  handle: string;
  image: string;
};

export const INTERVIEWEE_DATA: InterviewItem[] = [
  {
    id: "kasun-kalhara",
    name: "Mr. Kasun Kalhara",
    issue: 20,
    role: "Musician",
    company: "",
    quote: "Musician blending traditional and contemporary Sri Lankan sounds.",
    handle: "@kasunkalhara",
    image: "/resources/interview/kasun.png"
  },
  {
    id: "nadeesha-chandrasena",
    name: "Dr. Nadeesha Chandrasena",
    issue: 20,
    role: "Urban Innovator",
    company: "",
    quote: "Urban innovator focused on sustainable development and...",
    handle: "@nadeeshachandrasena",
    image: "/resources/interview/nadeesha.png"
  },
  {
    id: "sandra-wanduragala",
    name: "Mrs. Sandra Wanduragala",
    issue: 20,
    role: "Founder, Selyn",
    company: "Selyn",
    quote: "Pioneering fair-trade handloom enterprise leader since 1992.",
    handle: "@sandrawanduragala",
    image: "/resources/interview/sandra.png"
  },
  {
    id: "dilupa-pathirana",
    name: "Mr. Dilupa Pathirana",
    issue: 20,
    role: "CEO of Barista Coffee Lanka (Pvt) Ltd",
    company: "Barista Coffee Lanka (Pvt) Ltd",
    quote: "Leader transforming Sri Lanka's largest café chain.",
    handle: "@dilupapathirana",
    image: "/resources/interview/dilupa.png"
  },
  {
    id: "dilshan-abeygunawadana",
    name: "Mr. Dilshan Abeygunawadana",
    issue: 20,
    role: "Entrepreneur / Content Creator",
    company: "",
    quote: "Entrepreneur and content creator with 500K+ followers.",
    handle: "@dilshanabey",
    image: "/resources/interview/dilshan.png"
  },
  {
    id: "kanchana-priyakantha",
    name: "Ms. Kanchana Priyakantha",
    issue: 19,
    role: "Co-founder & CEO",
    company: "",
    quote: "Award-winning author, publisher, and CEO driving innovation in...",
    handle: "@kanchanap",
    image: "/resources/interview/kanchana.png"
  },
  {
    id: "santhush-weeraman",
    name: "Mr. Santhush Weeraman",
    issue: 19,
    role: "Musician",
    company: "",
    quote: "Singer and performer with two decades of dynamic music.",
    handle: "@santhushw",
    image: "/resources/interview/santhush.png"
  },
  {
    id: "ananda-handunge",
    name: "Dr. (Eng.) Ananda Handunge",
    issue: 19,
    role: "Solid Tyre Division, Ferentino Tyre",
    company: "Ferentino Tyre",
    quote: "Chartered mechanical engineer with 40+ years' leadership in...",
    handle: "@anandahandunge",
    image: "/resources/interview/ananda handunge.png"
  },
  {
    id: "upendra-pieris",
    name: "Dr. Upendra Pieris",
    issue: 19,
    role: "CEO of Orel IT",
    company: "Orel IT",
    quote: "IT and AI expert leading Sri Lankan tech growth.",
    handle: "@upendrapieris",
    image: "/resources/interview/upendra pieris.png"
  },
  {
    id: "malinda-alahakoon",
    name: "Mr. Malinda Alahakoon",
    issue: 18,
    role: "Science Communicator",
    company: "",
    quote: "Experienced science lecturer and communicator inspiring curiosity...",
    handle: "@malindaalahakoon",
    image: "/resources/interview/malinda.png"
  },
  {
    id: "dhanushka-fernando",
    name: "Mr. Dhanushka Fernando",
    issue: 18,
    role: "Entrepreneur",
    company: "",
    quote: "Award-winning entrepreneur and visionary business leader.",
    handle: "@dhanushkafernando",
    image: "/resources/interview/dhanushka.png"
  },
  {
    id: "viresh-cooray",
    name: "Mr. Viresh Cooray",
    issue: 18,
    role: "Audio Engineer & Musician",
    company: "",
    quote: "Audio engineer and musician blending technical skill with...",
    handle: "@vireshcooray",
    image: "/resources/interview/cooray.png"
  },
  {
    id: "roshanie-jayasundara",
    name: "Ms. Roshanie Jayasundara",
    issue: 17,
    role: "EVP of John Keells Holdings PLC",
    company: "John Keells Holdings PLC",
    quote: "Compassionate leader advancing Sri Lanka's property sector.",
    handle: "@roshaniej",
    image: "/resources/interview/deshabandu.png"
  },
  {
    id: "nayomi-hadunnetti",
    name: "Ms. Nayomi Hadunnetti",
    issue: 17,
    role: "Entrepreneur / Founder, Elixir Ceylon (Pvt) Ltd",
    company: "Elixir Ceylon (Pvt) Ltd",
    quote: "20+ years in marketing, hospitality, and tourism.",
    handle: "@nayomihadunnetti",
    image: "/resources/interview/nayomi.png"
  },
  {
    id: "lasantha-wickramasinghe",
    name: "Mr. Lasantha Wickramasinghe",
    issue: 16,
    role: "Entrepreneur",
    company: "",
    quote: "Innovative tech leader in web, app, and game development.",
    handle: "@lasanthaw",
    image: "/resources/interview/lasantha.png"
  },
  {
    id: "kasturi-wilson",
    name: "Ms. Kasturi Chellaraja Wilson",
    issue: 15,
    role: "Former Group CEO of Hemas Holdings PLC",
    company: "Hemas Holdings PLC",
    quote: "First female CEO of a listed Sri Lankan conglomerate; national...",
    handle: "@kasturiwilson",
    image: "/resources/interview/kasthuri.png"
  },
  {
    id: "saman-perera",
    name: "Mr. Saman Perera",
    issue: 15,
    role: "Former CIO of Capital Maharaja Organization",
    company: "Capital Maharaja Organization",
    quote: "Experienced CIO driving digital transformation and innovation at...",
    handle: "@samanperera",
    image: "/resources/interview/saman perera.png"
  },
  {
    id: "haritha-thilakarathna",
    name: "Dr. Haritha Thilakarathna",
    issue: 14,
    role: "Microsoft MVP (AI) 2017–2024",
    company: "",
    quote: "Cloud architect recognized for AI innovation and expertise.",
    handle: "@harithat",
    image: "/resources/interview/harsha.png"
  },
  {
    id: "dilani-alagaratnan",
    name: "Ms. Dilani Alagaratnan",
    issue: 12,
    role: "President, Group HR & Legal, John Keells Holdings",
    company: "John Keells Holdings",
    quote: "Executive committee member at John Keells Holdings leading key...",
    handle: "@dilanialagaratnan",
    image: "/resources/interview/dilani alagarathnan.png"
  },
  {
    id: "dilantha-malagamuwa",
    name: "Mr. Dilantha Malagamuwa",
    issue: 11,
    role: "Owner, Dilango Racing Team",
    company: "Dilango Racing Team",
    quote: "Champion Sri Lankan racing driver and founder of Dilango...",
    handle: "@dilanthamalagamuwa",
    image: "/resources/interview/dilantha.png"
  },
  {
    id: "dulith-herath",
    name: "Mr. Dulith Herath",
    issue: 10,
    role: "Founder of Kapruka",
    company: "Kapruka",
    quote: "Innovative entrepreneur in e-commerce, tech, and hospitality...",
    handle: "@dulithherath",
    image: "/resources/interview/dulith.png"
  },
  {
    id: "shakthi-ranathunga",
    name: "Mr. Shakthi Ranathunga",
    issue: 10,
    role: "Group COO, MAS Holdings",
    company: "MAS Holdings",
    quote: "Board director and leader skilled in HR, operations, and business...",
    handle: "@shakthiranathunga",
    image: "/resources/interview/shakthi.png"
  },
  {
    id: "dhananjaya-hettiarachchi",
    name: "Mr. Dhananjaya Hettiarachchi",
    issue: 10,
    role: "World Champion of Public Speaking",
    company: "",
    quote: "Leadership coach and 2014 Toastmasters World Champion.",
    handle: "@dhananjayahettiarachchi",
    image: "/resources/interview/dhananjaya.png"
  }
];

/**
 * Helper component to render speaker photos with initials fallback if image missing
 */
const SpeakerImage = ({
  src,
  alt,
  className = '',
  name = ''
}: {
  src: string;
  alt: string;
  className?: string;
  name?: string;
}) => {
  const [imgError, setImgError] = useState(false);

  const getInitials = (personName: string) => {
    if (!personName) return 'EX';
    const parts = personName.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.|\(Eng\.\))\s*/i, '').trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'EX';
  };

  if (imgError || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1813] via-[#0d0d0d] to-[#17140f] text-[#c9a25f] font-mono select-none p-4 text-center border border-[#c9a25f]/20 ${className}`}>
        <div className="text-3xl font-black tracking-widest text-[#c9a25f] mb-1 drop-shadow-[0_0_10px_rgba(201,162,95,0.4)]">
          {getInitials(name || alt)}
        </div>
        <span className="text-[0.6rem] text-white/50 uppercase tracking-widest truncate max-w-full">
          {name || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
      className={className}
    />
  );
};

export default function InterviewHighlightsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const activePerson = INTERVIEWEE_DATA[activeIndex] || INTERVIEWEE_DATA[0];

  const scrollFilmstrip = (direction: 'left' | 'right') => {
    if (filmstripRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      filmstripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (filmstripRef.current) {
      const activeElement = filmstripRef.current.children[activeIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  return (
    <section
      id="interviews"
      className="relative z-10 min-h-screen w-full flex flex-col justify-center bg-[#0c0c0c] px-4 sm:px-8 lg:px-12 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background Photo Collage Slices */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-45">
        <div className="absolute -inset-x-20 top-0 bottom-0 flex justify-between items-start gap-4 -skew-x-12 scale-105">
          {Array.from({ length: 6 }).map((_, idx) => {
            const item = INTERVIEWEE_DATA[idx % INTERVIEWEE_DATA.length];
            const sliceMarginClass = idx % 2 === 1 ? 'mt-16 sm:mt-28 md:mt-36' : 'mt-0';

            return (
              <div
                key={`bg-slice-${idx}`}
                className={`relative flex-1 h-[140%] min-w-0 bg-[#0c0c0c] border-r-2 border-black overflow-hidden ${sliceMarginClass}`}
              >
                <SpeakerImage
                  src={item.image}
                  alt={`Bg slice ${idx}`}
                  name={item.name}
                  className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-125 brightness-75 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/50 via-transparent to-[#0c0c0c]/85" />
              </div>
            );
          })}
        </div>
        {/* Subtle Gold Streak Accent Lines */}
        <div className="absolute top-1/4 -left-20 w-[150%] h-[2px] bg-gradient-to-r from-transparent via-[#c9a25f]/50 to-transparent -skew-y-3 pointer-events-none" />
        <div className="absolute bottom-1/3 -left-20 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[#c9a25f]/40 to-transparent -skew-y-3 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-8 sm:gap-12">
        {/* 1. TITLE: "INTERVIEW HIGHLIGHTS" */}
        <ScrollReveal className="flex flex-col items-center justify-center text-center">
          <h2
            className="font-black uppercase tracking-tight text-[#E5C287] drop-shadow-[0_4px_30px_rgba(229,194,135,0.2)]"
            style={{
              fontFamily: 'Anton, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
              lineHeight: 1.05,
              letterSpacing: '0.03em',
            }}
          >
            INTERVIEW HIGHLIGHTS
          </h2>
        </ScrollReveal>

        {/* 2. FEATURED / ACTIVE PANEL */}
        <div className="relative rounded-2xl bg-black/25 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.div
              key={activePerson.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
            >
              {/* LEFT PROFILE BLOCK */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center sm:items-start lg:items-center xl:items-start gap-6">
                {/* Large Photo */}
                <div className="relative shrink-0 w-[240px] h-[290px] sm:w-[250px] sm:h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0a0908]">
                  <SpeakerImage
                    src={activePerson.image}
                    alt={activePerson.name}
                    name={activePerson.name}
                    className="w-full h-full object-cover object-top filter contrast-105 brightness-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                </div>

                {/* Profile Details */}
                <div className="flex flex-col justify-center text-center sm:text-left lg:text-center xl:text-left space-y-2">
                  <span className="font-mono text-xs font-extrabold uppercase tracking-[0.25em] text-[#c9a25f]">
                    ISSUE {activePerson.issue}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                    {activePerson.name}
                  </h3>
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#c9a25f]">
                    {activePerson.role}
                  </p>
                  {activePerson.company && (
                    <p className="text-xs font-medium text-gray-400">
                      {activePerson.company}
                    </p>
                  )}
                </div>
              </div>

              {/* THIN GOLD DIVIDER LINE */}
              <div className="hidden lg:block lg:col-span-1 h-full flex justify-center items-center">
                <div className="w-[1px] h-48 bg-gradient-to-b from-transparent via-[#c9a25f]/50 to-transparent mx-auto" />
              </div>
              <div className="block lg:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a25f]/40 to-transparent my-2" />

              {/* RIGHT PULL-QUOTE BLOCK */}
              <div className="lg:col-span-6 flex flex-col justify-between relative pl-0 lg:pl-2">
                <div className="relative py-4 px-2 sm:px-6">
                  {/* Oversized Gold Quotation Marks */}
                  <span className="absolute -top-8 -left-3 text-[#c9a25f]/25 font-serif text-8xl sm:text-9xl font-black leading-none select-none pointer-events-none">
                    “
                  </span>

                  <blockquote className="relative z-10 text-lg sm:text-xl md:text-2xl font-semibold italic text-white/95 leading-relaxed tracking-wide">
                    {activePerson.quote}
                  </blockquote>

                  <span className="absolute -bottom-12 right-2 text-[#c9a25f]/25 font-serif text-8xl sm:text-9xl font-black leading-none select-none pointer-events-none">
                    ”
                  </span>
                </div>

                {/* Social Handle */}
                <div className="mt-6 flex justify-end items-center border-t border-white/10 pt-4">
                  <span className="font-mono text-sm font-bold text-[#c9a25f] tracking-wide hover:underline cursor-pointer">
                    {activePerson.handle}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. HORIZONTAL SCROLLABLE FILMSTRIP */}
        <div className="relative flex flex-col gap-4">
          <div className="flex items-center justify-end px-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollFilmstrip('left')}
                className="p-2 rounded-lg border border-[#c9a25f]/30 bg-black/50 text-[#c9a25f] hover:bg-[#c9a25f] hover:text-black transition-all duration-200 cursor-pointer shadow-md"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollFilmstrip('right')}
                className="p-2 rounded-lg border border-[#c9a25f]/30 bg-black/50 text-[#c9a25f] hover:bg-[#c9a25f] hover:text-black transition-all duration-200 cursor-pointer shadow-md"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={filmstripRef}
            className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth select-none scrollbar-thin scrollbar-thumb-[#c9a25f]/40 scrollbar-track-transparent"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#c9a25f33 transparent',
            }}
          >
            {INTERVIEWEE_DATA.map((person, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={person.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group shrink-0 relative w-[130px] sm:w-[150px] flex flex-col cursor-pointer transition-all duration-300 ${
                    isActive ? 'scale-105' : 'hover:scale-[1.03] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all duration-300 bg-[#0a0908] ${
                      isActive
                        ? 'border-[#c9a25f] ring-4 ring-[#c9a25f]/30 shadow-[0_0_20px_rgba(201,162,95,0.4)]'
                        : 'border-white/10 group-hover:border-white/30'
                    }`}
                  >
                    <SpeakerImage
                      src={person.image}
                      alt={person.name}
                      name={person.name}
                      className={`w-full h-full object-cover object-top transition-all duration-300 ${
                        isActive
                          ? 'filter grayscale-0 contrast-110'
                          : 'filter grayscale contrast-125 group-hover:grayscale-0'
                      }`}
                    />

                    {/* BADGE: "PANELIST" or "ACTIVE" */}
                    <div
                      className={`absolute top-2 left-2 text-[0.6rem] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-lg transition-colors ${
                        isActive
                          ? 'bg-[#c9a25f] text-black border border-[#c9a25f]'
                          : 'bg-black/80 text-white/90 border border-white/20'
                      }`}
                    >
                      {isActive ? 'ACTIVE' : 'PANELIST'}
                    </div>

                    <div className="absolute bottom-1 right-1 bg-black/90 text-[#c9a25f] text-[0.55rem] font-mono px-1.5 py-0.5 rounded border border-[#c9a25f]/30">
                      #{person.issue}
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-col px-0.5">
                    <h5
                      className={`text-xs font-bold uppercase truncate transition-colors ${
                        isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      {person.name}
                    </h5>
                    <p className="text-[0.65rem] text-[#c9a25f] font-medium truncate mt-0.5">
                      {person.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
