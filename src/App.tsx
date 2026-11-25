import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CollectionSection } from './components/CollectionSection';
import { EnquirySection } from './components/EnquirySection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MaterialsSection } from './components/MaterialsSection';
import { ProductDetailPage } from './components/ProductDetailPage';
import { FilterOption, FinishOption, Product, PRODUCTS } from './data/catalogue';

function getProductIdFromHash(): string | null {
  const match = window.location.hash.match(/^#\/piece\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [activeProductId, setActiveProductId] = useState<string | null>(() =>
    getProductIdFromHash()
  );
  const [selectedInitialFinishId, setSelectedInitialFinishId] = useState<string>('');
  const [enquiryPieceName, setEnquiryPieceName] = useState<string>(PRODUCTS[0].name);
  const [enquiryFinishName, setEnquiryFinishName] = useState<string>(
    PRODUCTS[0].finishes[0].name
  );
  const [enquiryFocusTrigger, setEnquiryFocusTrigger] = useState<number>(0);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveProductId(getProductIdFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeProduct =
    PRODUCTS.find((product) => product.id === activeProductId) ?? null;

  const handleSelectProduct = useCallback(
    (product: Product, initialFinish?: FinishOption) => {
      setSelectedInitialFinishId(initialFinish?.id ?? product.finishes[0]?.id ?? '');
      setActiveProductId(product.id);
      window.history.pushState(null, '', `#/piece/${product.id}`);
    },
    []
  );

  const handleBackToCollection = useCallback(() => {
    setActiveProductId(null);
    window.history.pushState(null, '', '#collection');
    window.setTimeout(() => {
      const collectionEl = document.getElementById('collection');
      collectionEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }, []);

  const handleNavigateSection = useCallback(
    (sectionId: 'top' | 'collection' | 'materials' | 'enquire') => {
      const wasOnDetail = activeProductId !== null;
      if (wasOnDetail) {
        setActiveProductId(null);
      }

      window.history.pushState(null, '', `#${sectionId}`);

      window.setTimeout(
        () => {
          if (sectionId === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          const target = document.getElementById(sectionId);
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        wasOnDetail ? 80 : 10
      );
    },
    [activeProductId]
  );

  const handleEnquireFromDetail = useCallback(
    (product: Product, finish: FinishOption) => {
      setActiveProductId(null);
      setEnquiryPieceName(product.name);
      setEnquiryFinishName(finish.name);
      setEnquiryFocusTrigger((prev) => prev + 1);
      window.history.pushState(null, '', '#enquire');

      window.setTimeout(() => {
        const enquireSection = document.getElementById('enquire');
        enquireSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const nameInput = document.getElementById('enquiry-name') as HTMLInputElement | null;
        nameInput?.focus({ preventScroll: true });
      }, 90);
    },
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#302923]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#302923] focus:text-[#F7F4EE] focus:rounded-[4px]"
        >
          Skip to content
        </a>

        <Header onNavigateSection={handleNavigateSection} />

        <main id="main-content" className="flex-1">
          {activeProduct ? (
            <ProductDetailPage
              product={activeProduct}
              initialFinishId={selectedInitialFinishId}
              onBack={handleBackToCollection}
              onSelectProduct={(nextProduct) => handleSelectProduct(nextProduct)}
              onEnquire={handleEnquireFromDetail}
            />
          ) : (
            <>
              <Hero />

              <CollectionSection
                products={PRODUCTS}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                onSelectProduct={handleSelectProduct}
              />

              <MaterialsSection />

              <EnquirySection
                selectedPieceName={enquiryPieceName}
                selectedFinishName={enquiryFinishName}
                onPieceChange={setEnquiryPieceName}
                onFinishChange={setEnquiryFinishName}
                focusTrigger={enquiryFocusTrigger}
              />
            </>
          )}
        </main>

        <Footer onNavigateSection={handleNavigateSection} />
      </div>
    </MotionConfig>
  );
}
