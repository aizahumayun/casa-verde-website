import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onReserveClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReserveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile/tablet menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close drawer menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Experience', href: '#experience' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit', href: '#visit' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F5F5DC]/94 backdrop-blur-md border-b border-[#36452A]/10 py-3.5 sm:py-4 shadow-xs text-[#36452A]'
            : 'bg-gradient-to-b from-black/65 via-black/30 to-transparent text-[#F5F5DC] py-4 sm:py-5 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            className="group flex flex-col tracking-widest uppercase transition-opacity duration-300 hover:opacity-85 shrink-0"
            aria-label="CASA VERDE Home"
          >
            <span
              className={`font-serif text-xl sm:text-2xl lg:text-3xl tracking-[0.2em] font-medium transition-colors duration-300 ${
                isScrolled ? 'text-[#36452A]' : 'text-[#F5F5DC]'
              }`}
            >
              CASA VERDE
            </span>
            <span
              className={`text-[8px] sm:text-[9px] tracking-[0.35em] uppercase font-light -mt-0.5 transition-colors duration-300 ${
                isScrolled ? 'text-[#8F9777]' : 'text-[#F5F5DC]/70'
              }`}
            >
              Lahore
            </span>
          </a>

          {/* Desktop Navigation (>= 1024px) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-9 text-xs uppercase tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 transition-colors duration-300 group ${
                  isScrolled
                    ? 'text-[#36452A]/80 hover:text-[#36452A]'
                    : 'text-[#F5F5DC]/80 hover:text-[#F5F5DC]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-[#843A39]' : 'bg-[#FFB169]'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Desktop Right Action: Reserve CTA (>= 1024px) */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            <button
              onClick={onReserveClick}
              className={`inline-flex items-center px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] rounded-xs transition-all duration-300 border focus:outline-hidden focus:ring-2 focus:ring-[#843A39]/50 cursor-pointer ${
                isScrolled
                  ? 'border-[#843A39] text-[#843A39] hover:bg-[#843A39] hover:text-[#F5F5DC]'
                  : 'border-[#F5F5DC]/40 text-[#F5F5DC] hover:border-[#FFB169] hover:text-[#FFB169] hover:bg-white/5'
              }`}
            >
              <span>Reserve a Table</span>
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Tablet & Mobile Right Action Group (< 1024px: 768px, 820px, 834px, 912px, mobile) */}
          <div className="flex lg:hidden items-center space-x-2.5 sm:space-x-3.5 shrink-0">
            {/* Direct Reserve Button for Tablet & wide Mobile */}
            <button
              onClick={onReserveClick}
              className={`hidden sm:inline-flex items-center px-3.5 sm:px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] rounded-xs transition-all duration-300 border focus:outline-hidden focus:ring-2 focus:ring-[#843A39]/50 cursor-pointer ${
                isScrolled
                  ? 'border-[#843A39] text-[#843A39] hover:bg-[#843A39] hover:text-[#F5F5DC]'
                  : 'border-[#F5F5DC]/40 text-[#F5F5DC] hover:border-[#FFB169] hover:text-[#FFB169] hover:bg-white/5'
              }`}
            >
              <span>Reserve</span>
              <ArrowUpRight className="ml-1 w-3 h-3" />
            </button>

            {/* Menu Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xs focus:outline-hidden focus:ring-1 transition-colors flex items-center space-x-1.5 cursor-pointer ${
                isScrolled
                  ? 'text-[#36452A] hover:bg-[#36452A]/5 focus:ring-[#36452A]/30'
                  : 'text-[#F5F5DC] hover:bg-white/10 focus:ring-white/30'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="hidden md:inline-block text-[11px] uppercase tracking-[0.2em] font-medium">
                {mobileMenuOpen ? 'Close' : 'Menu'}
              </span>
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-5 h-5 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Drawer Menu (< 1024px) */}
      <div
        className={`fixed inset-0 z-40 bg-[#36452A] text-[#F5F5DC] transition-all duration-500 ease-in-out lg:hidden flex flex-col justify-between p-6 sm:p-10 md:p-12 pt-24 sm:pt-28 md:pt-32 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-5 sm:space-y-6 max-w-lg">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#8F9777]">
            Navigation
          </p>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl sm:text-4xl tracking-wide hover:text-[#FFB169] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="border-t border-[#8F9777]/30 pt-6 sm:pt-8 space-y-4 sm:space-y-5 max-w-lg">
          <p className="text-xs sm:text-sm text-[#F5F5DC]/70 tracking-wider leading-relaxed">
            42 Garden Avenue, Lahore, Pakistan
            <br />
            Tuesday – Sunday: 5:00 PM – 11:00 PM
          </p>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onReserveClick();
            }}
            className="w-full py-3.5 bg-[#843A39] text-[#F5F5DC] text-xs uppercase tracking-[0.2em] font-medium text-center hover:bg-[#843A39]/90 transition-colors cursor-pointer rounded-xs"
          >
            Reserve a Table
          </button>
        </div>
      </div>
    </>
  );
};
