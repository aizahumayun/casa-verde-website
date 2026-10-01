import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import { revealVariants, staggerVariants } from '../motion/variants';
import { TESTIMONIALS } from '../../data/content';

export const Testimonials: React.FC = () => {
  const getCardsPerPage = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
  const [cardsPerPage, setCardsPerPage] = useState(() =>
    typeof window === 'undefined' ? 1 : getCardsPerPage(),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const updateCardsPerPage = () => setCardsPerPage(getCardsPerPage());
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const updateCarouselState = (swiper: SwiperInstance) => {
    setCurrentIndex(Math.min(swiper.realIndex * cardsPerPage, TESTIMONIALS.length - 1));
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const testimonialPages = Array.from(
    { length: Math.ceil(TESTIMONIALS.length / cardsPerPage) },
    (_, pageIndex) =>
      TESTIMONIALS.slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage),
  );

  return (
    <section className="border-t border-[#F5F5DC]/15 bg-[#36452A] py-20 text-[#F5F5DC] sm:py-24 md:py-28 lg:py-32">
      <div className="mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 text-center sm:mb-16">
          <div className="inline-flex items-center space-x-3">
            <span className="w-8 h-px bg-[#FFB169]/70" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#F5F5DC]/80 sm:text-xs sm:tracking-[0.3em]">
              At the table, in their words.
            </span>
            <span className="w-8 h-px bg-[#FFB169]/70" />
          </div>
        </div>

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Swiper
            key={cardsPerPage}
            modules={[Navigation]}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={0}
            navigation={{
              prevEl: '.testimonials-carousel-prev',
              nextEl: '.testimonials-carousel-next',
            }}
            onSwiper={updateCarouselState}
            onSlideChange={updateCarouselState}
          >
            {testimonialPages.map((page, pageIndex) => (
              <SwiperSlide key={pageIndex} className="!h-auto">
                <div className="flex h-full justify-center gap-5 sm:gap-6 lg:gap-8">
                  {page.map((testimonial) => (
                    <motion.article
                      key={testimonial.authorName}
                      variants={revealVariants}
                      className="flex h-full w-full min-w-0 shrink-0 flex-col border border-[#8F9777]/30 bg-[#F5F5DC] px-7 py-8 sm:w-[calc((100%-24px)/2)] sm:min-h-[420px] sm:px-8 sm:py-10 lg:w-[calc((100%-64px)/3)]"
                    >
                      <p className="flex-1 font-serif text-[25px] font-light italic leading-[1.35] text-[#36452A]/90 sm:text-[28px] lg:text-[30px]">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="mt-9 flex items-center gap-3 border-t border-[#8F9777]/25 pt-5">
                        <div
                          role="img"
                          aria-label={`${testimonial.authorName} avatar`}
                          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#FFB169]/45 bg-[#FFB169]/[0.12] font-serif text-sm text-[#36452A]"
                        >
                          {testimonial.avatarInitials}
                        </div>
                        <div className="text-left">
                          <p className="font-sans text-sm font-medium text-[#36452A]">
                            {testimonial.authorName}
                          </p>
                          <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#8F9777]">
                            {testimonial.authorNote}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="mt-9 flex items-center justify-center gap-5 sm:mt-11">
          <button
            type="button"
            aria-label="Previous testimonials"
            disabled={isBeginning}
            className="testimonials-carousel-prev inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#F5F5DC] transition-colors hover:text-[#FFB169] disabled:cursor-not-allowed disabled:text-[#8F9777]"
          >
            <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
            <span className="hidden sm:inline">Previous</span>
          </button>
          <span className="min-w-[58px] text-center font-sans text-xs tabular-nums text-[#F5F5DC]/75">
            {String(currentIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            aria-label="Next testimonials"
            disabled={isEnd}
            className="testimonials-carousel-next inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#F5F5DC] transition-colors hover:text-[#FFB169] disabled:cursor-not-allowed disabled:text-[#8F9777]"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};
