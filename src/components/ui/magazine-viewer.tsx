import { useRef, useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Download, X, BookOpen, MousePointer, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up pdfjs worker using Vite ESM worker import
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString();
} catch (e) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;
}

export interface MagazineViewerProps {
  pdfUrl: string;
  issueLabel: string;
  title: string;
  onClose: () => void;
  initialPages?: string[];
}

// In-memory cache for rendered PDF page data URLs so re-opening the magazine is instant
const pdfPageCache = new Map<string, string[]>();

export function usePdfPages(pdfUrl: string, initialPages?: string[]) {
  // Extract issue number & total pages from pdfUrl
  let issueNum = '21';
  let totalCount = 102;
  if (pdfUrl.includes('18')) {
    issueNum = '18';
    totalCount = 90;
  } else if (pdfUrl.includes('19')) {
    issueNum = '19';
    totalCount = 94;
  } else if (pdfUrl.includes('20')) {
    issueNum = '20';
    totalCount = 0; // Pre-extracted images not available for issue 20
  } else if (pdfUrl.includes('21')) {
    issueNum = '21';
    totalCount = 102;
  }

  // Pre-extracted full page array fallback (minimum 2 pages for HTMLFlipBook layout compatibility)
  const staticFullPages = totalCount > 0
    ? Array.from(
        { length: totalCount },
        (_, i) => `/magazines/pages/issue-${issueNum}-page-${i + 1}.jpg`
      )
    : [`/magazines/issue-${issueNum}-cover.jpg`, `/magazines/issue-${issueNum}-cover.jpg`];

  const [pages, setPages] = useState<string[]>(() => pdfPageCache.get(pdfUrl) || initialPages || staticFullPages);
  const [isLoading, setIsLoading] = useState<boolean>(!pdfPageCache.has(pdfUrl) && (!pages || pages.length === 0));
  const [loadingProgress, setLoadingProgress] = useState<string>('Initializing PDF...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    // Return cached pages if available
    if (pdfPageCache.has(pdfUrl)) {
      setPages(pdfPageCache.get(pdfUrl)!);
      setIsLoading(false);
      return;
    }

    setPages(initialPages || staticFullPages);
    setIsLoading(true);
    setError(null);

    let isCancelled = false;

    async function loadPdfPages() {
      try {
        setLoadingProgress('Loading magazine PDF document...');

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          disableRange: true,
          disableStream: true,
        });
        const pdf = await loadingTask.promise;
        const totalPages = pdf.numPages;

        if (isCancelled) return;

        const renderedPages: string[] = [];

        // Render Page 1 (Cover) & Page 2 immediately for instant interactive flipbook startup
        const initialCount = Math.min(totalPages, 6);
        for (let pageNum = 1; pageNum <= initialCount; pageNum++) {
          if (isCancelled) return;
          setLoadingProgress(`Rendering initial page ${pageNum} of ${totalPages}...`);
          const dataUrl = await renderSinglePage(pdf, pageNum);
          renderedPages.push(dataUrl);
        }

        if (isCancelled) return;
        setPages([...renderedPages, ...staticFullPages.slice(initialCount)]);
        setIsLoading(false); // First pages ready! Flipbook presents immediately!

        // Render remaining pages progressively in background
        for (let pageNum = initialCount + 1; pageNum <= totalPages; pageNum++) {
          if (isCancelled) return;
          setLoadingProgress(`Loading page ${pageNum} of ${totalPages}...`);
          const dataUrl = await renderSinglePage(pdf, pageNum);
          renderedPages.push(dataUrl);
          if (!isCancelled) {
            setPages([...renderedPages, ...staticFullPages.slice(pageNum)]);
          }
        }

        // Cache completed rendering
        if (!isCancelled) {
          pdfPageCache.set(pdfUrl, renderedPages);
        }
      } catch (err: any) {
        console.warn('pdf.js rendering note, using pre-extracted page images:', err);
        if (!isCancelled) {
          setPages(staticFullPages);
          pdfPageCache.set(pdfUrl, staticFullPages);
          setIsLoading(false);
        }
      }
    }

    loadPdfPages();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  return { pages, isLoading, loadingProgress, error };
}

// Render a single PDF page to canvas and export high-quality JPEG data URL
async function renderSinglePage(pdfDoc: any, pageNum: number): Promise<string> {
  const page = await pdfDoc.getPage(pageNum);
  const scale = 1.8; // High DPI crisp text rendering
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  if (!context) {
    throw new Error('Canvas context unavailable');
  }

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
    canvas: canvas,
  };

  await page.render(renderContext).promise;
  return canvas.toDataURL('image/jpeg', 0.92);
}

