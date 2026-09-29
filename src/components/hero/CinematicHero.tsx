import React, { useRef, useEffect, useState, useCallback } from 'react';
import { HeroTextOverlay, HeroTextOverlayHandle } from './HeroTextOverlay';
import heroVideo from '../../assets/video/casa-verde-cinematic.mp4';
import heroPoster from '../../assets/images/cinematic/09-casa-verde-hero.jpg';

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

// Responsive interpolation factor for requestAnimationFrame (responsive, fluid, low-latency)
const INTERPOLATION_FACTOR = 0.22;
// Small threshold to avoid redundant currentTime assignments while remaining imperceptible to user
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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [heroHeightVh, setHeroHeightVh] = useState<number>(700);

  // Mutable animation and scroll tracking refs (Zero React re-renders during scroll)
  const durationRef = useRef(0);
  const targetTimeRef = useRef(0);
  const currentInterpolatedTimeRef = useRef(0);
  const seekPendingRef = useRef(false);
  const latestSeekTargetRef = useRef(0);
  const targetProgressRef = useRef(0);
  const currentInterpolatedProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // 1. Accessibility: Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 2. Responsive viewport & hero height calculation
  const recalculateDimensions = useCallback(() => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    const nextVh = getHeroScrollHeightVh(width);
    setHeroHeightVh(nextVh);
  }, []);

  useEffect(() => {
    recalculateDimensions();

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(recalculateDimensions, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [recalculateDimensions]);

  // 3. Main requestAnimationFrame animation loop:
  // USER SCROLL -> HERO PROGRESS -> TARGET VIDEO TIME -> requestAnimationFrame -> VIDEO CURRENT TIME
  const animateScrubbing = useCallback(() => {
    // A. Smoothly interpolate normalized progress toward latest target
    const targetProg = targetProgressRef.current;
    const progDelta = targetProg - currentInterpolatedProgressRef.current;

    if (Math.abs(progDelta) > 0.0002) {
      currentInterpolatedProgressRef.current += progDelta * INTERPOLATION_FACTOR;
    } else {
      currentInterpolatedProgressRef.current = targetProg;
    }

    const currentProg = currentInterpolatedProgressRef.current;

    // Update editorial text overlays directly on DOM at 60fps
    if (overlayRef.current) {
      overlayRef.current.updateProgress(currentProg);
    }

    // Update bottom transition fade into Our Story section
    if (bottomFadeRef.current) {
      const bottomOpacity = currentProg > 0.90 ? (currentProg - 0.90) / 0.10 : 0;
      bottomFadeRef.current.style.opacity = bottomOpacity.toFixed(3);
    }

    // B. Map the shared smoothed progress to the video time
    const video = videoRef.current;
    const duration = durationRef.current;

    if (video && duration > 0 && !prefersReducedMotion && !videoError) {
      const clampedTime = Math.max(0, Math.min(duration, currentProg * duration));
      currentInterpolatedTimeRef.current = clampedTime;
      latestSeekTargetRef.current = clampedTime;

      // Keep one seek in flight; newer scroll positions replace its pending target.
      if (!seekPendingRef.current && !video.seeking) {
        const diffFromCurrent = Math.abs(clampedTime - video.currentTime);
        if (diffFromCurrent > SEEK_THRESHOLD) {
          seekPendingRef.current = true;
          video.currentTime = latestSeekTargetRef.current;
        }
      }
    }

    rafIdRef.current = requestAnimationFrame(animateScrubbing);
  }, [prefersReducedMotion, videoError]);

  // 4. Video metadata & loading verification
  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const syncInitialScroll = (dur: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;
      if (totalDistance > 0) {
        const currentScroll = -rect.top;
        const initialProg = Math.max(0, Math.min(1, currentScroll / totalDistance));
        targetProgressRef.current = initialProg;
        currentInterpolatedProgressRef.current = initialProg;
        targetTimeRef.current = initialProg * dur;
        currentInterpolatedTimeRef.current = targetTimeRef.current;
        latestSeekTargetRef.current = targetTimeRef.current;
        if (Math.abs(video.currentTime - latestSeekTargetRef.current) > SEEK_THRESHOLD) {
          seekPendingRef.current = true;
          video.currentTime = latestSeekTargetRef.current;
        }
      }
    };

    const handleReady = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
        setIsVideoReady(true);
        video.pause(); // Ensure strictly paused
        syncInitialScroll(video.duration);
      }
    };

    const handleError = (e: Event) => {
      console.error('CASA VERDE hero video failed to load:', e, video.error);
      setVideoError(true);
    };

    const handleSeeked = () => {
      seekPendingRef.current = false;
    };

    // Check if metadata is already available (cached or fast response)
    if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
      handleReady();
    }

    video.addEventListener('loadedmetadata', handleReady);
    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);
    video.addEventListener('error', handleError);
    video.addEventListener('seeked', handleSeeked);

    // Explicitly call load if not started
    if (video.readyState === 0) {
      video.load();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleReady);
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('error', handleError);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [prefersReducedMotion]);

  // 5. Scroll listener: Updates mutable target values only
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      targetProgressRef.current = clampedProgress;

      if (durationRef.current > 0) {
        targetTimeRef.current = clampedProgress * durationRef.current;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measure

    // Start single continuous RAF loop
    rafIdRef.current = requestAnimationFrame(animateScrubbing);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [animateScrubbing]); //use callback ensures animateScrubbing is stable

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full bg-[#12160F]"
      style={{
        minHeight: `${heroHeightVh}vh`,
      }}
    >
      {/* Sticky Viewport Container: 100vh with 100dvh support */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
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
