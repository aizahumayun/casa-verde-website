import React from 'react';
import { motion } from 'motion/react';
import { imageRevealVariants, revealVariants } from '../motion/variants';
import storyImage from '../../assets/images/story/01-our-story-interior.jpg';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="relative py-20 sm:py-24 md:py-28 lg:py-36 bg-warm-cream text-deep-olive">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Editorial Column (Left, 7 columns) */}
          <motion.div
            className="lg:col-span-7 space-y-6 sm:space-y-8 pr-0 lg:pr-6 xl:pr-10"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="inline-flex items-center space-x-3">
              <span className="w-8 h-px bg-muted-sage" />
              <span className="text-xs uppercase tracking-[0.28em] font-medium text-muted-sage">
                Our Story
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light tracking-wide leading-[1.18] text-deep-olive">
              Food is our way of bringing people together.
            </h2>

            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-deep-olive/85 font-light leading-relaxed max-w-xl">
              <p>
                CASA VERDE was created around a simple idea: that the best meals are
                rarely just about what is on the plate.
              </p>
              <p>
                They are about the people around it, the conversation that lasts a little
                longer, and the small details that make an ordinary evening feel memorable.
              </p>
              <p>
                Our kitchen follows the rhythm of the seasons, pairing thoughtful preparation
                with warm, uncomplicated hospitality.
              </p>
            </div>

            {/* Subtle editorial hallmark details */}
            <div className="pt-6 border-t border-muted-sage/20 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-burgundy">Estate Grown</span>
                <span className="text-[11px] sm:text-xs tracking-wider text-deep-olive/70 uppercase">
                  Seasonal Harvest
                </span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-burgundy">Wood & Ember</span>
                <span className="text-[11px] sm:text-xs tracking-wider text-deep-olive/70 uppercase">
                  Ancient Technique
                </span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-burgundy">Intimate</span>
                <span className="text-[11px] sm:text-xs tracking-wider text-deep-olive/70 uppercase">
                  48 Evening Seats
                </span>
              </div>
            </div>
          </motion.div>

          {/* Photographic Column (Right, 5 columns) */}
          <motion.div
            className="lg:col-span-5 relative w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto lg:mx-0"
            variants={imageRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative group overflow-hidden rounded-xs shadow-xl bg-muted-sage/10 aspect-4/5">
              <img
                src={storyImage}
                alt="Sunlit dining room at CASA VERDE with vaulted ceiling and olive tree"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>

            {/* Editorial Caption below image */}
            <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs tracking-widest uppercase text-muted-sage">
              <span>Dining Room & Arches</span>
              <span>Plate I</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
