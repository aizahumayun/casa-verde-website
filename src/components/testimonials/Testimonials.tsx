import React from 'react';
import { motion } from 'motion/react';
import { revealVariants, staggerVariants } from '../motion/variants';
import { TESTIMONIALS } from '../../data/content';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 md:py-28 lg:py-32 bg-[#F5F5DC] text-[#36452A] border-t border-[#8F9777]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center space-x-3 mb-12 sm:mb-16">
          <span className="w-8 h-px bg-[#8F9777]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] sm:tracking-[0.3em] font-medium text-[#8F9777]">
            At the table, in their words.
          </span>
          <span className="w-8 h-px bg-[#8F9777]" />
        </div>

        {/* Testimonials Editorial Spread (3 columns) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-16 items-start"
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-between space-y-4 sm:space-y-6 px-2 sm:px-4"
              variants={revealVariants}
            >
              <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-light italic leading-snug text-[#36452A]/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="w-8 h-px bg-[#843A39]/30" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#8F9777] font-medium">
                {t.authorNote}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
