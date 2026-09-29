import React from 'react';
import { RESTAURANT_INFO } from '../../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181f14] text-[#F5F5DC] pt-16 sm:pt-20 pb-10 sm:pb-12 border-t border-[#8F9777]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-16 pb-12 sm:pb-16 border-b border-[#8F9777]/20">
          {/* Brand & Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <a href="#home" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-light uppercase text-[#F5F5DC] group-hover:text-[#FFB169] transition-colors">
                {RESTAURANT_INFO.name}
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#8F9777] mt-0.5 font-light">
                {RESTAURANT_INFO.descriptor}
              </span>
            </a>
            <p className="font-serif text-base sm:text-lg italic text-[#F5F5DC]/70 font-light max-w-sm pt-1">
              &ldquo;{RESTAURANT_INFO.tagline}&rdquo;
            </p>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 sm:space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8F9777] block">
              Navigation
            </span>
            <ul className="space-y-2 sm:space-y-2.5 text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-light">
              <li>
                <a href="#home" className="text-[#F5F5DC]/80 hover:text-[#FFB169] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#story" className="text-[#F5F5DC]/80 hover:text-[#FFB169] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#menu" className="text-[#F5F5DC]/80 hover:text-[#FFB169] transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#experience" className="text-[#F5F5DC]/80 hover:text-[#FFB169] transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-[#F5F5DC]/80 hover:text-[#FFB169] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#visit" className="text-[#F5F5DC]/80 hover:text-[#FFB169] transition-colors">
                  Visit
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours (4 cols) */}
          <div className="md:col-span-4 space-y-3 sm:space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8F9777] block">
              Inquiries & Location
            </span>
            <div className="space-y-2.5 sm:space-y-3 text-xs text-[#F5F5DC]/80 font-light leading-relaxed">
              <p>
                {RESTAURANT_INFO.address.line1}
                <br />
                {RESTAURANT_INFO.address.city}
              </p>
              <p>
                <a
                  href={`tel:${RESTAURANT_INFO.contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#FFB169] transition-colors"
                >
                  {RESTAURANT_INFO.contact.phone}
                </a>
                <br />
                <a
                  href={`mailto:${RESTAURANT_INFO.contact.email}`}
                  className="hover:text-[#FFB169] transition-colors"
                >
                  {RESTAURANT_INFO.contact.email}
                </a>
              </p>
              <p className="pt-0.5">
                <span className="text-[#8F9777] uppercase text-[9px] sm:text-[10px] tracking-wider block">
                  Social
                </span>
                <span className="text-xs text-[#F5F5DC]/90">
                  Instagram: {RESTAURANT_INFO.social.instagram}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-[#8F9777] font-light tracking-wider gap-3 sm:gap-4">
          <p>© 2026 CASA VERDE. All rights reserved.</p>
          <div className="flex items-center space-x-4 sm:space-x-6 text-[9px] sm:text-[10px] uppercase tracking-widest">
            <span>Contemporary Dining</span>
            <span className="w-1 h-1 rounded-full bg-[#8F9777]/50" />
            <span>Lahore</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
