"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);

  // relative coordinates from 0 to 1
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Map mouse positions to 3D rotation angles (-12 to 12 degrees)
  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), {
    stiffness: 120,
    damping: 18,
  });

  // Calculate mouse position inside the card bounding rect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`preserve-3d ${className}`}
    >
      {children}
    </motion.div>
  );
}
