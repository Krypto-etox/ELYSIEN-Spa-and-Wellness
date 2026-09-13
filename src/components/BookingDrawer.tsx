'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Sparkles, Check, ArrowRight, ShieldCheck, Download } from 'lucide-react';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRitual?: string;
  preselectedItinerary?: { title: string; ritual: string; duration: string } | null;
}

const suiteTiers = [
  {
    id: 'vault-suite',
    name: 'The Subterranean Granite Suite',
    pricePerNight: 1250,
    desc: 'Private mineral plunge pool fed directly from the 38.5°C spring, wood-burning hearth.',
  },
  {
    id: 'celestial-penthouse',
    name: 'The Cantilevered Celestial Penthouse',
    pricePerNight: 2400,
    desc: 'Suspended glass balcony, private cedar sauna, panoramic alpine mountain vistas.',
  },
  {
    id: 'zen-chalet',
    name: 'The Pine & Hinoki Sanctuary Chalet',
    pricePerNight: 1850,
    desc: 'Surrounded by ancient Engadin pine forest, private acoustic sound treatment room.',
  },
];

const addOnTreatments = [
  { id: 'facial', name: 'Stem-Cell & 24K Gold Facial', price: 740 },
  { id: 'obsidian', name: 'Ceremonial Obsidian Truffle Wrap', price: 580 },
  { id: 'cryo', name: 'Sub-Zero Cryo-Fascial Sculpting', price: 490 },
  { id: 'sound', name: 'Submerged 432Hz Sound Immersion', price: 380 },
];

