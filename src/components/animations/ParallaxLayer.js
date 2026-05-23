"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxLayer({
  children,
  scrollRange = [0, 1],
  yRange = [0, -100],
  className = "",
  floatAmplitude = 12,
  floatDuration = 6,
  rotateAmplitude = 2,
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, scrollRange, yRange);

  return (
    <motion.div
      className={className}
      style={{ y }}
      animate={{
        y: [0, -floatAmplitude, 0, floatAmplitude * 0.5, 0],
        rotate: [-rotateAmplitude, rotateAmplitude, -rotateAmplitude],
      }}
      transition={{
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: floatDuration * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}
