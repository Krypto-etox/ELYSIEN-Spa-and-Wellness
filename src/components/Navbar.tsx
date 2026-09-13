'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Menu, X, Sun, Moon, Calendar } from 'lucide-react';
import AudioEngine from './AudioEngine';

interface NavbarProps {
  onOpenBooking: () => void;
  ambientMode: 'twilight' | 'dawn';
  onToggleAmbient: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export default function Navbar({
  onOpenBooking,
  ambientMode,
  onToggleAmbient,
  isAudioPlaying,
  onToggleAudio,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    // Live Swiss local time
    const updateTime = () => {
      const now = new Date();
      const swissTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(now);
      setTimeString(swissTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: 'Sanctuaries', href: '#sanctuaries' },
    { label: 'Rituals & Longevity', href: '#rituals' },
    { label: 'Diagnostic Matcher', href: '#diagnostic' },
    { label: 'Architecture', href: '#architecture' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: isScrolled ? '0.75rem 2rem' : '1.5rem 2.5rem',
          backgroundColor: isScrolled ? 'rgba(7, 9, 11, 0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1500px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Monogram & Coordinates */}
          <a
            href="#"
            data-cursor="ÉLYSIEN"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '1.2rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                ÉLYSIEN
                <span
                  style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-gold)',
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.25em',
                  color: 'var(--text-muted)',
                  marginTop: '0.25rem',
                  textTransform: 'uppercase',
                }}
              >
                Thermal Sanctuary · 1,850m
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              gap: '2.5rem',
              alignItems: 'center',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor="VIEW"
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  padding: '0.25rem 0',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Bar: Ambient audio, Light/Dark toggle, Swiss Time & Reservation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Real-time telemetry badge */}
            <div
              className="telemetry-badge"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-display)',
                color: 'var(--text-secondary)',
                letterSpacing: '0.08em',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#34d399',
                  boxShadow: '0 0 8px #34d399',
                }}
              />
              <span>38.5°C SPRINGS</span>
              <span style={{ opacity: 0.3 }}>|</span>
              <span suppressHydrationWarning>{timeString || '12:00:00'} CET</span>
            </div>

            {/* Audio Engine */}
            <AudioEngine isPlaying={isAudioPlaying} onToggle={onToggleAudio} />

            {/* Ambient Lighting Mode Toggle */}
            <button
              onClick={onToggleAmbient}
              title={`Switch to ${ambientMode === 'twilight' ? 'Dawn Amber' : 'Twilight Onyx'}`}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-secondary)',
                padding: '0.45rem',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {ambientMode === 'twilight' ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="btn-luxury-primary"
              data-cursor="RESERVE"
              style={{
                padding: '0.55rem 1.3rem',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                display: 'none',
              }}
              id="desktop-reserve-btn"
            >
              <Calendar size={13} />
              <span>Reserve Suite</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="mobile-menu-toggle"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 9, 11, 0.98)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            gap: '2.5rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.2rem',
                letterSpacing: '0.2em',
                color: 'var(--text-primary)',
              }}
            >
              ÉLYSIEN
            </span>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                color: 'var(--accent-gold)',
                letterSpacing: '0.2em',
                marginTop: '0.5rem',
              }}
            >
              SWISS ALPS · 1,850M
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.05em',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn-luxury-primary"
            style={{ marginTop: '1.5rem', width: '80%', maxWidth: '300px' }}
          >
            <Calendar size={15} />
            <span>Reserve Sanctuary</span>
          </button>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .telemetry-badge {
            display: inline-flex !important;
          }
          #desktop-reserve-btn {
            display: inline-flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
