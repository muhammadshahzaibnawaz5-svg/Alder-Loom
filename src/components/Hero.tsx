import { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { HERO_DATA, HERO_SLIDES } from '../data/catalogue';
import { ResilientImage } from './ResilientImage';

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ADVANCE_MS = 4500;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex]);

  const activeSlide = HERO_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="top" aria-labelledby="hero-heading" className="w-full bg-[#F7F4EE]">
      <div className="relative w-full overflow-hidden bg-[#E5DCCE] aspect-[4/3] sm:aspect-auto sm:h-[78vh] sm:min-h-[540px] sm:max-h-[780px]">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0 w-full h-full"
          >
            <ResilientImage
              src={activeSlide.image}
              alt={activeSlide.alt}
              loading="eager"
              fallbackLabel="Cove Modular"
              className="w-full h-full object-cover object-[52%_65%]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Measured scrim for crisp WCAG AA legibility over sunlit room on sm+ */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#302923]/82 via-[#302923]/28 to-transparent pointer-events-none z-10"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#302923]/55 via-[#302923]/15 to-transparent pointer-events-none z-10"
        />

        {/* Overlay Editorial Content (sm+) */}
        <div className="hidden sm:flex absolute inset-0 items-end z-20">
          <div className="w-full max-w-[1280px] mx-auto px-8 lg:px-12 pb-12 lg:pb-16 flex items-end justify-between gap-8">
            <div className="max-w-[520px]">
              <div className="overflow-hidden">
                <motion.h1
                  id="hero-heading"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
                  className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-[1.0] tracking-[-0.02em] text-[#F7F4EE] text-balance"
                >
                  {HERO_DATA.headline}
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                className="mt-4 text-[16px] leading-[1.55] text-[#F7F4EE]/92 max-w-[38ch]"
              >
                {HERO_DATA.subcopy}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.38, ease: EASE }}
                className="mt-7"
              >
                <a
                  href="#collection"
                  className="group inline-flex items-center gap-2.5 min-h-[44px] px-6 py-3 bg-[#302923] text-[#F7F4EE] border border-[#F7F4EE]/25 text-[14px] font-medium tracking-[0.01em] rounded-[4px] whitespace-nowrap shrink-0 cursor-pointer hover:bg-[#463B32] transition-colors duration-200"
                >
                  <span>{HERO_DATA.ctaLabel}</span>
                  <ArrowRight
                    size={15}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                  />
                </a>
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-3 pb-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous showroom image"
                className="w-10 h-10 rounded-full border border-[#F7F4EE]/40 bg-[#302923]/45 text-[#F7F4EE] flex items-center justify-center cursor-pointer hover:bg-[#302923]/80 transition-colors duration-200"
              >
                <ChevronLeft size={16} strokeWidth={1.6} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next showroom image"
                className="w-10 h-10 rounded-full border border-[#F7F4EE]/40 bg-[#302923]/45 text-[#F7F4EE] flex items-center justify-center cursor-pointer hover:bg-[#302923]/80 transition-colors duration-200"
              >
                <ChevronRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Prev/Next Overlay Controls */}
        <div className="sm:hidden absolute bottom-3 right-3 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous showroom image"
            className="w-9 h-9 rounded-full border border-[#F7F4EE]/40 bg-[#302923]/55 text-[#F7F4EE] flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft size={15} strokeWidth={1.6} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next showroom image"
            className="w-9 h-9 rounded-full border border-[#F7F4EE]/40 bg-[#302923]/55 text-[#F7F4EE] flex items-center justify-center cursor-pointer"
          >
            <ChevronRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Stacked Editorial Copy */}
      <div className="sm:hidden px-5 pt-6 pb-7 border-b border-[#E5DCCE]">
        <h1 className="font-serif text-[42px] leading-[1.02] tracking-[-0.02em] text-[#302923] text-balance">
          {HERO_DATA.headline}
        </h1>
        <p className="mt-3 text-[15px] leading-[1.58] text-[#302923]/80">
          {HERO_DATA.subcopy}
        </p>
        <div className="mt-5">
          <a
            href="#collection"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#302923] text-[#F7F4EE] text-[14px] font-medium rounded-[4px] cursor-pointer"
          >
            <span>{HERO_DATA.ctaLabel}</span>
            <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Caption & Live Auto-Scroll Progress Indicator Bar */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-3.5 flex items-center justify-between gap-4 text-[13px] text-[#302923]/75">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeSlide.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {activeSlide.caption}
          </motion.span>
        </AnimatePresence>

        <div role="group" aria-label="Hero image slides" className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show ${slide.caption}`}
                aria-pressed={isCurrent}
                onClick={() => setActiveIndex(idx)}
                className="min-w-[28px] min-h-[28px] flex items-center justify-center cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="relative block h-[2px] w-7 bg-[#E5DCCE] overflow-hidden"
                >
                  {isCurrent && (
                    <motion.span
                      key={`progress-${activeIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                      className="absolute inset-0 bg-[#9B573E] origin-left"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
