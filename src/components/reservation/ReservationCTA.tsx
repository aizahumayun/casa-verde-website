import React from 'react';
import { motion } from 'motion/react';
import { revealVariants } from '../motion/variants';
import { ArrowUpRight } from 'lucide-react';

interface ReservationCTAProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

export const ReservationCTA: React.FC<ReservationCTAProps> = ({
  onReserveClick,
  onExploreMenuClick,
}) => {
  return (
    <section id="reservation" className="relative py-24 sm:py-32 md:py-36 lg:py-44 bg-[#36452A] text-[#F5F5DC] overflow-hidden">
      {/* Subtle organic texture pattern & ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#8F9777]/10 via-transparent to-black/35 pointer-events-none" />

      <motion.div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center space-y-6 sm:space-y-8"
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="inline-flex items-center space-x-3">
          <span className="w-8 h-px bg-[#FFB169]/80" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.32em] font-medium text-[#FFB169]">
            Gathering & Ritual
          </span>
          <span className="w-8 h-px bg-[#FFB169]/80" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide text-[#F5F5DC] leading-tight">
          Your table is waiting.
        </h2>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5F5DC]/80 font-light max-w-xl mx-auto leading-relaxed">
          Come for the food. Stay for the moment.
        </p>

        {/* Buttons */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-6">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 bg-[#843A39] text-[#F5F5DC] text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] rounded-xs hover:bg-[#843A39]/90 hover:shadow-lg transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#FFB169]/50 cursor-pointer"
          >
            <span>Reserve a Table</span>
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </button>

          <button
            onClick={onExploreMenuClick}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 border border-[#F5F5DC]/40 text-[#F5F5DC] text-xs font-medium uppercase tracking-[0.2em] sm:tracking-[0.22em] rounded-xs hover:border-[#FFB169] hover:text-[#FFB169] hover:bg-white/5 transition-all duration-300 focus:outline-hidden cursor-pointer"
          >
            <span>Explore the Menu</span>
          </button>
        </div>

        {/* Quiet footnote */}
        <p className="pt-6 sm:pt-8 text-[11px] sm:text-xs tracking-widest uppercase text-[#8F9777] font-light">
          Tuesday – Sunday &bull; From 5:00 PM Until Late
        </p>
      </motion.div>
    </section>
  );
};
