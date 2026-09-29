import React from 'react';
import { motion } from 'motion/react';
import { revealVariants } from '../motion/variants';
import experienceImage from '../../assets/images/experience/01-the-experience-evening.jpg';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative w-full bg-[#1c2417] text-warm-cream overflow-hidden">
      {/* 16:9 Cinematic Photographic Background */}
      <div className="relative w-full aspect-video min-h-105 sm:min-h-125 md:min-h-140 lg:min-h-170 flex items-center">
        {/* Experience Image */}
        <img
          src={experienceImage}
          alt="Intimate evening dining atmosphere with candles and wine at CASA VERDE"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out hover:scale-[1.02]"
          loading="lazy"
        />

        {/* Ambient atmospheric grading overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

        {/* Overlay Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full py-12 sm:py-16">
          <motion.div
            className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl space-y-4 sm:space-y-6"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="inline-flex items-center space-x-3">
              <span className="w-8 h-px bg-warm-peach" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium text-warm-peach">
                The Experience
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-warm-cream leading-tight">
              Not just dinner.
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-warm-cream/90 font-light leading-relaxed">
              An atmosphere designed for slow evenings, good conversation, and food
              worth remembering.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-muted-sage">
              <span>Warm Candlelight</span>
              <span className="w-1.5 h-1.5 rounded-full bg-warm-peach/80" />
              <span>Estate Wine</span>
              <span className="w-1.5 h-1.5 rounded-full bg-warm-peach/80" />
              <span>Unrushed Service</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
