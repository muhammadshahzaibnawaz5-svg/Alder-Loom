import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MATERIALS } from '../data/catalogue';
import { ResilientImage } from './ResilientImage';

const EASE = [0.22, 1, 0.36, 1] as const;

export function MaterialsSection() {
  const [selectedId, setSelectedId] = useState<string>(MATERIALS[0].id);

  const activeMaterial =
    MATERIALS.find((material) => material.id === selectedId) ?? MATERIALS[0];

  return (
    <section
      id="materials"
      aria-labelledby="materials-heading"
      className="w-full bg-[#302923] text-[#F7F4EE]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Macro Texture Frame */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[4/3] bg-[#463B32] border border-[#F7F4EE]/15 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="w-full h-full"
                >
                  <ResilientImage
                    src={activeMaterial.image}
                    alt={activeMaterial.alt}
                    fallbackLabel={activeMaterial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Material Atelier Panel */}
          <div className="lg:col-span-6 flex flex-col">
            <h2
              id="materials-heading"
              className="font-serif text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.06] tracking-[-0.015em] text-[#F7F4EE] text-balance"
            >
              A closer look at the finish.
            </h2>

            <div className="mt-6 min-h-[104px]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="font-serif text-[26px] leading-[1.15] text-[#E5DCCE]">
                    {activeMaterial.name}
                  </p>
                  <p className="mt-2.5 text-[15px] leading-[1.65] text-[#F7F4EE]/80 max-w-[44ch]">
                    {activeMaterial.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual Thumbnail Swatch Cards */}
            <div
              role="group"
              aria-label="Select material swatch"
              className="mt-8 pt-7 border-t border-[#F7F4EE]/15 grid grid-cols-3 gap-3 sm:gap-4"
            >
              {MATERIALS.map((material) => {
                const isSelected = material.id === activeMaterial.id;
                return (
                  <button
                    key={material.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(material.id)}
                    className={`group text-left cursor-pointer rounded-[4px] overflow-hidden border transition-all duration-200 ${
                      isSelected
                        ? 'border-[#9B573E] bg-[#463B32]'
                        : 'border-[#F7F4EE]/15 bg-[#302923] hover:border-[#F7F4EE]/40'
                    }`}
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden bg-[#463B32]">
                      <ResilientImage
                        src={material.image}
                        alt={material.name}
                        fallbackLabel={material.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="px-2.5 py-2.5 flex items-center justify-between gap-2">
                      <span
                        className={`text-[13px] truncate ${
                          isSelected ? 'text-[#F7F4EE] font-medium' : 'text-[#F7F4EE]/75'
                        }`}
                      >
                        {material.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`w-2 h-2 rounded-full shrink-0 transition-opacity duration-200 ${
                          isSelected ? 'bg-[#9B573E] opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
