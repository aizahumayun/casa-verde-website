import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/content';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [guestCount, setGuestCount] = useState('2 Guests');
  const [seatingTime, setSeatingTime] = useState('7:30 PM');
  const [preferredDate, setPreferredDate] = useState('This Weekend');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto bg-[#F5F5DC] text-[#36452A] rounded-xs shadow-2xl p-5 sm:p-8 lg:p-12 border border-[#8F9777]/40 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 rounded-full text-[#36452A]/70 hover:text-[#843A39] hover:bg-[#8F9777]/10 transition-colors focus:outline-hidden"
          aria-label="Close Reservation Window"
        >
          <X className="w-5 h-5" />
        </button>

        {inquirySubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#36452A]/10 text-[#36452A] flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#843A39]" />
            </div>
            <h3 className="font-serif text-3xl font-light text-[#36452A]">
              We Look Forward to Welcoming You
            </h3>
            <p className="text-sm text-[#36452A]/80 font-light max-w-md mx-auto leading-relaxed">
              Our reservation team holds a limited number of tables each evening to ensure
              an intimate, unhurried pace. For immediate assistance or special dietary
              requests, our concierge is available directly at:
            </p>
            <div className="pt-2 text-base font-serif text-[#843A39] font-medium">
              {RESTAURANT_INFO.contact.phone}
            </div>
            <div className="pt-6">
              <button
                onClick={() => {
                  setInquirySubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#36452A] text-[#F5F5DC] text-xs uppercase tracking-[0.2em] font-medium rounded-xs hover:bg-[#843A39] transition-colors"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2 border-b border-[#8F9777]/20 pb-5">
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#843A39]">
                Reservations & Inquiries
              </span>
              <h3 className="font-serif text-3xl font-light tracking-wide text-[#36452A]">
                Reserve Your Evening
              </h3>
              <p className="text-xs sm:text-sm text-[#36452A]/75 font-light">
                Tables are released 30 days in advance. We accommodate parties of 1 to 8
                guests around our dining room and garden pavilion.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Party Size */}
              <div>
                <label className="block uppercase tracking-wider text-[11px] font-medium text-[#36452A] mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#843A39]" /> Party Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['2 Guests', '4 Guests', '6 Guests', '8+ Private'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setGuestCount(opt)}
                      className={`py-2 px-1 text-center rounded-2xs border transition-colors ${
                        guestCount === opt
                          ? 'border-[#843A39] bg-[#843A39] text-[#F5F5DC] font-medium'
                          : 'border-[#8F9777]/30 hover:border-[#36452A] text-[#36452A]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Seating Time */}
              <div>
                <label className="block uppercase tracking-wider text-[11px] font-medium text-[#36452A] mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#843A39]" /> Seating Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['5:30 PM', '7:00 PM', '8:30 PM', '9:45 PM'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSeatingTime(time)}
                      className={`py-2 px-1 text-center rounded-2xs border transition-colors ${
                        seatingTime === time
                          ? 'border-[#843A39] bg-[#843A39] text-[#F5F5DC] font-medium'
                          : 'border-[#8F9777]/30 hover:border-[#36452A] text-[#36452A]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Window */}
              <div>
                <label className="block uppercase tracking-wider text-[11px] font-medium text-[#36452A] mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#843A39]" /> Dining Date Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Tonight', 'This Weekend', 'Upcoming Week'].map((date) => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setPreferredDate(date)}
                      className={`py-2 px-1 text-center rounded-2xs border transition-colors ${
                        preferredDate === date
                          ? 'border-[#843A39] bg-[#843A39] text-[#F5F5DC] font-medium'
                          : 'border-[#8F9777]/30 hover:border-[#36452A] text-[#36452A]'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Booking note */}
              <div className="pt-2 p-3 bg-[#8F9777]/10 rounded-2xs text-[11px] text-[#36452A]/80 leading-relaxed">
                <span className="font-semibold text-[#843A39]">Guest Note:</span> Seating is
                unhurried; we reserve your table for the duration of the evening. Smart casual
                attire is requested.
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setInquirySubmitted(true)}
                className="w-full sm:flex-1 py-3.5 bg-[#843A39] text-[#F5F5DC] text-xs uppercase tracking-[0.2em] font-medium rounded-xs hover:bg-[#843A39]/90 transition-colors shadow-md text-center"
              >
                Inquire for {guestCount}
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.contact.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3.5 border border-[#36452A]/30 text-[#36452A] hover:bg-[#36452A] hover:text-[#F5F5DC] text-xs uppercase tracking-[0.18em] rounded-xs transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-[#843A39]" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
