import React, { useState } from 'react';
import { motion } from 'motion/react';
import { revealVariants, staggerVariants } from '../motion/variants';
import { FEATURED_DISHES } from '../../data/content';
import { FullMenuModal } from './FullMenuModal';
import { ArrowRight } from 'lucide-react';

interface SignatureMenuProps {
  onReserveClick: () => void;
}

export const SignatureMenu: React.FC<SignatureMenuProps> = ({ onReserveClick }) => {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  return (
    <section id="menu" className="relative py-20 sm:py-24 md:py-28 lg:py-36 bg-[#F5F5DC] text-[#36452A] border-t border-[#8F9777]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center space-x-3">
            <span className="w-8 h-px bg-[#8F9777]" />
            <span className="text-xs uppercase tracking-[0.28em] font-medium text-[#8F9777]">
              Signature Menu
            </span>
            <span className="w-8 h-px bg-[#8F9777]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-[#36452A]">
            A taste of CASA VERDE
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#36452A]/80 font-light leading-relaxed">
            Seasonal ingredients, thoughtful preparation, and dishes designed to be
            shared and remembered.
          </p>
        </div>

        {/* 3 Featured Dish Cards: Responsive grid on mobile, tablet & desktop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-8 xl:gap-12"
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {FEATURED_DISHES.map((dish, index) => (
            <motion.article
              key={dish.id}
              className="group flex flex-col justify-between bg-[#F5F5DC] rounded-xs overflow-hidden border border-[#8F9777]/25 hover:border-[#843A39]/40 transition-all duration-500 hover:shadow-lg"
              variants={revealVariants}
            >
              {/* Dish Photo */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#8F9777]/10">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium bg-[#F5F5DC]/92 text-[#36452A] backdrop-blur-xs rounded-2xs shadow-xs">
                    0{index + 1} &bull; {dish.category}
                  </span>
                </div>
              </div>

              {/* Dish Details */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1 justify-between space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#843A39] font-medium block">
                    {dish.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#36452A] group-hover:text-[#843A39] transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#36452A]/80 font-light leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                {/* Subtle culinary details */}
                {dish.details && (
                  <div className="pt-3 sm:pt-4 border-t border-[#8F9777]/20 flex flex-wrap gap-1.5 sm:gap-2">
                    {dish.details.map((detail) => (
                      <span
                        key={detail}
                        className="text-[10px] sm:text-[11px] text-[#8F9777] tracking-wider"
                      >
                        &bull; {detail}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View Full Menu CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <button
            onClick={() => setIsFullMenuOpen(true)}
            className="inline-flex items-center space-x-2.5 sm:space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-[#36452A] text-[#36452A] hover:bg-[#36452A] hover:text-[#F5F5DC] text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] font-medium rounded-xs transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#843A39]/40 cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Full Menu Modal Component */}
      <FullMenuModal
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        onReserveClick={onReserveClick}
      />
    </section>
  );
};
