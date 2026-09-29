import React, { useState } from 'react';
import { motion } from 'motion/react';
import { imageRevealVariants, staggerVariants } from '../motion/variants';
import { GALLERY_ITEMS } from '../../data/content';
import { GalleryItem } from '../../types/types';
import { X, ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-24 md:py-28 lg:py-36 bg-[#F5F5DC] text-[#36452A] border-t border-[#8F9777]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-[#8F9777]/20">
          <div className="space-y-3 sm:space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-3">
              <span className="w-8 h-px bg-[#8F9777]" />
              <span className="text-xs uppercase tracking-[0.28em] font-medium text-[#8F9777]">
                Visual Narrative
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light tracking-wide text-[#36452A]">
              Place, craft, & moments.
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#8F9777] max-w-xs text-left md:text-right font-light">
            Place &bull; Craft &bull; Ingredients &bull; Details &bull; Food &bull; Experience
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <motion.div
          className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start"
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {GALLERY_ITEMS.map((item, index) => {
            const aspectClass =
              item.aspect === 'tall'
                ? 'aspect-3/4'
                : item.aspect === 'wide'
                ? 'aspect-16/10'
                : 'aspect-square';

            return (
              <motion.figure
                key={item.id}
                className={`${item.span} group relative cursor-pointer overflow-hidden rounded-xs bg-[#8F9777]/10 transition-all duration-700 hover:shadow-xl`}
                onClick={() => setActiveItem(item)}
                variants={imageRevealVariants}
              >
                <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.narrativeStep} at CASA VERDE`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle hover gradient and overlay metadata */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 text-[#F5F5DC]">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#FFB169] block mb-1">
                          0{index + 1} &bull; {item.narrativeStep}
                        </span>
                        <figcaption className="font-serif text-lg sm:text-xl lg:text-2xl text-[#F5F5DC]">
                          {item.title}
                        </figcaption>
                      </div>
                      <div className="p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-xs text-[#F5F5DC]">
                        <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox / Expanded View */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute -top-10 sm:-top-12 right-0 p-2 text-white/80 hover:text-white transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[70vh] sm:max-h-[75vh] w-auto object-contain rounded-xs shadow-2xl"
            />

            <div className="mt-3 sm:mt-4 text-center text-[#F5F5DC] space-y-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#FFB169]">
                {activeItem.narrativeStep}
              </span>
              <p className="font-serif text-xl sm:text-2xl tracking-wide">{activeItem.title}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
