'use client';

import React, { useState } from 'react';
import { Sparkles, Compass, CheckCircle2, ArrowRight, RotateCcw, HeartHandshake } from 'lucide-react';

interface SensoryMatcherProps {
  onBookItinerary: (itinerary: { title: string; sequence: string[]; ritual: string; duration: string }) => void;
}

export default function SensoryMatcher({ onBookItinerary }: SensoryMatcherProps) {
  const [step, setStep] = useState<number>(1);
  const [intention, setIntention] = useState<string>('cellular');
  const [element, setElement] = useState<string>('water');
  const [duration, setDuration] = useState<string>('full-day');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const intentions = [
    {
      id: 'cellular',
      title: 'Mitochondrial Cellular Longevity',
      desc: 'Activate autophagy, clear senescence cells, and boost cellular energy.',
      icon: '🧬',
    },
    {
      id: 'sleep',
      title: 'Deep Restorative Circadian Reset',
      desc: 'Shift the nervous system into deep delta sleep and soothe cortisol.',
      icon: '🌙',
    },
    {
      id: 'neural',
      title: 'Emotional Stillness & Vagus Reset',
      desc: 'Quiet monkey-mind mental noise through 432Hz hydro-acoustics and magnesium.',
      icon: '🧘',
    },
    {
      id: 'athletic',
      title: 'Athletic Contrast Recovery',
      desc: 'Flush lactic buildup, repair connective fascial tissue, and stimulate dopamine.',
      icon: '⚡',
    },
  ];

  const elements = [
    { id: 'water', title: 'Geothermal Mineral Water', desc: '38.5°C Sulphur & Quartz Springs', icon: '💧' },
    { id: 'ice', title: 'Sub-Zero Glacial Ice', desc: '-10°C Himalayan Salt Cryo-Cavern', icon: '❄️' },
    { id: 'fire', title: 'Volcanic Basalt Smoke', desc: '85°C Hinoki Smoked Cedar Sauna', icon: '🔥' },
    { id: 'ether', title: 'Acoustic Sound Ether', desc: '432Hz Submerged Binaural Transducers', icon: '✨' },
  ];

  const durations = [
    { id: 'half-day', title: 'Half-Day Sanctuary Immersion', time: '4 Hours', desc: 'Access to 2 Chambers + 1 Custom Ritual' },
    { id: 'full-day', title: 'Full-Day Metabolic Metamorphosis', time: '8 Hours', desc: 'All 4 Chambers + 2 Rituals + Botanical Lunch' },
    { id: 'pilgrimage', title: '3-Day Alpine Cellular Retreat', time: '72 Hours', desc: 'Private Chalet Suite + Epigenetic Biomarker Plan' },
  ];

  const handleGenerate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setCompleted(true);
    }, 1200);
  };

  const resetDiagnostic = () => {
    setStep(1);
    setCompleted(false);
  };

  // Generate itinerary based on selections
  const getRecommendation = () => {
    if (intention === 'cellular') {
      return {
        title: 'The Epigenetic Autophagy Journey',
        chambers: [
          '01. Subterranean Geothermal Vault (38.5°C · 30m)',
          '02. Hinoki & Volcanic Basalt Smoke (85°C · 15m)',
          '03. Glacial Cryo-Cavern Plunge (-10°C · 3m)',
          '04. Celestial Sky Pool Recline (39°C · 45m)',
        ],
        ritual: 'Stem-Cell & 24K Gold Cellular Regeneration Facial',
        elixir: 'High-Altitude Pine Needle & Chaga Mushroom Adaptogenic Tonic',
        duration: duration === 'half-day' ? '4 Hours' : duration === 'full-day' ? '8 Hours' : '3 Days',
        cellularEndpoint: '340% Boost in Cellular Heat-Shock Proteins & Autophagy',
      };
    } else if (intention === 'sleep') {
      return {
        title: 'The Circadian Somnolence Protocol',
        chambers: [
          '01. Subterranean Magnesium Vault (38.5°C · 40m)',
          '02. Celestial Sky Pool Twilight Float (39°C · 30m)',
          '03. Submerged Hydro-Acoustic Resonance (34°C · 45m)',
        ],
        ritual: 'Ceremonial Obsidian Stone & White Truffle Wrap',
        elixir: 'Ashwagandha & Wild Lavender Evening Hydrosol',
        duration: duration === 'half-day' ? '4 Hours' : duration === 'full-day' ? '8 Hours' : '3 Days',
        cellularEndpoint: 'Delta Wave Transition within 18 minutes',
      };
    } else if (intention === 'neural') {
      return {
        title: 'The Sacred Silence & Vagus Attunement',
        chambers: [
          '01. Submerged 432Hz Hydro-Acoustic Chamber (34°C · 60m)',
          '02. Subterranean Geothermal Sulphur Springs (38.5°C · 30m)',
          '03. Hinoki Cypress Aromatherapy Deck (22°C · 30m)',
        ],
        ritual: 'Submerged Hydro-Acoustic 432Hz Sound Immersion',
        elixir: 'Wild Lemon Balm & Alpine Rose Quartz Infusion',
        duration: duration === 'half-day' ? '4 Hours' : duration === 'full-day' ? '8 Hours' : '3 Days',
        cellularEndpoint: 'Heart Rate Variability (HRV) Increase of 42%',
      };
    } else {
      return {
        title: 'The Glacial Vascular Shock Protocol',
        chambers: [
          '01. Hinoki Basalt Smoke Sauna (85°C · 20m)',
          '02. Glacial Cryo-Cavern Rapid Plunge (-10°C · 4m)',
          '03. Subterranean Hot Granite Pool (38.5°C · 25m)',
          '04. Celestial Sky Pool Recovery (39°C · 30m)',
        ],
        ritual: 'Sub-Zero Cryo-Thermal Shock & Deep Fascial Sculpting',
        elixir: 'Cold-Pressed Wild Blueberry & Schisandra Antioxidant Shot',
        duration: duration === 'half-day' ? '4 Hours' : duration === 'full-day' ? '8 Hours' : '3 Days',
        cellularEndpoint: '250% Sustained Natural Dopamine Elevation',
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <section
      id="diagnostic"
      style={{
        padding: '8rem 2.5rem',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="architectural-grid" />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="subheading-label" style={{ justifyContent: 'center' }}>
            Interactive Wellness Concierge
          </span>
          <h2 className="heading-section" style={{ marginTop: '1rem' }}>
            Calibrate Your <br />
            <span className="gold-shimmer" style={{ fontStyle: 'italic' }}>
              Personal Sanctuary Itinerary.
            </span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '1rem auto 0 auto',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Select your biological intention and primary elemental resonance. Our algorithm configures the optimal sequence of thermal chambers, rituals, and botanical tonics.
          </p>
        </div>

        {/* Interactive Concierge Box */}
        <div
          className="glass-panel-elevated"
          style={{
            borderRadius: 'var(--radius-lg)',
            padding: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {!completed ? (
            <div>
              {/* Stepper Progress */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      onClick={() => s < step && setStep(s)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: s < step ? 'pointer' : 'default',
                        opacity: step === s ? 1 : step > s ? 0.8 : 0.4,
                      }}
                    >
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: step === s ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.1)',
                          color: step === s ? '#07090b' : 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {s}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: step === s ? 'var(--accent-gold-light)' : 'var(--text-muted)',
                        }}
                      >
                        {s === 1 ? 'Intention' : s === 2 ? 'Element' : 'Duration'}
                      </span>
                    </div>
                  ))}
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.15em',
                  }}
                >
                  STEP 0{step} OF 03
                </span>
              </div>

              {/* Step 1: Intention */}
              {step === 1 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.6rem',
                      marginBottom: '1.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    What is your core biological intention?
                  </h3>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '1.2rem',
                      marginBottom: '2.5rem',
                    }}
                  >
                    {intentions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setIntention(item.id)}
                        data-cursor="CHOOSE"
                        style={{
                          padding: '1.8rem',
                          borderRadius: 'var(--radius-md)',
                          background: intention === item.id ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                          border: intention === item.id ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>
                          {item.icon}
                        </span>
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.15rem',
                            color: 'var(--text-primary)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => setStep(2)} className="btn-luxury-primary" data-cursor="NEXT">
                      <span>Proceed to Elements</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Elemental Resonance */}
              {step === 2 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.6rem',
                      marginBottom: '1.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Which natural element calls your physical body?
                  </h3>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '1.2rem',
                      marginBottom: '2.5rem',
                    }}
                  >
                    {elements.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setElement(item.id)}
                        data-cursor="CHOOSE"
                        style={{
                          padding: '1.8rem',
                          borderRadius: 'var(--radius-md)',
                          background: element === item.id ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                          border: element === item.id ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.8rem' }}>
                          {item.icon}
                        </span>
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.15rem',
                            color: 'var(--text-primary)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => setStep(1)} className="btn-luxury-secondary">
                      <span>Previous</span>
                    </button>
                    <button onClick={() => setStep(3)} className="btn-luxury-primary" data-cursor="NEXT">
                      <span>Choose Duration</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Duration & Calculate */}
              {step === 3 && (
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.6rem',
                      marginBottom: '1.5rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Select your desired immersion horizon:
                  </h3>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.2rem',
                      marginBottom: '2.5rem',
                    }}
                  >
                    {durations.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setDuration(item.id)}
                        data-cursor="CHOOSE"
                        style={{
                          padding: '1.8rem',
                          borderRadius: 'var(--radius-md)',
                          background: duration === item.id ? 'rgba(212, 175, 55, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                          border: duration === item.id ? '1px solid var(--accent-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.2em',
                            color: 'var(--accent-gold)',
                            display: 'block',
                            marginBottom: '0.4rem',
                          }}
                        >
                          {item.time}
                        </span>
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.2rem',
                            color: 'var(--text-primary)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => setStep(2)} className="btn-luxury-secondary">
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={isCalculating}
                      className="btn-luxury-primary"
                      data-cursor="GENERATE"
                    >
                      {isCalculating ? (
                        <>
                          <div className="sound-bar animating" />
                          <span>Synthesizing Biomarkers...</span>
                        </>
                      ) : (
                        <>
                          <span>Reveal Calibrated Itinerary</span>
                          <Sparkles size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div style={{ animation: 'fadeIn 0.6s ease' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(58, 117, 99, 0.2)',
                  border: '1px solid var(--accent-jade)',
                  marginBottom: '1.5rem',
                }}
              >
                <CheckCircle2 size={14} color="#6ee7b7" />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#6ee7b7',
                  }}
                >
                  Diagnostic Resonance Confirmed
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(2rem, 3.2vw, 2.5rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.15,
                    }}
                  >
                    {recommendation.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      color: 'var(--accent-gold-light)',
                      marginTop: '0.5rem',
                      fontStyle: 'italic',
                    }}
                  >
                    Target Endpoint: {recommendation.cellularEndpoint}
                  </p>
                </div>

                <button
                  onClick={resetDiagnostic}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-secondary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Recalibrate</span>
                </button>
              </div>

              {/* Itinerary Grid Breakdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  marginBottom: '2.5rem',
                }}
              >
                {/* Sequence of Chambers */}
                <div
                  className="glass-panel"
                  style={{ padding: '1.8rem', borderRadius: 'var(--radius-md)' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                      marginBottom: '1rem',
                    }}
                  >
                    Thermal Chamber Flow
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {recommendation.chambers.map((ch, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: '0.88rem',
                          color: 'var(--text-primary)',
                          borderLeft: '2px solid var(--accent-gold)',
                          paddingLeft: '0.75rem',
                        }}
                      >
                        {ch}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treatment & Elixir */}
                <div
                  className="glass-panel"
                  style={{ padding: '1.8rem', borderRadius: 'var(--radius-md)' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                      marginBottom: '1rem',
                    }}
                  >
                    Master Protocol & Elixir
                  </p>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Primary Treatment:
                    </span>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500, marginTop: '0.2rem' }}>
                      {recommendation.ritual}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Adaptogenic Botanical Tonic:
                    </span>
                    <p style={{ fontSize: '0.95rem', color: 'var(--accent-gold-light)', marginTop: '0.2rem' }}>
                      {recommendation.elixir}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '1.5rem',
                }}
              >
                <button
                  onClick={() =>
                    onBookItinerary({
                      title: recommendation.title,
                      sequence: recommendation.chambers,
                      ritual: recommendation.ritual,
                      duration: recommendation.duration,
                    })
                  }
                  className="btn-luxury-primary"
                  data-cursor="RESERVE"
                >
                  <HeartHandshake size={16} />
                  <span>Reserve This Calibrated Itinerary</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