export default function BookingDrawer({
  isOpen,
  onClose,
  preselectedRitual,
  preselectedItinerary,
}: BookingDrawerProps) {
  const [selectedSuite, setSelectedSuite] = useState(suiteTiers[0].id);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [intakeNote, setIntakeNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Auto select preselected ritual if passed
  useEffect(() => {
    if (preselectedRitual) {
      const match = addOnTreatments.find((t) => preselectedRitual.toLowerCase().includes(t.id));
      if (match && !selectedAddons.includes(match.id)) {
        setSelectedAddons((prev) => [...prev, match.id]);
      }
    }
    if (preselectedItinerary) {
      setIntakeNote(`Calibrated Itinerary: ${preselectedItinerary.title} (${preselectedItinerary.duration})`);
    }
  }, [preselectedRitual, preselectedItinerary]);

  if (!isOpen) return null;

  // Calculate pricing
  const currentSuite = suiteTiers.find((s) => s.id === selectedSuite) || suiteTiers[0];
  const suiteTotal = currentSuite.pricePerNight * nights;
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = addOnTreatments.find((t) => t.id === id);
    return acc + (item ? item.price : 0);
  }, 0);
  const subtotal = suiteTotal + addonsTotal;
  const serviceCharge = Math.round(subtotal * 0.08); // 8% Swiss hospitality tax & service
  const grandTotal = subtotal + serviceCharge;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = 'ELY-' + Math.floor(1000 + Math.random() * 9000) + '-CH';
      setBookingCode(code);
      setIsConfirmed(true);
    }, 1500);
  };

  const resetDrawer = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.4s ease',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100%',
          backgroundColor: '#090c0e',
          borderLeft: '1px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: '2.5rem 2rem',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1.2rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
              }}
            >
              VIP Concierge Reservation
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                color: 'var(--text-primary)',
                fontWeight: 300,
              }}
            >
              Reserve Sanctuary Suite
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              color: 'var(--text-secondary)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label="Close Reservation Drawer"
          >
            <X size={18} />
          </button>
        </div>

        {!isConfirmed ? (
          <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* 1. Select Suite */}
            <div>
              <label
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.8rem',
                }}
              >
                1. Select Sanctuary Residence
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {suiteTiers.map((suite) => (
                  <div
                    key={suite.id}
                    onClick={() => setSelectedSuite(suite.id)}
                    style={{
                      padding: '1.2rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedSuite === suite.id ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: selectedSuite === suite.id ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                        {suite.name}
                      </h4>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--accent-gold-light)', fontWeight: 600 }}>
                        {suite.pricePerNight} CHF <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/ night</span>
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.3rem', lineHeight: 1.4 }}>
                      {suite.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Nights & Guests */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  Nights of Retreat
                </label>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: '#12161a',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                >
                  {[1, 2, 3, 5, 7, 14].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Night' : 'Nights'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                >
                  Sanctuary Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: '#12161a',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                >
                  <option value={1}>1 Solo Pilgrim</option>
                  <option value={2}>2 Guests (Shared Suite)</option>
                  <option value={4}>4 Guests (Double Suite)</option>
                  <option value={10}>Private Sanctuary Buyout</option>
                </select>
              </div>
            </div>

            {/* 3. Add-on Longevity Rituals */}
            <div>
              <label
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.8rem',
                }}
              >
                3. Curated Master Treatments (Optional)
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {addOnTreatments.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isChecked ? 'rgba(212, 175, 55, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                        border: isChecked ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '3px',
                            border: isChecked ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                            background: isChecked ? 'var(--accent-gold)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isChecked && <Check size={11} color="#07090b" />}
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{addon.name}</span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold-light)' }}>+{addon.price} CHF</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Guest Contact & Special Requests */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  display: 'block',
                }}
              >
                4. Primary Guest Information
              </label>

              <input
                type="text"
                placeholder="Full Name (e.g., Lord / Lady / Dr. Julian Vance)"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                autoComplete="off"
                data-lpignore="true"
                suppressHydrationWarning
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#12161a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />

              <input
                type="email"
                placeholder="Direct Private Email for Itinerary Dossier"
                required
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                autoComplete="off"
                data-lpignore="true"
                suppressHydrationWarning
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#12161a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />

              <textarea
                placeholder="Biomarker preferences, dietary allergies, or arrival via helicopter transfer..."
                value={intakeNote}
                onChange={(e) => setIntakeNote(e.target.value)}
                rows={2}
                autoComplete="off"
                data-lpignore="true"
                suppressHydrationWarning
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: '#12161a',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            {/* Financial Summary & Total */}
            <div
              className="glass-panel"
              style={{
                padding: '1.4rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <span>{currentSuite.name} ({nights} nights)</span>
                <span>{suiteTotal.toLocaleString()} CHF</span>
              </div>

              {addonsTotal > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <span>Curated Longevity Treatments</span>
                  <span>{addonsTotal.toLocaleString()} CHF</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>Swiss Spa & Thermal Aquifer Surcharge (8%)</span>
                <span>{serviceCharge.toLocaleString()} CHF</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.2rem',
                  color: 'var(--accent-gold-light)',
                  fontFamily: 'var(--font-serif)',
                  paddingTop: '0.8rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  marginTop: '0.4rem',
                }}
              >
                <span>Estimated Sanctuary Total</span>
                <span>{grandTotal.toLocaleString()} CHF</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-luxury-primary"
              style={{ width: '100%', padding: '1.1rem' }}
            >
              {isSubmitting ? (
                <>
                  <div className="sound-bar animating" />
                  <span>Securing Private Aquifer Access...</span>
                </>
              ) : (
                <>
                  <span>Confirm Sanctuary Reservation</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Confirmation State */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem 1rem', gap: '1.5rem', animation: 'fadeIn 0.5s ease' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)',
              }}
            >
              <Sparkles size={28} color="var(--accent-gold)" />
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                }}
              >
                Sanctuary Confirmed
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.2rem',
                  color: 'var(--text-primary)',
                  marginTop: '0.3rem',
                }}
              >
                Welcome, {guestName || 'Honored Guest'}
              </h3>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RESERVATION CODE:</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold-light)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {bookingCode}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RESIDENCE:</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{currentSuite.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DURATION:</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{nights} Nights · {guests} Guests</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL VALUE:</span>
                <span style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                  {grandTotal.toLocaleString()} CHF
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Our Head Concierge has dispatched your personalized arrival dossier and private helicopter landing coordinates to <strong>{guestEmail || 'your email'}</strong>.
            </p>

            <button
              onClick={resetDrawer}
              className="btn-luxury-primary"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              <span>Return to Sanctuary</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
