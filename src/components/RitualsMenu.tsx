'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, Sparkles, Plus, ArrowUpRight, Award } from 'lucide-react';

interface Ritual {
  id: string;
  category: 'cellular' | 'thermal' | 'neural';
  title: string;
  duration: string;
  price: string;
  tagline: string;
  description: string;
  botanicals: string[];
  protocol: string;
}

const ritualsList: Ritual[] = [
  {
    id: 'cellular-gold',
    category: 'cellular',
    title: 'Stem-Cell & 24K Gold Cellular Regeneration Facial',
    duration: '90 Minutes',
    price: '740 CHF',
    tagline: 'Epigenetic DNA repair & micronized gold antioxidant shield',
    description:
      'Utilizing cultivated Swiss Alpine Edelweiss stem cells, bio-placental peptides, and sheets of hammered 24-karat gold. Applied under gentle micro-current stimulation, this ritual restores cellular ATP, stimulates collagen synthesis, and dramatically brightens the skin matrix.',
    botanicals: ['Alpine Edelweiss Meristem', '24K Micronized Gold', 'Squalane & Rose Otto', 'Hyaluronic Spheres'],
    protocol: 'Enzyme Exfoliation → Micro-Current Infusion → 24K Mask → Cryo-Sculpting Wand',
  },
  {
    id: 'obsidian-truffle',
    category: 'thermal',
    title: 'Ceremonial Obsidian Stone & Piedmont Truffle Wrap',
    duration: '120 Minutes',
    price: '580 CHF',
    tagline: 'Deep thermal grounding with rare adaptogenic truffle enzymes',
    description:
      'Warm volcanic obsidian stones chiseled from Mount Etna are placed along subtle meridian pathways. The body is enveloped in a warm cocoon of rare white truffle extract and wild shea butter, dissolving years of deep muscular calcification and stress hormones.',
    botanicals: ['Piedmont White Truffle', 'Volcanic Ash Clay', 'Cold-Pressed Bergamot', 'Alpine Pine Resin'],
    protocol: 'Dry Botanical Brushing → Obsidian Placement → Truffle Cocoon → Acupressure Scalp Massage',
  },
  {
    id: 'cryo-fascial',
    category: 'thermal',
    title: 'Sub-Zero Cryo-Thermal Shock & Deep Fascial Sculpting',
    duration: '75 Minutes',
    price: '490 CHF',
    tagline: 'Vascular contrast therapy for systemic lymphatic drainage',
    description:
      'A synchronized oscillation between 42°C mineral steam towels and -10°C hyper-cooled vapor wands. This intense thermal contrast triggers profound lymphatic pumping, reduces systemic fluid retention, and accelerates full-body athletic and neural recovery.',
    botanicals: ['Wild Arnica Montana', 'Japanese Peppermint', 'Juniper Berry', 'Glacial Marine Mud'],
    protocol: 'Thermal Compress → Sub-Zero Localized Cryo → Percussive Fascial Therapy → Botanical Balm',
  },
  {
    id: 'hydro-acoustic',
    category: 'neural',
    title: 'Submerged Hydro-Acoustic 432Hz Sound Immersion',
    duration: '60 Minutes',
    price: '380 CHF',
    tagline: 'Underwater vibrational sound therapy for profound nervous system coherence',
    description:
      'Floated in warm magnesium water with customized ergonomic flotation headrests, underwater sonic transducers transmit pure 432Hz frequencies directly through bone conduction. Guests enter spontaneous theta and delta brainwave states within twelve minutes.',
    botanicals: ['Frankincense Vapor', 'Magnesium Chloride Brine', 'Neroli Hydrosol'],
    protocol: 'Magnesium Flotation → Soundwave Alignment → Somatic Breath Guidance → Tibetan Bowl Closure',
  },
  {
    id: 'arnica-lymphatic',
    category: 'neural',
    title: 'Alpine Arnica & Wild Juniper Lymphatic Reset',
    duration: '90 Minutes',
    price: '520 CHF',
    tagline: 'Full-body rhythmic lymphatic purge with high-altitude botanicals',
    description:
      'Gentle, ultra-precise manual lymphatic drainage using pure high-altitude Swiss Arnica harvested at 2,200 meters. Flushes cellular metabolic waste, restores immunological flow, and alleviates travel-induced inflammation and fatigue.',
    botanicals: ['Swiss High-Altitude Arnica', 'Wild Juniper Berry', 'Centella Asiatica', 'Cypress Essential Oil'],
    protocol: 'Aromatherapeutic Inhalation → Rhythmic Lymphatic Drain → Herbal Compress → Hydration Elixir',
  },
];

