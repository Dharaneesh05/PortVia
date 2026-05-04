"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RxGithubLogo } from "react-icons/rx";
import { HiExternalLink } from "react-icons/hi";

import { slideInFromTop } from "@/lib/motion";
import { OrbitalProjectCard } from "@/components/sub/orbital-project-card";
import { PROJECTS } from "@/constants";

const RADIUS = 550;
const TOTAL_PROJECTS = PROJECTS.length;

export const Encryption = () => {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0);

  // Removed auto-rotation - user controls via scroll only

  // Smooth rotation to target when clicked
  useEffect(() => {
    if (!isPaused || Math.abs(rotation - targetRotation) < 0.01) return;

    const interval = setInterval(() => {
      setRotation((prev) => {
        const diff = targetRotation - prev;
        if (Math.abs(diff) < 0.01) return targetRotation;
        return prev + diff * 0.1;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isPaused, targetRotation, rotation]);

  // Handle scroll for manual rotation
  useEffect(() => {
    let lastScrollTime = Date.now();
    
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        const now = Date.now();
        const timeDiff = now - lastScrollTime;
        lastScrollTime = now;
        
        // Smoother scroll with better dampening
        const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
        const smoothFactor = Math.min(timeDiff / 20, 1);
        setRotation((prev) => prev + delta * 0.001 * smoothFactor);
        setActiveIndex(-1); // Deselect when scrolling
      }
    };

    const container = document.getElementById('projects');
    container?.addEventListener('wheel', handleWheel, { passive: false });

    return () => container?.removeEventListener('wheel', handleWheel);
  }, []);

  // Calculate position for each project on the ring
  const getPosition = (index: number) => {
    const angleStep = (2 * Math.PI) / TOTAL_PROJECTS;
    const angle = angleStep * index + rotation;

    // If this card is focused, it breaks out of orbit (handled in card component)
    if (index === activeIndex && isPaused) {
      return {
        x: 0,
        z: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
      };
    }

    const x = Math.cos(angle) * RADIUS;
    const z = Math.sin(angle) * RADIUS;

    // Scale based on depth (z position) - closer = bigger
    const depthScale = 0.65 + ((z + RADIUS) / (2 * RADIUS)) * 0.55;

    // Improved opacity for orbit preview cards
    let opacity = z < -RADIUS * 0.3 ? 0.7 : 1;
    
    // If a card is selected, dim all others
    if (activeIndex !== -1 && isPaused) {
      opacity = 0;
    }

    // Rotate card slightly based on angle for depth effect
    const rotateY = -(Math.cos(angle) * 12);

    return {
      x,
      z,
      scale: depthScale,
      opacity,
      rotateY,
    };
  };

  const handleProjectClick = (index: number) => {
    // If clicking the same card, deselect it
    if (activeIndex === index) {
      setActiveIndex(-1);
      setIsPaused(false);
      return;
    }

    setActiveIndex(index);
    setIsPaused(true);

    // Calculate target rotation to bring this project to front (angle 0)
    const angleStep = (2 * Math.PI) / TOTAL_PROJECTS;
    const target = -angleStep * index;
    setTargetRotation(target);
  };

  return (
    <div
      id="projects"
      className="flex flex-col relative items-center justify-center min-h-screen w-full h-full -mt-20 pt-20 overflow-hidden"
    >
      {/* Projects Heading */}
      <div className="absolute w-full h-auto top-10 z-[60] flex justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInFromTop}
          className="text-4xl md:text-5xl font-extrabold text-white text-center mt-7"
        >
          Projects
        </motion.div>
      </div>

      {/* Orbital Ring Container */}
      <div className="relative w-full h-full flex items-center justify-center -mt-40">
        {/* Subtle Decorative Orbit Ring */}
        <div className="absolute w-[900px] h-[900px] rounded-full border border-dashed border-purple-500/5" />
        
        {/* Center subtle glow */}
        <div className="absolute w-24 h-24 rounded-full bg-purple-500/10 blur-3xl" />

        {/* Background blur overlay when project is focused */}
        {isPaused && activeIndex !== -1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-40"
            onClick={() => {
              setActiveIndex(-1);
              setIsPaused(false);
            }}
          />
        )}

        {/* Project Cards in Orbit */}
        <div className="relative w-full h-[900px] flex items-center justify-center perspective-[2000px]">
          {PROJECTS.map((project, index) => {
            const position = getPosition(index);
            const isFocused = index === activeIndex && isPaused;

            return (
              <OrbitalProjectCard
                key={project.id}
                project={project}
                position={position}
                isFocused={isFocused}
                onClick={() => handleProjectClick(index)}
              />
            );
          })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-24 z-[60] flex gap-2.5">
        {PROJECTS.map((_, index) => (
          <button
            key={index}
            onClick={() => handleProjectClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex && isPaused
                ? "bg-purple-500 w-8 shadow-lg shadow-purple-500/50"
                : "bg-white/20 w-2 hover:bg-white/40"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

