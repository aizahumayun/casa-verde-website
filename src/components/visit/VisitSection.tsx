import React from 'react';
import { motion } from 'motion/react';
import { imageRevealVariants, revealVariants } from '../motion/variants';
import { RESTAURANT_INFO } from '../../data/content';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import exteriorImage from '../../assets/images/cinematic/07-restaurant-exterior.jpg';

export const VisitSection: React.FC = () => {
  return (
    <section id="visit" className="py-20 sm:py-24 md:py-28 lg:py-36 bg-warm-cream text-deep-olive border-t border-muted-sage/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Information Column (Left, 5 cols) */}
          <motion.div
            className="lg:col-span-5 space-y-6 sm:space-y-8"
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="inline-flex items-center space-x-3">
              <span className="w-8 h-px bg-muted-sage" />
              <span className="text-xs uppercase tracking-[0.28em] font-medium text-muted-sage">
                Visit Casa Verde
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light tracking-wide text-deep-olive">
              Come gather around our table.
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-deep-olive/80 font-light leading-relaxed">
              Nestled along Garden Avenue in Lahore, CASA VERDE is a quiet sanctuary for
              unhurried evenings, shared bottles, and memorable courses.
            </p>

            {/* Structured Details */}
            <div className="pt-4 sm:pt-6 space-y-5 sm:space-y-6 border-t border-muted-sage/20 text-xs sm:text-sm">
              {/* Address */}
              <div className="flex items-start space-x-3.5 sm:space-x-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-deep-olive uppercase text-[11px] sm:text-xs tracking-wider">
                    Location
                  </h4>
                  <p className="text-deep-olive/80 font-light mt-0.5">
                    {RESTAURANT_INFO.address.line1}
                    <br />
                    {RESTAURANT_INFO.address.city}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-3.5 sm:space-x-4">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-deep-olive uppercase text-[11px] sm:text-xs tracking-wider">
                    Service Hours
                  </h4>
                  <p className="text-deep-olive/80 font-light mt-0.5">
                    {RESTAURANT_INFO.hours.days}
                    <br />
                    {RESTAURANT_INFO.hours.time}
                  </p>
                  <p className="text-[11px] sm:text-xs text-muted-sage mt-1 font-light italic">
                    {RESTAURANT_INFO.hours.note}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start space-x-3.5 sm:space-x-4">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-deep-olive uppercase text-[11px] sm:text-xs tracking-wider">
                    Inquiries & Private Dining
                  </h4>
                  <p className="text-deep-olive/80 font-light mt-0.5">
                    {RESTAURANT_INFO.contact.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3.5 sm:space-x-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-deep-olive uppercase text-[11px] sm:text-xs tracking-wider">
                    Concierge
                  </h4>
                  <p className="text-deep-olive/80 font-light mt-0.5">
                    {RESTAURANT_INFO.contact.email}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Exterior Visual Column (Right, 7 cols) */}
          <motion.div
            className="lg:col-span-7 relative w-full max-w-xl lg:max-w-none mx-auto lg:mx-0"
            variants={imageRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative group overflow-hidden rounded-xs shadow-2xl bg-muted-sage/10 aspect-16/10">
              <img
                src={exteriorImage}
                alt="CASA VERDE exterior facade illuminated at dusk"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-warm-cream">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-warm-peach block mb-1">
                  Facade & Grounds
                </span>
                <p className="font-serif text-base sm:text-lg lg:text-xl font-light">
                  Garden Avenue at Dusk
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
