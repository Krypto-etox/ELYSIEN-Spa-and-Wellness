'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, Mountain, Sparkles, Plus, Info } from 'lucide-react';

interface MaterialHotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  material: string;
  description: string;
}

const hotspots: MaterialHotspot[] = [
  {
    id: 'quartzite',
    x: 65,
    y: 62,
    title: 'Valser Quartzite Slabs',
    material: 'Locally Chiseled Metamorphic Stone',
    description:
      'Over 60,000 individually cut slabs of regional quartzite stacked with 1mm tolerances. The stone retains radiant thermal heat and possesses high mica luminescence.',
  },
  {
    id: 'glass',
    x: 48,
    y: 48,
    title: 'Triple-Glazed Bronze Panorama',
    material: 'Argon-Filled Thermal Facades',
    description:
      'Massive 6-meter-high frameless panes offer unbroken visual continuity between the heated indoor mineral baths and the snow-dusted alpine pines.',
  },
  {
    id: 'aquifer',
    x: 25,
    y: 78,
    title: 'The Subterranean Spring Conduits',
    material: 'Granite Aquifer Boring',
    description:
      'Direct gravity-fed pipeline drawing pure 38.5°C mineral water from a deep subterranean fissure 400 meters below the mountain peak.',
  },
];

export default function ArchitectureSection() {
  const [activeHotspot, setActiveHotspot] = useState<MaterialHotspot | null>(hotspots[0]);

  return (
    <section
      id="architecture"
      style={{
        padding: '8rem 2.5rem',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '850px', marginBottom: '4rem' }}>
          <span className="subheading-label">Architectural Manifesto</span>
          <h2 className="heading-section" style={{ marginTop: '1rem' }}>
            The Poetry of Stone, <br />
            <span className="gold-shimmer" style={{ fontStyle: 'italic' }}>
              Shadow & Subterranean Silence.
            </span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              marginTop: '1.2rem',
              fontSize: '1.05rem',
              lineHeight: 1.65,
            }}
          >
            Conceived as an excavation rather than a construction. The sanctuary is embedded directly into the living granite cliff of the Engadin Valley, creating a microclimatic cocoon where interior silence drops to 24 decibels.
          </p>
        </div>

        {/* Interactive Architectural Canvas with Hotspots */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Image with Interactive Material Pins */}
          <div
            className="cinematic-image-wrapper"
            style={{
              position: 'relative',
              height: '560px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <Image
              src="/images/architecture_exterior.jpg"
              alt="Élysien Sanctuary Monolithic Stone Architecture"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              style={{ objectFit: 'cover' }}
            />

            {/* Scrim */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(7, 9, 11, 0.2)',
                pointerEvents: 'none',
              }}
            />

            {/* Interactive Pins */}
            {hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot)}
                data-cursor="INSPECT"
                style={{
                  position: 'absolute',
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: activeHotspot?.id === spot.id ? 'var(--accent-gold)' : 'rgba(7, 9, 11, 0.85)',
                  border: '2px solid var(--accent-gold)',
                  color: activeHotspot?.id === spot.id ? '#07090b' : 'var(--accent-gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 25px rgba(212, 175, 55, 0.5)',
                  transition: 'all 0.4s var(--ease-cinematic)',
                  zIndex: 20,
                }}
              >
                <Plus size={16} style={{ transform: activeHotspot?.id === spot.id ? 'rotate(45deg)' : 'none' }} />
              </button>
            ))}

            {/* Helper label */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(7, 9, 11, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
              }}
            >
              <Info size={13} color="var(--accent-gold)" />
              <span>Click Hotspots to Inspect Materials</span>
            </div>
          </div>

          {/* Right Column: Selected Material Card & Philosophical Manifesto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Active Material Inspection Card */}
            {activeHotspot && (
              <div
                className="glass-panel-elevated"
                style={{
                  padding: '2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--accent-gold)',
                  animation: 'fadeIn 0.4s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <Layers size={16} color="var(--accent-gold)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.2em',
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Materiality Focus
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.8rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.3rem',
                  }}
                >
                  {activeHotspot.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.78rem',
                    color: 'var(--accent-gold-light)',
                    marginBottom: '1rem',
                  }}
                >
                  {activeHotspot.material}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {activeHotspot.description}
                </p>
              </div>
            )}

            {/* Architectural Philosophy Quote */}
            <div
              style={{
                borderLeft: '2px solid var(--accent-gold)',
                paddingLeft: '1.8rem',
                marginTop: '1rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'var(--text-primary)',
                }}
              >
                “Architecture here does not impose itself upon the mountain; it yields to the mountain. Stone, water, and shadow become one seamless temple of presence.”
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  color: 'var(--text-muted)',
                  marginTop: '0.8rem',
                  textTransform: 'uppercase',
                }}
              >
                — Atelier Élysien & Kengo Kuma Design Syndicate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
