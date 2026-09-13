'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentRingPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only show custom cursor on desktop devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if target or parent has data-cursor attribute
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsActive(true);
      } else if (target.closest('button, a, input, select, textarea')) {
        setCursorText('');
        setIsActive(true);
      } else {
        setCursorText('');
        setIsActive(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop for outer ring
    const updateRing = () => {
      currentRingPos.current.x += (targetPos.current.x - currentRingPos.current.x) * 0.15;
      currentRingPos.current.y += (targetPos.current.y - currentRingPos.current.y) * 0.15;
      setRingPos({ x: currentRingPos.current.x, y: currentRingPos.current.y });
      requestRef.current = requestAnimationFrame(updateRing);
    };

    requestRef.current = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner precise dot */}
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Outer ambient trailing halo */}
      <div
        className={`custom-cursor-ring ${isActive ? 'active' : ''}`}
        style={{
          transform: `translate(${ringPos.x - (isActive ? 40 : 22)}px, ${
            ringPos.y - (isActive ? 40 : 22)
          }px)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {cursorText && <span className="custom-cursor-text">{cursorText}</span>}
      </div>
    </>
  );
}
