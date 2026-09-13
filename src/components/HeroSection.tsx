'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Sparkles, ArrowDown, ShieldCheck, Waves } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExplore: () => void;
}

export default function HeroSection({ onOpenBooking, onExplore }: HeroSectionProps) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '8rem 2.5rem 4rem 2.5rem',
        overflow: 'hidden',
      }}
    >
      {/* Background Visual Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/hero_thermal_bath.jpg"
          alt="Élysien Sanctuary Cantilevered Alpine Thermal Bath"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center 40%',
            filter: 'brightness(0.65) contrast(1.08)',
            transform: 'scale(1.02)',
            transition: 'transform 12s ease-out',
          }}
        />

        {/* Cinematic multi-stop gradient scrims */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(7, 9, 11, 0.96) 0%, rgba(7, 9, 11, 0.6) 35%, rgba(7, 9, 11, 0.25) 70%, rgba(7, 9, 11, 0.7) 100%)',
          }}
        />

        {/* Ambient radial lighting glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Top Eyebrow Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.2rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <ShieldCheck size={14} color="var(--accent-gold)" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold-light)',
              }}
            >
              World Luxury Sanctuary Winner 2025/2026
            </span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <Waves size={14} color="var(--accent-thermal-cyan)" />
            <span>Engadin Aquifers · 38.5°C Geothermal</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div style={{ maxWidth: '1050px', marginBottom: '2rem' }}>
          <h1 className="heading-hero">
            Where Water Remembers <br />
            <span className="gold-shimmer" style={{ fontStyle: 'italic', fontWeight: 400 }}>
              Its Sacred Divinity.
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              marginTop: '1.5rem',
              fontWeight: 300,
            }}
          >
            Carved directly into monolithic Swiss alpine granite, Élysien unifies 3,000-year-old
            geothermal thermal springs with cellular longevity therapies to recalibrate the human
            nervous system.
          </p>
        </div>

        {/* Actions & Telemetry Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem' }}>
            <button
              onClick={onOpenBooking}
              className="btn-luxury-primary"
              data-cursor="RESERVE"
            >
              <span>Begin Your Pilgrimage</span>
              <Sparkles size={16} />
            </button>

            <a
              href="#sanctuaries"
              onClick={onExplore}
              className="btn-luxury-secondary"
              data-cursor="DISCOVER"
              style={{ textDecoration: 'none' }}
            >
              <span>Explore The Chambers</span>
              <ArrowDown size={15} />
            </a>
          </div>

          {/* Sanctuary Telemetry Gauges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                Mineral Source
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                  marginTop: '0.2rem',
                }}
              >
                38.5°C
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', marginLeft: '4px' }}>
                  Granite Spring
                </span>
              </p>
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                Alpine Elevation
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                  marginTop: '0.2rem',
                }}
              >
                1,850m
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>
                  Above Clouds
                </span>
              </p>
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}
              >
                Sonic Tuning
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                  marginTop: '0.2rem',
                }}
              >
                432Hz
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-jade)', marginLeft: '4px' }}>
                  Bio-Resonance
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
