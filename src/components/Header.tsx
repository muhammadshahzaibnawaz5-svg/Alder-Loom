import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';

interface HeaderProps {
  onNavigateSection: (sectionId: 'top' | 'collection' | 'materials' | 'enquire') => void;
}

const NAV_LINKS = [
  { label: 'Collection', id: 'collection' as const },
  { label: 'Materials', id: 'materials' as const },
  { label: 'Enquire', id: 'enquire' as const },
];

export function Header({ onNavigateSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      wasOpenRef.current = true;
      const t = window.setTimeout(() => firstMobileLinkRef.current?.focus(), 40);
      return () => window.clearTimeout(t);
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      toggleBtnRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-30 transition-colors duration-300 border-b ${
        scrolled
          ? 'bg-[#F7F4EE]/95 backdrop-blur-md border-[#E5DCCE]'
          : 'bg-[#F7F4EE]/90 backdrop-blur-sm border-[#E5DCCE]/70'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 h-[68px] flex items-center justify-between gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('top');
          }}
          className="font-serif text-[27px] leading-none tracking-[-0.015em] text-[#302923] whitespace-nowrap shrink-0 cursor-pointer hover:opacity-75 transition-opacity duration-200"
        >
          Alder &amp; Loom
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-10 text-[14px] tracking-[0.01em] text-[#302923]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection(link.id);
              }}
              className="relative py-2 whitespace-nowrap shrink-0 cursor-pointer text-[#302923]/82 hover:text-[#302923] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[1px] after:w-full after:bg-[#9B573E] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigateSection('enquire')}
            className="min-h-[40px] px-5 py-2 bg-[#302923] text-[#F7F4EE] text-[13px] font-medium tracking-[0.02em] rounded-[4px] whitespace-nowrap shrink-0 cursor-pointer hover:bg-[#463B32] transition-colors duration-200"
          >
            Book Appointment
          </button>
        </div>

        <button
          ref={toggleBtnRef}
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] -mr-2 text-[#302923] cursor-pointer hover:bg-[#E5DCCE]/50 rounded-[4px] transition-colors duration-200"
        >
          {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[2px] bg-[#9B573E] origin-left"
      />

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[#E5DCCE] bg-[#F7F4EE] px-5 py-3"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link.id}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigateSection(link.id);
                  }}
                  className="min-h-[44px] flex items-center justify-between py-2.5 text-[15px] text-[#302923] border-b border-[#E5DCCE]/60 last:border-b-0 cursor-pointer hover:text-[#9B573E] transition-colors duration-150"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true" className="text-[12px] tabular-nums text-[#302923]/45">
                    0{index + 1}
                  </span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