export default function RitualsMenu({ onSelectRitual }: { onSelectRitual: (ritual: Ritual) => void }) {
  const [filter, setFilter] = useState<'all' | 'cellular' | 'thermal' | 'neural'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('cellular-gold');

  const filteredRituals =
    filter === 'all' ? ritualsList : ritualsList.filter((r) => r.category === filter);

  return (
    <section
      id="rituals"
      style={{
        padding: '8rem 2.5rem',
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Header Strip with High Fashion Layout */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            gap: '2rem',
          }}
        >
          <div>
            <span className="subheading-label">Curated Longevity Protocols</span>
            <h2 className="heading-section" style={{ marginTop: '1rem' }}>
              The Ritual Menu & <br />
              <span className="gold-shimmer" style={{ fontStyle: 'italic' }}>
                Cellular Therapeutics.
              </span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap',
              background: 'rgba(7, 9, 11, 0.6)',
              padding: '0.4rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {[
              { id: 'all', label: 'All Protocols' },
              { id: 'cellular', label: 'Cellular Epigenetics' },
              { id: 'thermal', label: 'Thermal Detox' },
              { id: 'neural', label: 'Neural Coherence' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                style={{
                  background: filter === f.id ? 'var(--accent-gold)' : 'transparent',
                  color: filter === f.id ? '#07090b' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Visual Spotlight & Menu List Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Visual Highlight */}
          <div
            className="cinematic-image-wrapper"
            style={{
              position: 'relative',
              height: '580px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
            }}
          >
            <Image
              src="/images/cellular_ritual.jpg"
              alt="Élysien Cellular Facial Protocol"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(7, 9, 11, 0.92) 0%, rgba(7, 9, 11, 0.2) 60%)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                right: '2rem',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--accent-gold)',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.68rem',
                  color: 'var(--accent-gold-light)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                <Award size={13} />
                <span>Signature Master Protocol</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.85rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                The Epigenetic Regeneration Suite
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Every treatment at Élysien is tailored to your real-time heart rate variability, skin biomarker scan, and circadian metabolic phase.
              </p>
            </div>
          </div>

          {/* Right Column: Accordion-like Luxury Ritual Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {filteredRituals.map((ritual) => {
              const isExpanded = expandedId === ritual.id;

              return (
                <div
                  key={ritual.id}
                  className="glass-panel"
                  data-cursor="EXPAND"
                  onClick={() => setExpandedId(isExpanded ? null : ritual.id)}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    padding: '1.8rem',
                    border: isExpanded ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.4s var(--ease-cinematic)',
                    cursor: 'pointer',
                    backgroundColor: isExpanded ? 'rgba(212, 175, 55, 0.04)' : 'var(--glass-bg)',
                  }}
                >
                  {/* Card Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-gold)',
                          }}
                        >
                          {ritual.duration}
                        </span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.72rem',
                            letterSpacing: '0.12em',
                            color: 'var(--accent-gold-light)',
                            fontWeight: 600,
                          }}
                        >
                          {ritual.price}
                        </span>
                      </div>

                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.35rem',
                          color: 'var(--text-primary)',
                          fontWeight: 400,
                          lineHeight: 1.25,
                        }}
                      >
                        {ritual.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          color: 'var(--text-secondary)',
                          marginTop: '0.4rem',
                          fontStyle: 'italic',
                        }}
                      >
                        {ritual.tagline}
                      </p>
                    </div>

                    <button
                      style={{
                        background: isExpanded ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)',
                        border: 'none',
                        color: isExpanded ? '#07090b' : 'var(--text-secondary)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                      }}
                    >
                      <Plus
                        size={16}
                        style={{
                          transform: isExpanded ? 'rotate(45deg)' : 'none',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </button>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '1.5rem',
                        paddingTop: '1.5rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          lineHeight: 1.65,
                          color: 'var(--text-secondary)',
                          marginBottom: '1.2rem',
                        }}
                      >
                        {ritual.description}
                      </p>

                      {/* Active Botanicals */}
                      <div style={{ marginBottom: '1.2rem' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-gold)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          Bio-Active Formulations
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {ritual.botanicals.map((b) => (
                            <span
                              key={b}
                              style={{
                                padding: '0.3rem 0.7rem',
                                borderRadius: '9999px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                fontSize: '0.75rem',
                                color: 'var(--text-primary)',
                              }}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: '1.5rem',
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectRitual(ritual);
                          }}
                          className="btn-luxury-primary"
                          data-cursor="RESERVE"
                          style={{ padding: '0.7rem 1.6rem', fontSize: '0.72rem' }}
                        >
                          <span>Reserve This Ritual</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
