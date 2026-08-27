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
  }

  // Pre-extracted full page array fallback
  const staticFullPages = Array.from(
    { length: totalCount },
    (_, i) => `/magazines/pages/issue-${issueNum}-page-${i + 1}.jpg`
  );

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

    let isCancelled = false;

    async function loadPdfPages() {
      try {
        setIsLoading(true);
        setError(null);
        setLoadingProgress('Loading magazine PDF document...');

        const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
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

  const [currentPage, setCurrentPage] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isCooldownRef = useRef(false);

  const { pages, isLoading, loadingProgress, error } = usePdfPages(pdfUrl, initialPages);

  // Responsive mobile screen check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/94 backdrop-blur-2xl p-1 sm:p-3 md:p-4 overflow-hidden animate-fadeIn select-none">
      {/* Modal Card Container */}
      <div className="relative flex flex-col items-center w-[98vw] max-w-[1450px] h-[95vh] max-h-[1080px] bg-[#0C0C0C] border border-[#B8894F]/40 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.98)] overflow-hidden">
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between w-full px-5 py-3.5 border-b border-white/10 bg-[#121212] z-30">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider text-[#E8C896] bg-black/80 rounded-md border border-[#B8894F]/50 shadow-md">
              <BookOpen className="w-3.5 h-3.5" />
              {issueLabel}
            </span>
            <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-white uppercase tracking-wider truncate max-w-xs sm:max-w-md md:max-w-lg">
              {title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E8C896]/50 rounded-full transition-all shadow-md active:scale-95"
            aria-label="Close magazine viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book Workspace Container */}
        <div
          ref={containerRef}
          className="relative flex-1 flex items-center justify-center w-full p-2 sm:p-4 md:p-6 overflow-hidden bg-[#060606] cursor-grab active:cursor-grabbing"
        >
          {/* Loading Overlay */}
          {isLoading && pages.length === 0 && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md gap-4">
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
              className={`absolute top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-2.5 bg-black/85 border border-[#B8894F]/60 rounded-full text-[#E8C896] text-xs font-mono uppercase tracking-widest shadow-2xl backdrop-blur-md transition-all duration-500 pointer-events-none ${
                hasScrolled ? 'opacity-0 scale-95' : 'opacity-100 animate-bounce'
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
              className="absolute left-3 sm:left-6 z-30 p-3 text-[#E8C896] bg-black/75 hover:bg-black border border-[#B8894F]/40 hover:border-[#E8C896] rounded-full backdrop-blur-md transition-all shadow-2xl hover:scale-110 active:scale-95"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* Center Book View with Book Spine Effect */}
          {pages.length > 0 && (
            <div className="relative flex items-center justify-center max-w-full max-h-full py-1">
              {/* Book Spine Shadow Gutter (Two-page Spread Desktop Gutter) */}
              <div className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/50 to-transparent pointer-events-none z-20 hidden md:block rounded-full" />

              {/* @ts-ignore */}
              <HTMLFlipBook
                ref={flipBookRef}
                width={560}
                height={750}
                size="stretch"
                minWidth={320}
                maxWidth={720}
                minHeight={450}
                maxHeight={960}
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
              className="absolute right-3 sm:right-6 z-30 p-3 text-[#E8C896] bg-black/75 hover:bg-black border border-[#B8894F]/40 hover:border-[#E8C896] rounded-full backdrop-blur-md transition-all shadow-2xl hover:scale-110 active:scale-95"
              aria-label="Next Page"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="flex items-center justify-between w-full px-6 py-3.5 border-t border-white/10 bg-[#121212] text-xs font-mono text-[#9A9A9A] z-30">
          <div className="flex items-center gap-2">
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

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-[#E8C896] bg-black/80 hover:bg-[#B8894F] hover:text-black border border-[#B8894F]/50 rounded-lg transition-all shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Raw PDF</span>
          </a>
        </div>

      </div>
    </div>
  );
}

export default MagazineViewer;
