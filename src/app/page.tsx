'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SanctuariesSection from '@/components/SanctuariesSection';
import RitualsMenu from '@/components/RitualsMenu';
import SensoryMatcher from '@/components/SensoryMatcher';
import ArchitectureSection from '@/components/ArchitectureSection';
import BookingDrawer from '@/components/BookingDrawer';
import Footer from '@/components/Footer';
import MistCanvas from '@/components/MistCanvas';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  const [ambientMode, setAmbientMode] = useState<'twilight' | 'dawn'>('twilight');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedRitual, setSelectedRitual] = useState<string>('');
  const [selectedItinerary, setSelectedItinerary] = useState<{
    title: string;
    ritual: string;
    duration: string;
  } | null>(null);

  // Sync ambient mode attribute to root
  useEffect(() => {
    document.documentElement.setAttribute('data-ambient', ambientMode);
  }, [ambientMode]);

  const toggleAmbient = () => {
    setAmbientMode((prev) => (prev === 'twilight' ? 'dawn' : 'twilight'));
  };

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const handleOpenBooking = () => {
    setSelectedRitual('');
    setSelectedItinerary(null);
    setIsBookingOpen(true);
  };

  const handleSelectRitual = (ritual: { title: string }) => {
    setSelectedRitual(ritual.title);
    setIsBookingOpen(true);
  };

  const handleSelectSanctuary = (sanctuaryId: string) => {
    setIsBookingOpen(true);
  };

  const handleBookItinerary = (itinerary: {
    title: string;
    sequence: string[];
    ritual: string;
    duration: string;
  }) => {
    setSelectedItinerary({
      title: itinerary.title,
      ritual: itinerary.ritual,
      duration: itinerary.duration,
    });
    setIsBookingOpen(true);
  };

  return (
    <main
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* Interactive Fluid Thermal Vapor Particles */}
      <MistCanvas />

      {/* Magnetic Luxury Cursor with Context Badges */}
      <CustomCursor />

      {/* Luxury Floating Glassmorphic Nav */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        ambientMode={ambientMode}
        onToggleAmbient={toggleAmbient}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAudio}
      />

      {/* Cinematic Hero */}
      <HeroSection
        onOpenBooking={handleOpenBooking}
        onExplore={() => {
          document.getElementById('sanctuaries')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* The Four Elemental Sanctuaries */}
      <SanctuariesSection onSelectSanctuary={handleSelectSanctuary} />

      {/* Curated Longevity Protocols & Rituals Menu */}
      <RitualsMenu onSelectRitual={handleSelectRitual} />

      {/* Interactive Algorithmic Sensory Matcher */}
      <SensoryMatcher onBookItinerary={handleBookItinerary} />

      {/* Architecture, Valser Quartzite & Materiality Hotspots */}
      <ArchitectureSection />

      {/* Luxury Closing Manifesto & Coordinates */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Slide-over VIP Concierge Booking Drawer */}
      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedRitual={selectedRitual}
        preselectedItinerary={selectedItinerary}
      />
    </main>
  );
}
