'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Thermometer, Droplet, Wind, Eye, Check } from 'lucide-react';

interface Sanctuary {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  temperature: string;
  element: string;
  minerals: string;
  image: string;
  description: string;
  benefits: string[];
  specs: {
    depth: string;
    atmosphere: string;
    acoustic: string;
  };
}

const sanctuariesData: Sanctuary[] = [
  {
    id: 'subterranean-vault',
    number: '01',
    name: 'Subterranean Geothermal Vault',
    subtitle: 'The Primordial Mineral Cavern',
    temperature: '38.5°C',
    element: 'Geothermal Mineral Water',
    minerals: 'Magnesium · Sulphur · Quartz Silica',
    image: '/images/subterranean_vault.jpg',
    description:
      'Chiseled 40 meters beneath the Alpine massif, this cavern harnesses pure volcanic mineral springs that have filtered through granite for over three millennia. The water is naturally charged with bio-available minerals that ease deep musculoskeletal tension and induce profound theta brainwave states.',
    benefits: ['Deep Musculoskeletal Relief', 'Cellular Mineral Absorption', 'Vagus Nerve Reset'],
    specs: {
      depth: '1.4m Submerged Depth',
      atmosphere: 'Misty Quartz Steam (98% RH)',
      acoustic: 'Water-Dampened Cathedral Reverb',
    },
  },
  {
    id: 'hinoki-sauna',
    number: '02',
    name: 'Hinoki & Basalt Smoke Sauna',
    subtitle: 'Nordic-Japanese Thermal Metamorphosis',
    temperature: '85.0°C',
    element: 'Volcanic Dry Heat & Smoked Cedar',
    minerals: 'Phytoncides · Volcanic Basalt Infusion',
    image: '/images/hinoki_sauna.jpg',
    description:
      'Crafted from sustainably reclaimed Japanese Hinoki cypress wood and thermal volcanic rock from Mount Etna. As water infused with wild alpine pine and wintergreen is poured onto the glowing stones, aromatic phytoncides stimulate immune cellular defense and cellular autophagy.',
    benefits: ['Heat Shock Protein Activation', 'Cardiovascular Elasticity', 'Botanical Respiratory Detox'],
    specs: {
      depth: 'Tiered Ergonomic Benches',
      atmosphere: '18% Humidity Dry Heat',
      acoustic: 'Crackle of Volcanic Hearth',
    },
  },
  {
    id: 'cryo-cascade',
    number: '03',
    name: 'Glacial Cryo-Cavern & Ice Cascade',
    subtitle: 'Vascular Longevity & Mitochondrial Spark',
    temperature: '-10.0°C',
    element: 'Sub-Zero Glacial Ice & Himalayan Salt',
    minerals: 'Pure Glacial Meltwater · Micronized Salt',
    image: '/images/cryo_cascade.jpg',
    description:
      'A crystalline sanctuary carved out of glacial frost and mineral ice. Following the thermal heat chambers, a plunge into the glacial pool triggers immediate vasoconstriction, flooding vital organs with oxygenated blood, spiking dopamine by 250%, and stimulating mitochondrial biogenesis.',
    benefits: ['250% Natural Dopamine Surge', 'Systemic Inflammation Quenching', 'Brown Adipose Activation'],
    specs: {
      depth: '1.2m Rapid Plunge Bath',
      atmosphere: 'Sub-Zero Vapor Cascade',
      acoustic: 'Gentle Glacial Drip Melody',
    },
  },
  {
    id: 'celestial-pool',
    number: '04',
    name: 'Celestial Moonlit Sky Pool',
    subtitle: 'The Horizon of Pure Weightlessness',
    temperature: '39.0°C',
    element: 'Open-Air Heated Infinity Waters',
    minerals: 'Lithium Trace · Celtic Sea Salts',
    image: '/images/celestial_pool.jpg',
    description:
      'Suspended 1,850 meters above sea level with a cantilevered glass perimeter extending into the alpine valley. Guests recline in 39°C geothermal buoyancy beneath the crystal-clear Milky Way galaxy and swirling alpine mists, with open hearth fire pits along the stone deck.',
    benefits: ['Circadian Rhythm Re-alignment', 'Sensory Expansion & Clarity', 'Subtle Lithium Calming'],
    specs: {
      depth: '1.3m Cantilevered Edge',
      atmosphere: 'Crisp Mountain Breeze & Fire Glow',
      acoustic: 'Alpine Wind Whispers',
    },
  },
];

