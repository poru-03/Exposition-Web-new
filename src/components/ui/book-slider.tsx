import { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Download, ExternalLink, X, BookOpen } from 'lucide-react';
import { ShinyButton } from './shiny-button';

export interface MagazinePage {
  pageNumber: number;
  image: string;
  title?: string;
}

export interface BookSliderProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  issue: string;
  pdfUrl: string;
  coverImg: string;
  pages?: MagazinePage[];
}

export function BookSlider({
  isOpen,
  onClose,
  title,
  issue,
  pdfUrl,
  coverImg,
  pages = [],
}: BookSliderProps) {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  if (!isOpen) return null;

  // Build page list with cover page 1 and inner pages
  const displayPages = pages.length > 0 ? pages : [
    { pageNumber: 1, image: coverImg, title: 'Cover Page' },
    { pageNumber: 2, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop', title: 'Editorial & Keynote Insights' },
    { pageNumber: 3, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop', title: 'Industry Trends & AI Research' },
    { pageNumber: 4, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop', title: 'Undergraduate Projects Showcase' },
    { pageNumber: 5, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop', title: 'Executive Dialogues & Interviews' },
    { pageNumber: 6, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop', title: 'IMSSA & Department Highlights' },
  ];

  const handleNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const handlePrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const onPageFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 overflow-hidden animate-fadeIn">
      {/* Modal Container */}
      <div className="relative flex flex-col items-center w-full max-w-5xl max-h-[95vh] bg-[#0E0E0E] border border-[#B8894F]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden">
        
        {/* Top Control Header */}
        <div className="flex items-center justify-between w-full px-6 py-4 border-b border-white/10 bg-[#141414]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#E8C896] bg-black/80 rounded-md border border-[#B8894F]/50">
              <BookOpen className="w-3.5 h-3.5" />
              {issue}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider truncate max-w-xs sm:max-w-md">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <ShinyButton className="text-xs px-4 py-2">
                <span>Open Full PDF</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </ShinyButton>
            </a>
            
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close flipbook reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Flipbook Workspace */}
        <div className="relative flex items-center justify-center w-full flex-1 p-4 sm:p-8 overflow-auto min-h-[420px] sm:min-h-[520px] bg-[#080808]">
          {/* Previous Page Arrow */}
          <button
            type="button"
            onClick={handlePrevPage}
            className="absolute left-2 sm:left-6 z-30 p-3 text-white/80 hover:text-[#E8C896] bg-black/70 hover:bg-black/90 border border-white/10 hover:border-[#B8894F] rounded-full backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Pageflip Reader */}
          <div className="relative flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            {/* @ts-ignore */}
            <HTMLFlipBook
              ref={flipBookRef}
              width={340}
              height={480}
              size="stretch"
              minWidth={280}
              maxWidth={450}
              minHeight={400}
              maxHeight={620}
              maxShadowOpacity={0.6}
              drawShadow={true}
              showCover={true}
              usePortrait={true}
              startPage={0}
              onFlip={onPageFlip}
              className="rounded-lg overflow-hidden"
            >
              {displayPages.map((page) => (
                <div key={page.pageNumber} className="relative bg-[#181818] border border-white/10 overflow-hidden shadow-2xl">
                  <img
                    src={page.image}
                    alt={`Page ${page.pageNumber}`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white text-[0.65rem] font-mono">
                    <span className="truncate max-w-[180px]">{page.title ?? `Page ${page.pageNumber}`}</span>
                    <span className="px-1.5 py-0.5 bg-black/60 rounded border border-white/10">{page.pageNumber}</span>
                  </div>
                </div>
              ))}
            </HTMLFlipBook>
          </div>

          {/* Next Page Arrow */}
          <button
            type="button"
            onClick={handleNextPage}
            className="absolute right-2 sm:right-6 z-30 p-3 text-white/80 hover:text-[#E8C896] bg-black/70 hover:bg-black/90 border border-white/10 hover:border-[#B8894F] rounded-full backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95"
            aria-label="Next Page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Control Footer */}
        <div className="flex items-center justify-between w-full px-6 py-3 border-t border-white/10 bg-[#141414] text-xs font-mono text-[#9A9A9A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8894F] animate-ping" />
            <span>Page {currentPage + 1} of {displayPages.length} — Click edges or drag to flip pages</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#E8C896] hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Raw PDF</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookSlider;
