'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioEngineProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function AudioEngine({ isPlaying, onToggle }: AudioEngineProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize Web Audio graph
  const startAudioGraph = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain with smooth fade in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Harmonic Drone: 432Hz (Sacred frequency) & warm sub-octaves (108Hz, 216Hz, 324Hz)
      const frequencies = [108, 216, 324, 432];
      oscillatorsRef.current = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Subtle micro-detune for lush beating effect
        osc.detune.setValueAtTime(idx * 2 - 3, ctx.currentTime);

        // Low volume for gentle background presence
        oscGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);

        // LFO for breathing drone movement
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
        lfo.connect(lfoGain.gain);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscillatorsRef.current.push(osc);
      });

      // Ambient Mist Sound: Filtered Pink Noise with ocean-like sweep
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.015;
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Bandpass filter to make it sound like gentle thermal spring steam
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      noiseSource.connect(filter);
      filter.connect(masterGain);
      noiseSource.start();
      noiseSourceRef.current = noiseSource;

    } catch (e) {
      console.warn('Web Audio playback error:', e);
    }
  };

  const stopAudioGraph = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value, ctx.currentTime);
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);

      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch { /* ignore */ }
        });
        oscillatorsRef.current = [];
        try { noiseSourceRef.current?.stop(); } catch { /* ignore */ }
        noiseSourceRef.current = null;
      }, 1000);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAudioGraph();
    } else {
      stopAudioGraph();
    }

    return () => {
      stopAudioGraph();
    };
  }, [isPlaying]);

  const handleToggle = () => {
    setHasInteracted(true);
    onToggle();
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 ${
        isPlaying
          ? 'bg-amber-950/40 border-amber-500/50 text-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
          : 'bg-white/5 border-white/10 text-stone-400 hover:text-stone-200 hover:border-white/20'
      }`}
      title={isPlaying ? 'Mute Sanctuary Soundscape' : 'Play 432Hz Thermal Soundscape'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.45rem 0.9rem',
        borderRadius: '9999px',
        fontSize: '0.7rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-display)',
        cursor: 'pointer',
      }}
    >
      {isPlaying ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', height: '14px' }}>
            <span className="sound-bar animating" />
            <span className="sound-bar animating" />
            <span className="sound-bar animating" />
            <span className="sound-bar animating" />
          </div>
          <span>432Hz Soundscape</span>
        </>
      ) : (
        <>
          <VolumeX size={13} style={{ opacity: 0.7 }} />
          <span>Ambient Audio</span>
        </>
      )}
    </button>
  );
}
