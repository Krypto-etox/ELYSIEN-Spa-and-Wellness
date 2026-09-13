'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Compass, Shield, Heart } from 'lucide-react';

export default function Footer({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#050708',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '7rem 2.5rem 3rem 2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Top Manifesto & Membership Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            marginBottom: '6rem',
            alignItems: 'start',
          }}
        >
          {/* Column 1: Brand & Manifesto */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                letterSpacing: '0.22em',
                color: 'var(--text-primary)',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              ÉLYSIEN
            </span>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '420px',
                fontWeight: 300,
              }}
            >
              Water does not rush. It carves the granite mountain through eternal patience. Here, at 1,850 meters above the modern rush, we return human biology to its primal cadence.
            </p>

            <div
              style={{
                marginTop: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-display)',
                color: 'var(--accent-gold-light)',
                letterSpacing: '0.1em',
              }}
            >
              <Compass size={14} color="var(--accent-gold)" />
              <span>46.4908° N, 9.8355° E · ENGADIN VALLEY, SWITZERLAND</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginBottom: '1.2rem',
                }}
              >
                The Sanctuary
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {['Subterranean Vault', 'Hinoki Smoke Sauna', 'Glacial Cryo-Cavern', 'Celestial Sky Pool', 'Hydro-Acoustic Sphere'].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#sanctuaries"
                        style={{
                          textDecoration: 'none',
                          color: 'var(--text-secondary)',
                          fontSize: '0.85rem',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  marginBottom: '1.2rem',
                }}
              >
                Longevity Atelier
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {['Epigenetic Facials', 'Obsidian Stone Wrap', 'Cryo-Thermal Shock', 'Sensory Diagnostic', 'Private Chalet Suites'].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href="#rituals"
                        style={{
                          textDecoration: 'none',
                          color: 'var(--text-secondary)',
                          fontSize: '0.85rem',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Column 3: The Private Gazette Newsletter */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                marginBottom: '1.2rem',
              }}
            >
              The Seasonal Pilgrimage Gazette
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Receive invitations to private solstice thermal immersions, visiting longevity masters, and botanical harvest disclosures.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }} suppressHydrationWarning>
                <input
                  type="email"
                  placeholder="Your confidential email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  data-lpignore="true"
                  suppressHydrationWarning
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn-luxury-primary"
                  style={{ padding: '0.75rem 1.2rem', borderRadius: 'var(--radius-sm)' }}
                >
                  <ArrowUpRight size={16} />
                </button>
              </form>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.8rem',
                  background: 'rgba(58, 117, 99, 0.15)',
                  border: '1px solid var(--accent-jade)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  color: '#6ee7b7',
                }}
              >
                <Check size={15} />
                <span>Your invitation to the seasonal gazette is confirmed.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Credits & Legal Strip */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          <p suppressHydrationWarning>© 2026 ÉLYSIEN SANCTUARY ATELIER AG. ALL RIGHTS RESERVED.</p>


          <div style={{ display: 'flex', gap: '2rem' }}>
            <span>Prix Villégiature Winner 2025/2026</span>
            <span>Awwwards Site of the Day</span>
            <span>Swiss Mineral Waters Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
