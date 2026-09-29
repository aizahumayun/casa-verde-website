import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/layout/Header';
import { CinematicHero } from './components/hero/CinematicHero';
import { OurStory } from './components/story/OurStory';
import { SignatureMenu } from './components/menu/SignatureMenu';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { Gallery } from './components/gallery/Gallery';
import { Testimonials } from './components/testimonials/Testimonials';
import { VisitSection } from './components/visit/VisitSection';
import { ReservationCTA } from './components/reservation/ReservationCTA';
import { ReservationModal } from './components/reservation/ReservationModal';
import { Footer } from './components/layout/Footer';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleOpenReservation = () => {
    setIsReservationOpen(true);
  };

  const handleCloseReservation = () => {
    setIsReservationOpen(false);
  };

  const handleExploreMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F5F5DC] text-[#36452A] flex flex-col selection:bg-[#843A39] selection:text-[#F5F5DC]">
      {/* Fixed Luxury Header */}
      <Header onReserveClick={handleOpenReservation} />

      {/* Main Narrative Content */}
      <main className="flex-1">
        {/* 1. Cinematic Hero with Scroll-driven Video Scrubbing & Synchronized Text */}
        <CinematicHero
          onReserveClick={handleOpenReservation}
          onExploreMenuClick={handleExploreMenu}
        />

        {/* 2. Our Story */}
        <OurStory />

        {/* 3. Signature Menu */}
        <SignatureMenu onReserveClick={handleOpenReservation} />

        {/* 4. The Experience */}
        <ExperienceSection />

        {/* 5. Gallery */}
        <Gallery />

        {/* 6. Testimonials */}
        <Testimonials />

        {/* 7. Visit Us */}
        <VisitSection />

        {/* 8. Reservation CTA */}
        <ReservationCTA
          onReserveClick={handleOpenReservation}
          onExploreMenuClick={handleExploreMenu}
        />
      </main>

      {/* 9. Spacious Minimal Footer */}
      <Footer />

      {/* Table Reservation & Concierge Inquiry Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={handleCloseReservation}
      />
      </div>
    </MotionConfig>
  );
}
