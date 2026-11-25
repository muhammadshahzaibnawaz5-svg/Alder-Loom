import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  FILTER_OPTIONS,
  FilterOption,
  FinishOption,
  formatUsdPrice,
  Product,
} from '../data/catalogue';
import { ResilientImage } from './ResilientImage';

interface CollectionSectionProps {
  products: Product[];
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  onSelectProduct: (product: Product, initialFinish?: FinishOption) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function CollectionSection({
  products,
  activeFilter,
  onFilterChange,
  onSelectProduct,
}: CollectionSectionProps) {
  const [cardFinishes, setCardFinishes] = useState<Record<string, string>>({});

  const filteredProducts =
    activeFilter === 'All'
      ? products
      : products.filter((product) => product.category === activeFilter);

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-20 sm:pt-14 sm:pb-24 border-t border-[#E5DCCE]"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-6 border-b border-[#E5DCCE]"
      >
        <h2
          id="collection-heading"
          className="font-serif text-[clamp(2rem,3.4vw,2.85rem)] leading-[1.05] tracking-[-0.015em] text-[#302923] text-balance"
        >
          The collection
        </h2>

        <div
          role="group"
          aria-label="Filter collection by category"
          className="flex flex-wrap items-center gap-1 sm:gap-2"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilterChange(option)}
                className={`relative min-h-[44px] px-4 py-2 text-[14px] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? 'text-[#302923] font-medium'
                    : 'text-[#302923]/60 hover:text-[#302923]'
                }`}
              >
                <span className="relative z-10">{option}</span>
                {isActive && (
                  <motion.span
                    layoutId="active-filter-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                    className="absolute left-3 right-3 bottom-1 h-[2px] bg-[#9B573E]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        layout
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => {
            const activeFinishId =
              cardFinishes[product.id] ?? product.finishes[0]?.id;
            const activeFinish =
              product.finishes.find((f) => f.id === activeFinishId) ??
              product.finishes[0];

            return (
              <motion.article
                layout
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.5,
                  delay: (index % 3) * 0.06,
                  ease: EASE,
                }}
                className="group flex flex-col bg-[#F7F4EE] border border-[#E5DCCE] transition-colors duration-200 hover:border-[#302923]/30"
              >
                <button
                  type="button"
                  onClick={() => onSelectProduct(product, activeFinish)}
                  aria-label={`View ${product.name}, starting at ${formatUsdPrice(product.startingPrice)}`}
                  className="relative w-full aspect-square bg-[#E5DCCE]/45 overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B573E]"
                >
                  <motion.div
                    initial={{ scale: 1.05, opacity: 0.9 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.75,
                      delay: (index % 3) * 0.06,
                      ease: EASE,
                    }}
                    className="w-full h-full"
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.alt}
                      fallbackLabel={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.045]"
                    />
                  </motion.div>

                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 px-4 py-2.5 bg-[#F7F4EE]/95 border-t border-[#E5DCCE] flex items-center justify-between text-[12px] text-[#302923] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                  >
                    <span className="tracking-[0.02em]">View Piece</span>
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  </div>
                </button>

                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product, activeFinish)}
                      className="text-left font-serif text-[22px] leading-[1.15] text-[#302923] cursor-pointer hover:text-[#9B573E] transition-colors duration-200 truncate"
                    >
                      {product.name}
                    </button>
                    <span className="text-[14px] font-medium text-[#302923] tabular-nums whitespace-nowrap shrink-0">
                      From {formatUsdPrice(product.startingPrice)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-[#E5DCCE]/80">
                    <span className="text-[13px] text-[#302923]/68 truncate">
                      {activeFinish ? activeFinish.name : product.material}
                    </span>

                    <div
                      role="group"
                      aria-label={`Select ${product.name} finish`}
                      className="flex items-center gap-1.5 shrink-0"
                    >
                      {product.finishes.map((finish) => {
                        const isSwatchActive = finish.id === activeFinish?.id;
                        return (
                          <button
                            key={finish.id}
                            type="button"
                            aria-label={finish.name}
                            aria-pressed={isSwatchActive}
                            onClick={() =>
                              setCardFinishes((prev) => ({
                                ...prev,
                                [product.id]: finish.id,
                              }))
                            }
                            className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-150 ${
                              isSwatchActive
                                ? 'ring-1 ring-offset-2 ring-[#9B573E] ring-offset-[#F7F4EE]'
                                : 'hover:scale-110'
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className="w-4 h-4 rounded-full border border-[#302923]/20"
                              style={{ backgroundColor: finish.swatchHex }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
