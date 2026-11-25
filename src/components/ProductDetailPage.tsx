import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { FinishOption, formatUsdPrice, Product, PRODUCTS } from '../data/catalogue';
import { ResilientImage } from './ResilientImage';

interface ProductDetailPageProps {
  product: Product;
  initialFinishId?: string;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onEnquire: (product: Product, finish: FinishOption) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductDetailPage({
  product,
  initialFinishId,
  onBack,
  onSelectProduct,
  onEnquire,
}: ProductDetailPageProps) {
  const [selectedFinishId, setSelectedFinishId] = useState<string>(
    initialFinishId || product.finishes[0]?.id || ''
  );

  useEffect(() => {
    setSelectedFinishId(initialFinishId || product.finishes[0]?.id || '');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [product, initialFinishId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const activeFinish =
    product.finishes.find((finish) => finish.id === selectedFinishId) ??
    product.finishes[0];

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-20 sm:pt-10 sm:pb-24"
    >
      {/* Top Back Bar */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#E5DCCE]">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 min-h-[44px] pr-4 text-[14px] text-[#302923] cursor-pointer hover:text-[#9B573E] transition-colors duration-200"
        >
          <ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" />
          <span>Back to collection</span>
        </button>

        <span className="text-[13px] text-[#302923]/60 hidden sm:inline">
          {product.category} &middot; {product.name}
        </span>
      </div>

      {/* Main Two-Column Product Page */}
      <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-6">
          <div className="w-full aspect-square bg-[#E5DCCE]/40 border border-[#E5DCCE] overflow-hidden">
            <ResilientImage
              src={product.image}
              alt={product.alt}
              loading="eager"
              fallbackLabel={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:sticky lg:top-24 flex flex-col">
          <p className="text-[12px] uppercase tracking-[0.08em] text-[#302923]/60">
            {product.category}
          </p>

          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-[#E5DCCE]">
            <h1 className="font-serif text-[clamp(2.25rem,3.6vw,3.15rem)] leading-[1.06] tracking-[-0.015em] text-[#302923]">
              {product.name}
            </h1>
            <p className="text-[18px] font-medium text-[#302923] tabular-nums whitespace-nowrap">
              From {formatUsdPrice(product.startingPrice)}
            </p>
          </div>

          <p className="mt-5 text-[15px] leading-[1.65] text-[#302923]/82 max-w-[48ch]">
            {product.description}
          </p>

          {/* Dimensions */}
          <div className="mt-7 pt-6 border-t border-[#E5DCCE]">
            <h2 className="text-[12px] uppercase tracking-[0.07em] text-[#302923]/60 mb-3">
              Dimensions
            </h2>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
              <div>
                <dt className="text-[12px] text-[#302923]/60">Width</dt>
                <dd className="mt-0.5 text-[14px] text-[#302923] tabular-nums">
                  {product.dimensions.width}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] text-[#302923]/60">Depth</dt>
                <dd className="mt-0.5 text-[14px] text-[#302923] tabular-nums">
                  {product.dimensions.depth}
                </dd>
              </div>
              <div>
                <dt className="text-[12px] text-[#302923]/60">Height</dt>
                <dd className="mt-0.5 text-[14px] text-[#302923] tabular-nums">
                  {product.dimensions.height}
                </dd>
              </div>
              {product.dimensions.seatHeight && (
                <div>
                  <dt className="text-[12px] text-[#302923]/60">Seat</dt>
                  <dd className="mt-0.5 text-[14px] text-[#302923] tabular-nums">
                    {product.dimensions.seatHeight}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Available Finishes */}
          <div className="mt-7 pt-6 border-t border-[#E5DCCE]">
            <div className="flex items-baseline justify-between gap-4 mb-3">
              <h2 className="text-[12px] uppercase tracking-[0.07em] text-[#302923]/60">
                Available finishes
              </h2>
              {activeFinish && (
                <span className="text-[13px] font-medium text-[#9B573E]">
                  {activeFinish.name}
                </span>
              )}
            </div>

            <div role="group" aria-label="Select finish" className="grid grid-cols-1 gap-2.5">
              {product.finishes.map((finish) => {
                const isSelected = finish.id === activeFinish?.id;
                return (
                  <button
                    key={finish.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedFinishId(finish.id)}
                    className={`w-full min-h-[48px] px-4 py-2.5 flex items-center justify-between gap-3 text-left rounded-[4px] border cursor-pointer transition-colors duration-150 ${
                      isSelected
                        ? 'bg-[#E5DCCE]/55 border-[#9B573E]'
                        : 'bg-transparent border-[#E5DCCE] hover:bg-[#E5DCCE]/30'
                    }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <span
                        aria-hidden="true"
                        className="w-5 h-5 rounded-full shrink-0 border border-[#302923]/20"
                        style={{ backgroundColor: finish.swatchHex }}
                      />
                      <span className="min-w-0">
                        <span className="block text-[14px] font-medium text-[#302923]">
                          {finish.name}
                        </span>
                        <span className="block text-[12px] text-[#302923]/68 truncate">
                          {finish.note}
                        </span>
                      </span>
                    </span>
                    {isSelected && (
                      <Check
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="text-[#9B573E] shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5DCCE]">
            <button
              type="button"
              onClick={() => {
                if (activeFinish) {
                  onEnquire(product, activeFinish);
                }
              }}
              className="w-full min-h-[48px] px-6 py-3 bg-[#302923] text-[#F7F4EE] text-[15px] font-medium tracking-[0.01em] rounded-[4px] cursor-pointer hover:bg-[#463B32] transition-colors duration-200"
            >
              Enquire about this piece
            </button>
          </div>
        </div>
      </div>

      {/* Related Pieces */}
      <section aria-labelledby="related-heading" className="mt-20 pt-12 border-t border-[#E5DCCE]">
        <h2
          id="related-heading"
          className="font-serif text-[28px] leading-[1.1] text-[#302923] mb-8"
        >
          Also in the collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {relatedProducts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectProduct(item)}
              className="group text-left bg-[#F7F4EE] border border-[#E5DCCE] cursor-pointer hover:border-[#302923]/30 transition-colors duration-200"
            >
              <div className="relative w-full aspect-square bg-[#E5DCCE]/45 overflow-hidden">
                <ResilientImage
                  src={item.image}
                  alt={item.alt}
                  fallbackLabel={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F4EE]/95 text-[#302923] text-[12px] opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-250"
                >
                  <span>View</span>
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </span>
              </div>
              <div className="p-4 flex items-baseline justify-between gap-3">
                <span className="font-serif text-[20px] text-[#302923] group-hover:text-[#9B573E] transition-colors duration-200 truncate">
                  {item.name}
                </span>
                <span className="text-[13px] text-[#302923] tabular-nums whitespace-nowrap">
                  From {formatUsdPrice(item.startingPrice)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
