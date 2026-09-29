import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { HERO_SCENES } from '../../data/content';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export interface HeroTextOverlayHandle {
  updateProgress: (progress: number) => void;
}

interface HeroTextOverlayProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

export const HeroTextOverlay = forwardRef<HeroTextOverlayHandle, HeroTextOverlayProps>(
  ({ onReserveClick, onExploreMenuClick }, ref) => {
    // Refs for each scene container to update directly in requestAnimationFrame
    const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      updateProgress: (progress: number) => {
        // Update each scene's opacity, transform, and pointerEvents directly on DOM
        HERO_SCENES.forEach((scene, index) => {
          const el = sceneRefs.current[index];
          if (!el) return;

          const [start, end] = scene.timeRange;
          const duration = end - start;
          const fadeInWindow = duration * 0.28;
          const fadeOutWindow = duration * 0.28;

          if (progress < start || progress > end) {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            el.style.transform = 'translate3d(0, 20px, 0)';
            el.style.visibility = 'hidden';
            return;
          }

          let opacity = 1;
          let translateY = 0;

          if (progress < start + fadeInWindow) {
            const ratio = (progress - start) / fadeInWindow;
            opacity = Math.max(0, Math.min(1, ratio));
            translateY = (1 - ratio) * 20;
          } else if (progress > end - fadeOutWindow) {
            const ratio = (end - progress) / fadeOutWindow;
            opacity = Math.max(0, Math.min(1, ratio));
            translateY = -(1 - ratio) * 16;
          }

          el.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
          el.style.opacity = opacity.toFixed(3);
          el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
          el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        });

        // Update bottom scroll prompt indicator
        if (scrollIndicatorRef.current) {
          const indicatorOpacity = progress < 0.12 ? 1 - progress / 0.12 : 0;
          scrollIndicatorRef.current.style.opacity = indicatorOpacity.toFixed(3);
          scrollIndicatorRef.current.style.pointerEvents =
            indicatorOpacity > 0.2 ? 'auto' : 'none';
        }
      },
    }));

    // Breakpoint-aware layout configurations
    const positionClasses: Record<string, string> = {
      'left-center':
        'items-start justify-center text-left max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl pl-5 sm:pl-10 md:pl-14 lg:pl-20',
      'right-top':
        'items-end justify-start text-right max-w-xs sm:max-w-md md:max-w-lg ml-auto pr-5 sm:pr-10 md:pr-14 lg:pr-20 pt-28 sm:pt-32 md:pt-36',
      'left-bottom':
        'items-start justify-end text-left max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl pl-5 sm:pl-10 md:pl-14 lg:pl-20 pb-20 sm:pb-24 md:pb-28',
      'right-center':
        'items-end justify-center text-right max-w-xs sm:max-w-md md:max-w-lg ml-auto pr-5 sm:pr-10 md:pr-14 lg:pr-20',
      'left-center-closing':
        'items-start justify-center text-left max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl pl-5 sm:pl-10 md:pl-14 lg:pl-20',
    };

    return (
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3 sm:p-6 md:p-8">
        {/* Container for the 5 scenes */}
        <div className="relative w-full h-full">
          {HERO_SCENES.map((scene, index) => {
            const posClass =
              positionClasses[scene.position] || positionClasses['left-center'];

            return (
              <div
                key={scene.id}
                ref={(el) => {
                  sceneRefs.current[index] = el;
                }}
                className={`absolute inset-0 flex flex-col ${posClass}`}
                style={{
                  opacity: index === 0 ? 1 : 0,
                  visibility: index === 0 ? 'visible' : 'hidden',
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'opacity, transform',
                }}
              >
                {/* Text Scrim Card: soft protective tint on tablet/mobile for maximum legibility */}
                <div className="space-y-3 sm:space-y-4 md:space-y-5 text-[#F5F5DC] bg-black/30 md:bg-transparent backdrop-blur-[2px] md:backdrop-blur-none p-5 sm:p-6 md:p-0 rounded-xs border border-white/5 md:border-transparent drop-shadow-md">
                  {/* Eyebrow */}
                  <div className="inline-flex items-center space-x-2.5 sm:space-x-3">
                    <span className="w-5 sm:w-6 h-px bg-[#FFB169]/80" />
                    <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#FFB169] font-medium">
                      {scene.eyebrow}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-[1.14] text-[#F5F5DC]">
                    {scene.heading}
                  </h1>

                  {/* Body */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#F5F5DC]/85 font-light leading-relaxed max-w-sm sm:max-w-md md:max-w-lg">
                    {scene.body}
                  </p>

                  {/* CTAs (Scenes 1 & 5) */}
                  {scene.showCTAs && (
                    <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pointer-events-auto">
                      <button
                        onClick={onExploreMenuClick}
                        className="px-5 sm:px-6 py-3 bg-[#F5F5DC] text-[#36452A] text-xs font-semibold uppercase tracking-[0.2em] rounded-xs hover:bg-[#FFB169] hover:text-[#36452A] transition-all duration-300 shadow-md cursor-pointer text-center"
                      >
                        Explore the Menu
                      </button>
                      <button
                        onClick={onReserveClick}
                        className="inline-flex items-center justify-center px-5 sm:px-6 py-3 border border-[#F5F5DC]/50 text-[#F5F5DC] text-xs font-medium uppercase tracking-[0.2em] rounded-xs hover:border-[#FFB169] hover:text-[#FFB169] hover:bg-black/20 transition-all duration-300 backdrop-blur-xs cursor-pointer"
                      >
                        <span>Reserve a Table</span>
                        <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 sm:space-y-2 pointer-events-none transition-opacity duration-300"
        >
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-[#F5F5DC]/70 font-medium">
            Scroll to explore film
          </span>
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB169] animate-bounce" />
        </div>
      </div>
    );
  }
);

HeroTextOverlay.displayName = 'HeroTextOverlay';