export function MagazineViewer({
  pdfUrl,
  issueLabel,
  title,
  onClose,
  initialPages,
}: MagazineViewerProps) {
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bookDimensions, setBookDimensions] = useState({ width: 560, height: 750 });
  const isCooldownRef = useRef(false);

  const { pages, isLoading, loadingProgress, error } = usePdfPages(pdfUrl, initialPages);

  // Responsive size & aspect ratio calculation
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (bookContainerRef.current) {
        const rect = bookContainerRef.current.getBoundingClientRect();
        // Give minimal padding around the book to fill full height available
        const availHeight = Math.max(300, rect.height - 12);
        const availWidth = Math.max(300, rect.width - 24);

        // Aspect ratio of a single page (standard A4/Magazine format ~ 1:1.414 -> width/height ratio = 0.707)
        const pageAspectRatio = 1 / 1.414;

        // For desktop two-page spread: aspect ratio is 2 * pageAspectRatio
        // For mobile single page: aspect ratio is pageAspectRatio
        const spreadRatio = mobile ? pageAspectRatio : pageAspectRatio * 2;

        // Height-first sizing: fill full height
        let calculatedHeight = availHeight;
        let calculatedWidth = calculatedHeight * spreadRatio;

        // If calculated width exceeds available width, clamp width and adjust height accordingly
        if (calculatedWidth > availWidth) {
          calculatedWidth = availWidth;
          calculatedHeight = calculatedWidth / spreadRatio;
        }

        // For HTMLFlipBook, page width is single-page width
        const singlePageWidth = mobile ? calculatedWidth : calculatedWidth / 2;

        setBookDimensions({
          width: Math.floor(singlePageWidth),
          height: Math.floor(calculatedHeight),
        });
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (bookContainerRef.current) {
      resizeObserver.observe(bookContainerRef.current);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Page turn helper functions
  const handleNextPage = useCallback(() => {
    if (flipBookRef.current) {
      try {
        flipBookRef.current.pageFlip().flipNext();
      } catch (err) {
        // Fallback catch
      }
    }
  }, []);

  const handlePrevPage = useCallback(() => {
    if (flipBookRef.current) {
      try {
        flipBookRef.current.pageFlip().flipPrev();
      } catch (err) {
        // Fallback catch
      }
    }
  }, []);

  // Wheel / Scroll event handler for page turning with throttling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 12) return;

      if (!hasScrolled) {
        setHasScrolled(true);
      }

      if (isCooldownRef.current) return;

      isCooldownRef.current = true;
      if (e.deltaY > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }

      setTimeout(() => {
        isCooldownRef.current = false;
      }, 600);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleNextPage, handlePrevPage, hasScrolled]);

  const onFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
    if (!hasScrolled) {
      setHasScrolled(true);
    }
  };

  const totalPages = pages.length;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col h-screen w-screen bg-[#050508] overflow-hidden animate-fadeIn select-none">
      {/* Animated Ambient Background (Pure CSS Gradient & Floating Glow) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Animated Gradient Mesh */}
        <div className="absolute -inset-[50%] opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(184,137,79,0.25),transparent_60%),radial-gradient(circle_at_20%_20%,rgba(232,200,150,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(184,137,79,0.15),transparent_50%)] animate-[spin_40s_linear_infinite]" />
        
        {/* Slow Pulsing Amber Ambient Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#B8894F]/10 rounded-full blur-[120px] animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-[#E8C896]/10 rounded-full blur-[140px] animate-[pulse_16s_ease-in-out_infinite_2s]" />
      </div>

      {/* Header Bar - Full Width Overlay */}
      <div className="relative flex items-center justify-between w-full px-5 py-3.5 border-b border-white/10 bg-black/60 backdrop-blur-xl z-30 shrink-0">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#E8C896] bg-black/80 rounded-md border border-[#B8894F]/50 shadow-md">
            <BookOpen className="w-3.5 h-3.5" />
            {issueLabel}
          </span>
          <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-white uppercase tracking-wider truncate max-w-xs sm:max-w-md md:max-w-lg">
            {title}
          </h3>

          {/* Page Counter Indicator in Header */}
          <div className="hidden sm:flex items-center gap-2 ml-2 px-3 py-1 bg-black/60 border border-white/10 rounded-full text-xs font-mono text-[#9A9A9A]">
            <span className="w-2 h-2 rounded-full bg-[#B8894F] animate-pulse" />
            <span className="text-[#E8C896] font-semibold">
              {totalPages === 0
                ? 'Loading Pages...'
                : isMobile
                  ? `Page ${currentPage + 1} of ${totalPages}`
                  : currentPage === 0
                    ? `Page 1 of ${totalPages} (Cover)`
                    : `Pages ${currentPage} - ${Math.min(currentPage + 1, totalPages)} of ${totalPages}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-[#E8C896] bg-black/80 hover:bg-[#B8894F] hover:text-black border border-[#B8894F]/50 rounded-lg transition-all shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download Raw PDF</span>
            <span className="sm:hidden">Download</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E8C896]/50 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
            aria-label="Close magazine viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Workspace Container - Takes All Available Vertical Height directly on screen */}
      <div
        ref={containerRef}
        className="relative flex-1 flex items-center justify-center w-full overflow-hidden z-10 cursor-grab active:cursor-grabbing py-1 px-4 md:px-6"
      >
        {/* Ref box to measure exact available container bounds */}
        <div ref={bookContainerRef} className="relative w-full h-full flex items-center justify-center">
          {/* Loading Overlay */}
          {isLoading && pages.length === 0 && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md gap-4 rounded-xl">
              <Loader2 className="w-10 h-10 text-[#E8C896] animate-spin" />
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-[#E8C896]">
                  Loading Magazine...
                </span>
                <span className="text-xs font-mono text-[#9A9A9A]">{loadingProgress}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && pages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 text-center p-6 text-red-400 font-mono text-sm">
              <p>{error}</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#B8894F] text-black font-bold rounded-lg uppercase tracking-wider text-xs hover:bg-[#E8C896]"
              >
                Open PDF Directly
              </a>
            </div>
          )}

          {/* Scroll Hint Overlay */}
          {!isLoading && pages.length > 0 && (
            <div
              className={`absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2.5 bg-black/85 border border-[#B8894F]/60 rounded-full text-[#E8C896] text-xs font-mono uppercase tracking-widest shadow-2xl backdrop-blur-md transition-all duration-500 pointer-events-none ${hasScrolled ? 'opacity-0 scale-95' : 'opacity-100 animate-bounce'
                }`}
            >
              <MousePointer className="w-4 h-4 animate-pulse text-[#E8C896]" />
              <span>Scroll to turn pages</span>
            </div>
          )}

          {/* Left Arrow Click Zone */}
          {pages.length > 0 && (
            <button
              type="button"
              onClick={handlePrevPage}
              className="absolute left-2 sm:left-6 z-30 p-3 text-[#E8C896] bg-black/75 hover:bg-black border border-[#B8894F]/40 hover:border-[#E8C896] rounded-full backdrop-blur-md transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* Center Book View with Dynamic Dimensions & Spine Effect */}
          {pages.length > 0 && (
            <div className="relative flex items-center justify-center">
              {/* Book Spine Shadow Gutter */}
              <div className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/60 to-transparent pointer-events-none z-20 hidden md:block rounded-full" />

              {/* @ts-ignore */}
              <HTMLFlipBook
                key={`${bookDimensions.width}-${bookDimensions.height}`}
                ref={flipBookRef}
                width={bookDimensions.width}
                height={bookDimensions.height}
                size="fixed"
                maxShadowOpacity={0.65}
                drawShadow={true}
                showCover={true}
                usePortrait={isMobile}
                startPage={0}
                onFlip={onFlip}
                flippingTime={700}
                useMouseEvents={true}
                className="shadow-[0_35px_100px_rgba(0,0,0,0.98)] rounded-lg overflow-hidden"
              >
                {pages.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="relative w-full h-full bg-[#141414] overflow-hidden border border-white/10"
                  >
                    <img
                      src={imgSrc}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable={false}
                    />
                    {/* Subtle Page Edge Gradient */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/20 via-transparent to-black/20" />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          )}

          {/* Right Arrow Click Zone */}
          {pages.length > 0 && (
            <button
              type="button"
              onClick={handleNextPage}
              className="absolute right-2 sm:right-6 z-30 p-3 text-[#E8C896] bg-black/75 hover:bg-black border border-[#B8894F]/40 hover:border-[#E8C896] rounded-full backdrop-blur-md transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next Page"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MagazineViewer;

