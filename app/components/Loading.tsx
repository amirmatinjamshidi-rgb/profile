/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/** @format */

"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const messages = [
    "Hydrating React tree...",
    "Injecting Tailwind styles...",
    "Optimizing Asset chunks...",
    "Fetching UI Layouts...",
    "Render Complete.",
  ];

  useEffect(() => {
    let i = 0;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        if (prev % 20 === 0 && i < messages.length) {
          setTextIndex(i);
          i++;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(messages[textIndex].slice(0, charIndex));
      charIndex++;
      if (charIndex > messages[textIndex].length) {
        clearInterval(typingInterval);
      }
    }, 35);
    return () => clearInterval(typingInterval);
  }, [textIndex]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b132b]"
    >
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
        className="w-72 space-y-6 p-6 bg-[#0b132b]/80 rounded-xl backdrop-blur-md shadow-lg"
      >
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-emerald-400 glow-text">
            <span>{displayedText}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-white/10 relative rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="h-full bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600 shadow-[0_0_15px_#10b981] glow-bar"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
