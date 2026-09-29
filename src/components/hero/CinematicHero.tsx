import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroTextOverlay, HeroTextOverlayHandle } from './HeroTextOverlay';
import heroVideo from '../../assets/video/casa-verde-cinematic.mp4';
import heroPoster from '../../assets/images/cinematic/09-casa-verde-hero.jpg';

gsap.registerPlugin(ScrollTrigger);

interface CinematicHeroProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

// Centralized responsive scroll height multipliers (vh)
const getHeroScrollHeightVh = (viewportWidth: number): number => {
  if (viewportWidth < 640) return 360; // Mobile
  if (viewportWidth < 1024) return 480; // Tablet (768px - 1023px)
  return 700; // Desktop (1024px+)
};

const SEEK_THRESHOLD = 0.02;

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onReserveClick,
  onExploreMenuClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HeroTextOverlayHandle>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);

  // Component lifecycle & accessibility states
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Accessibility: Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Video metadata gates creation of the scroll-controlled timeline.
  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches || videoError) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let active = true;
    let initialized = false;
    let context: gsap.Context | null = null;
    let timeline: gsap.core.Timeline | null = null;

    const initializeTimeline = () => {
      if (!active || initialized || !Number.isFinite(video.duration) || video.duration <= 0) return;
      initialized = true;
      video.pause();

      const duration = video.duration;
      const playhead = { progress: 0 };
      let lastRequestedTime = Number.NaN;

      context = gsap.context(() => {
        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            start: 'top top',
            end: () => `+=${(window.innerHeight * getHeroScrollHeightVh(window.innerWidth)) / 100}`,
            scrub: 0.15,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(playhead, {
          progress: 1,
          duration: 1,
          ease: 'none',
          onUpdate: () => {
            if (!active) return;

            const progress = Math.max(0, Math.min(1, playhead.progress));
            overlayRef.current?.updateProgress(progress);

            if (bottomFadeRef.current) {
              const opacity = progress > 0.9 ? (progress - 0.9) / 0.1 : 0;
              bottomFadeRef.current.style.opacity = opacity.toFixed(3);
            }

            const targetTime = progress * duration;
            if (Number.isNaN(lastRequestedTime) || Math.abs(targetTime - lastRequestedTime) >= SEEK_THRESHOLD) {
              video.currentTime = targetTime;
              lastRequestedTime = targetTime;
            }
          },
        });
      }, container);

      ScrollTrigger.refresh();
    };

    const handleError = (e: Event) => {
      if (!active) return;
      console.error('CASA VERDE hero video failed to load:', e, video.error);
      setVideoError(true);
    };

    video.addEventListener('loadedmetadata', initializeTimeline);
    video.addEventListener('durationchange', initializeTimeline);
    video.addEventListener('error', handleError);

    if (video.readyState >= 1) initializeTimeline();
    if (video.readyState === 0) {
      video.load();
    }

    return () => {
      active = false;
      video.removeEventListener('loadedmetadata', initializeTimeline);
      video.removeEventListener('durationchange', initializeTimeline);
      video.removeEventListener('error', handleError);
      timeline?.scrollTrigger?.kill();
      timeline?.kill();
      context?.revert();
    };
  }, [prefersReducedMotion, videoError]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full bg-[#12160F]"
    >
      {/* ScrollTrigger pins this single viewport while the cinematic sequence plays. */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Cinematic Media Layer */}
        <div className="relative w-full h-full">
          {/* Static Fallback Poster: ONLY rendered when reduced-motion is requested or if video errors */}
          {(prefersReducedMotion || videoError) && (
            <img
              src={heroPoster}
              alt="CASA VERDE atmospheric dining table"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] sm:object-[center_40%] md:object-[center_45%] lg:object-center"
              loading="eager"
            />
          )}

          {/* Primary Cinematic Video: The single responsive video scrubbed strictly by scroll */}
          {!prefersReducedMotion && !videoError && (
            <video
              ref={videoRef}
              src={heroVideo}
              poster={heroPoster}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-[center_35%] sm:object-[center_40%] md:object-[center_45%] lg:object-center"
            />
          )}

          {/* Cinematic Vignette & Ambient Warm Grading */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-deep-olive/15 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* Synchronized Editorial Text Overlays */}
        <HeroTextOverlay
          ref={overlayRef}
          onReserveClick={onReserveClick}
          onExploreMenuClick={onExploreMenuClick}
        />

        {/* Seamless bottom transition gradient into Our Story */}
        <div
          ref={bottomFadeRef}
          className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-warm-cream pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
      </div>
    </section>
  );
};
