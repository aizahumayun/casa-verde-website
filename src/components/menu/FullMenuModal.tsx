import React from "react";
import { X, Sparkles } from "lucide-react";
import { FULL_MENU_SECTIONS } from "../../data/content";

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReserveClick: () => void;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  onReserveClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-[#F5F5DC] text-[#36452A] rounded-xs shadow-2xl p-8 sm:p-12 lg:p-16 border border-[#8F9777]/30 my-8 max-h-[90vh] overflow-y-auto z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
           absolute top-1.5 right-1.5 sm:top-5 sm:right-5 lg:top-7 lg:right-7 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full text-deep-olive/70 hover:text-burgundy hover:bg-muted-sage/10 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-burgundy/40"
          aria-label="Close Full Menu"
        >
          <X className="w-5 h-5 sm:w-5 sm:h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto pb-10 border-b border-[#8F9777]/20">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#843A39] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Degustation & À La Carte</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-[#36452A]">
            The Autumn Table
          </h2>
          <p className="text-xs sm:text-sm text-[#36452A]/75 font-light leading-relaxed">
            Our menu evolves with the harvest of our regional partners. We
            invite you to dine family-style, sharing plates across the table.
          </p>
        </div>

        {/* Menu Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 pt-10">
          {FULL_MENU_SECTIONS.map((section) => (
            <div key={section.category} className="space-y-6">
              <h3 className="font-serif text-2xl text-[#843A39] tracking-wide border-b border-[#8F9777]/20 pb-2">
                {section.category}
              </h3>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.name} className="space-y-1 group">
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-medium text-base text-[#36452A] group-hover:text-[#843A39] transition-colors">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#36452A]/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note & CTA inside modal */}
        <div className="mt-12 pt-8 border-t border-[#8F9777]/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="text-xs text-[#36452A]/60 max-w-md">
            Dietary preferences accommodated with advance notice. Our bread and
            pasta are made fresh in-house every afternoon.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                onClose();
                onReserveClick();
              }}
              className="px-6 py-3 bg-[#843A39] text-[#F5F5DC] text-xs font-medium uppercase tracking-[0.2em] rounded-xs hover:bg-[#843A39]/90 transition-colors shadow-sm"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
