import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Search,
  MessageCircleQuestion,
  Send,
} from 'lucide-react';
import FadeIn from '../components/FadeIn';

export type FAQItem = {
  id: string;
  number: string;
  category: 'General' | 'Competitions' | 'Speakers & Magazine' | 'Partnerships';
  question: string;
  answer: string;
  highlights?: string[];
};

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    number: '01',
    category: 'General',
    question: 'What is Exposition, and what makes the 21st Edition significant?',
    answer:
      'Exposition is the premier annual technology symposium and magazine organized and published by the Department of Industrial Management (MIT), Faculty of Science, University of Kelaniya. The 21st Edition commemorates over two decades of bridging academic brilliance with enterprise innovation, featuring spatial computing dialogues, AI summits, and visionary industry keynotes.',
    highlights: ['21st Milestone Edition', 'University of Kelaniya', 'MIT Department'],
  },
  {
    id: 'faq-2',
    number: '02',
    category: 'Competitions',
    question: 'Who is eligible to participate in TechEvent Hub hackathons and competitions?',
    answer:
      'Our TechEvent Hub competitions (including Expose Hack, IdeaniX, CodeQuest, and TechTriad) are open to university undergraduates, polytechnic students, and school innovators across Sri Lanka and international partner universities. Both individual and multi-disciplinary teams of 3–5 members can register through our official portals.',
    highlights: ['Undergraduates & Innovators', 'Teams of 3–5 Members', 'Cash Prizes & Incubation'],
  },
  {
    id: 'faq-3',
    number: '03',
    category: 'Speakers & Magazine',
    question: 'How can delegates access keynote speaker sessions and panel discussions?',
    answer:
      'The symposium operates in a hybrid format. In-person delegate access is hosted at the University of Kelaniya auditorium with pre-registered access passes, while all keynote speeches, fireside chats, and panel debates are broadcast live globally in high-definition across our official YouTube, LinkedIn, and Facebook channels.',
    highlights: ['Hybrid In-Person & Virtual', 'Global HD Live Broadcast', 'Interactive Q&A Sessions'],
  },
  {
    id: 'faq-4',
    number: '04',
    category: 'Speakers & Magazine',
    question: 'Where can I read or download the official Exposition Magazine issues?',
    answer:
      'Digital editions of current and archival Exposition magazines (from Issue 01 to the upcoming 21st Edition) are freely accessible through our digital repository. Physical, collector-grade printed copies are distributed to corporate partners, keynote luminaries, university libraries, and registered VIP delegates.',
    highlights: ['Full Digital Archive', 'Collector-Grade Print Copies', 'Peer-Reviewed Articles'],
  },
  {
    id: 'faq-5',
    number: '05',
    category: 'Partnerships',
    question: 'How can enterprises and startups become official corporate partners or sponsors?',
    answer:
      'Organizations can partner with Exposition across Platinum, Gold, Silver, and Bronze tiers. Benefits include prominent brand integration, keynote spotlight opportunities, tech booth installations, direct recruitment access to top-tier engineering talent, and featured editorial coverage. You can download the Partnership Guide or submit an inquiry through our Partner console.',
    highlights: ['4 Tiered Sponsorship Levels', 'Talent Recruitment Pipeline', 'Executive Brand Visibility'],
  },
  {
    id: 'faq-6',
    number: '06',
    category: 'Speakers & Magazine',
    question: 'Are the executive interview highlights available on-demand after the event?',
    answer:
      'Yes, all recorded executive dialogues, C-level spotlights, and founder interviews are permanently archived on our media portal and official YouTube channel. Key takeaways, quotes, and transcript highlights are also published in the magazine and social media feeds.',
    highlights: ['Permanent On-Demand Archive', 'YouTube Video Highlights', 'Editorial Transcripts'],
  },
  {
    id: 'faq-7',
    number: '07',
    category: 'General',
    question: 'Is registration free for student delegates and event visitors?',
    answer:
      'Yes, general symposium attendance and live stream access are completely free of charge. Pre-registration is required for in-person seating due to venue capacity limits. Competition tracks have individual team registration milestones detailed in the TechEvent Hub section.',
    highlights: ['100% Free Public Access', 'Seat Pre-Registration Required', 'Digital Certificate of Attendance'],
  },
  {
    id: 'faq-8',
    number: '08',
    category: 'General',
    question: 'How can I contact the organizing committee or editorial board directly?',
    answer:
      'You can reach out directly to our 18 department heads (Editor-in-Chief, Event Chair, Tech Leads, Partnership Managers) via their Email, LinkedIn, and WhatsApp links in the Our Team section, or email us at exposition@kln.ac.lk.',
    highlights: ['Direct WhatsApp & Email', 'Editorial Board Support', 'Rapid Inquiries Response'],
  },
];

