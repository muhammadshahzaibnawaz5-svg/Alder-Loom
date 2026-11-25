interface FooterProps {
  onNavigateSection: (sectionId: 'top' | 'collection' | 'materials' | 'enquire') => void;
}

export function Footer({ onNavigateSection }: FooterProps) {
  return (
    <footer className="bg-[#302923] text-[#F7F4EE]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#F7F4EE]/18">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('top');
            }}
            className="font-serif text-[27px] leading-none text-[#F7F4EE] whitespace-nowrap shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            Alder &amp; Loom
          </a>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-7 sm:gap-9 text-[14px] tracking-[0.01em]"
          >
            <a
              href="#collection"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('collection');
              }}
              className="py-1 text-[#F7F4EE]/88 hover:text-[#F7F4EE] underline-offset-4 hover:underline whitespace-nowrap cursor-pointer transition-colors duration-200"
            >
              Collection
            </a>
            <a
              href="#materials"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('materials');
              }}
              className="py-1 text-[#F7F4EE]/88 hover:text-[#F7F4EE] underline-offset-4 hover:underline whitespace-nowrap cursor-pointer transition-colors duration-200"
            >
              Materials
            </a>
            <a
              href="#enquire"
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection('enquire');
              }}
              className="py-1 text-[#F7F4EE]/88 hover:text-[#F7F4EE] underline-offset-4 hover:underline whitespace-nowrap cursor-pointer transition-colors duration-200"
            >
              Enquire
            </a>
          </nav>
        </div>

        <div className="pt-6 text-[13px] text-[#F7F4EE]/70">
          <p>&copy; {new Date().getFullYear()} Alder &amp; Loom</p>
        </div>
      </div>
    </footer>
  );
}