export default function SanctuariesSection({ onSelectSanctuary }: { onSelectSanctuary: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeSanctuary = sanctuariesData[activeTab];

  return (
    <section
      id="sanctuaries"
      style={{
        position: 'relative',
        padding: '8rem 2.5rem',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden',
      }}
    >
      <div className="architectural-grid" />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="subheading-label">The Elemental Architecture</span>
          <h2 className="heading-section" style={{ marginTop: '1rem', maxWidth: '800px' }}>
            Four Sacred Chambers of <br />
            <span className="gold-shimmer" style={{ fontStyle: 'italic' }}>
              Thermal Metamorphosis.
            </span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              marginTop: '1.2rem',
              maxWidth: '650px',
              fontSize: '1.05rem',
              lineHeight: 1.6,
            }}
          >
            Each sanctuary is mathematically calibrated to transition your biological state from sympathetic fight-or-flight into profound parasympathetic cellular repair.
          </p>
        </div>

        {/* Tab Navigation Strip */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '1.5rem',
            marginBottom: '3rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {sanctuariesData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(index)}
              data-cursor="SELECT"
              style={{
                background: activeTab === index ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                border: activeTab === index ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '1rem 1.8rem',
                borderRadius: 'var(--radius-md)',
                color: activeTab === index ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.4s var(--ease-cinematic)',
                minWidth: '220px',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: activeTab === index ? 'var(--accent-gold)' : 'var(--text-muted)',
                  marginBottom: '0.3rem',
                }}
              >
                CHAMBER {item.number}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  color: activeTab === index ? 'var(--accent-gold-light)' : 'var(--text-muted)',
                  marginTop: '0.25rem',
                }}
              >
                {item.temperature}
              </div>
            </button>
          ))}
        </div>

        {/* Active Chamber Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Visual Showcase */}
          <div
            className="cinematic-image-wrapper"
            data-cursor="EXPAND"
            style={{
              position: 'relative',
              height: '520px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <Image
              src={activeSanctuary.image}
              alt={activeSanctuary.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{
                objectFit: 'cover',
                transition: 'transform 1s var(--ease-cinematic)',
              }}
            />

            {/* Chamber Floating Badges */}
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                display: 'flex',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(7, 9, 11, 0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-gold-light)',
                  letterSpacing: '0.1em',
                }}
              >
                <Thermometer size={14} color="var(--accent-gold)" />
                <span>{activeSanctuary.temperature}</span>
              </div>

              <div
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(7, 9, 11, 0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Droplet size={13} color="var(--accent-thermal-cyan)" />
                <span>{activeSanctuary.element}</span>
              </div>
            </div>

            {/* Bottom Scrim */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem',
                background: 'linear-gradient(to top, rgba(7, 9, 11, 0.95), transparent)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                }}
              >
                Mineral Profile
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  marginTop: '0.3rem',
                }}
              >
                {activeSanctuary.minerals}
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Architectural & Biological Specs */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              Chamber {activeSanctuary.number} · {activeSanctuary.subtitle}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                fontWeight: 300,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              {activeSanctuary.name}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                fontWeight: 300,
              }}
            >
              {activeSanctuary.description}
            </p>

            {/* Biological Benefits Checklist */}
            <div style={{ marginBottom: '2.5rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold-light)',
                  marginBottom: '1rem',
                }}
              >
                Verified Biological Endpoints
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {activeSanctuary.benefits.map((b) => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(58, 117, 99, 0.25)',
                        border: '1px solid var(--accent-jade)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Check size={11} color="#6ee7b7" />
                    </div>
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specification Box */}
            <div
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Dimensions
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {activeSanctuary.specs.depth}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Microclimate
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {activeSanctuary.specs.atmosphere}
                </p>
              </div>

              <div>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Resonance
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {activeSanctuary.specs.acoustic}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectSanctuary(activeSanctuary.id)}
              className="btn-luxury-primary"
              data-cursor="RESERVE"
              style={{ padding: '0.9rem 2rem' }}
            >
              <span>Reserve Chamber Access</span>
              <Sparkles size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