export default function QASection() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.highlights &&
          item.highlights.some((h) =>
            h.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="faq"
      className="relative z-10 rounded-t-[40px] bg-white px-[5%] py-20 sm:rounded-t-[50px] sm:py-24 md:rounded-t-[60px] md:py-32 text-[#0C0C0C]"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center mb-14 sm:mb-18 max-w-4xl mx-auto">
        <FadeIn
          as="span"
          delay={0}
          y={20}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-black/75 backdrop-blur-md"
        >
          <MessageCircleQuestion className="h-3.5 w-3.5 text-indigo-600" />
          Everything You Need to Know
        </FadeIn>

        <FadeIn
          as="h2"
          delay={0.1}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 76px)' }}
        >
          Frequently Asked Questions
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.2}
          y={20}
          className="mt-6 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-black/70 font-light"
        >
          Explore comprehensive answers regarding symposium registration, hackathon tracks,
          keynote streams, magazine publications, and corporate partnerships for Exposition 21st Edition.
        </FadeIn>

        {/* Search Input Bar */}
        <FadeIn delay={0.25} y={20} className="w-full max-w-xl mt-8">
          <div className="relative flex items-center w-full">
            <Search className="absolute left-4 size-4 text-black/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, hackathons, delegate passes..."
              className="w-full rounded-full border border-black/15 bg-black/[0.03] py-3.5 pl-11 pr-4 text-xs sm:text-sm text-black placeholder:text-black/40 focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-xs font-mono text-black/40 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </FadeIn>

        {/* Category Filter Pills */}
        <FadeIn delay={0.3} y={20} className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {(['All', 'General', 'Competitions', 'Speakers & Magazine', 'Partnerships'] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-black/5 text-black/60 border-transparent hover:border-black/20 hover:text-black'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </FadeIn>
      </div>

      {/* ================= ACCORDION QUESTIONS LIST ================= */}
      <div className="mx-auto max-w-4xl space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-black/15 rounded-3xl p-8">
            <HelpCircle className="size-10 text-black/30 mx-auto mb-3" />
            <h4 className="text-base font-bold text-black">No matching questions found</h4>
            <p className="text-xs text-black/50 mt-1">
              Try searching with different keywords or switch the category filter.
            </p>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-black/20 bg-black/[0.02] shadow-sm'
                    : 'border-black/10 bg-transparent hover:border-black/25'
                }`}
              >
                {/* Accordion Header Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-5 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-6 min-w-0">
                    <span className="font-mono text-sm sm:text-base font-bold text-black/40 tabular-nums shrink-0 pt-0.5 sm:pt-0">
                      {faq.number}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[0.65rem] font-mono font-semibold uppercase tracking-widest text-indigo-600">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-black leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`size-8 sm:size-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 border ${
                      isOpen
                        ? 'rotate-180 bg-black text-white border-black'
                        : 'bg-black/5 text-black/60 border-black/10 hover:border-black/30'
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {/* Accordion Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-black/10 space-y-4">
                        <p className="text-xs sm:text-sm md:text-base text-black/75 leading-relaxed font-light pl-6 sm:pl-10">
                          {faq.answer}
                        </p>

                        {faq.highlights && (
                          <div className="flex flex-wrap items-center gap-2 pl-6 sm:pl-10 pt-2">
                            {faq.highlights.map((highlight, hIdx) => (
                              <span
                                key={hIdx}
                                className="inline-flex items-center gap-1 rounded-md bg-black/5 border border-black/10 px-2.5 py-1 text-[0.68rem] font-medium text-black/80"
                              >
                                <Sparkles className="size-2.5 text-indigo-600" />
                                {highlight}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Still Have Questions Bar */}
      <div className="mx-auto max-w-4xl mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl bg-black text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 text-center sm:text-left">
          <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight">
            Still have questions about Exposition?
          </h4>
          <p className="text-xs sm:text-sm text-white/60 font-light">
            Our organizing committee is here to assist you with any inquiries or delegate requirements.
          </p>
        </div>

        <a
          href="mailto:exposition@kln.ac.lk"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-black hover:bg-[#D7E2EA] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all shrink-0"
        >
          <Send className="size-3.5 text-rose-500" />
          <span>Ask Our Team</span>
        </a>
      </div>
    </section>
  );
}
