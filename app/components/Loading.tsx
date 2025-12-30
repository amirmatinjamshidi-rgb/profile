/** @format */

"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export default function LoadingScreen({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const { progress } = useProgress();
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [internalProgress, setInternalProgress] = useState(0);

  const messages = [
    "Initializing Neural Engine...",
    "Loading 3D Geometry...",
    "Compiling Shaders...",
    "Optimizing Textures...",
    "Welcome to the Nexus.",
  ];

  useEffect(() => {
    const target = progress === 0 ? 100 : progress;
    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (internalProgress < 25) setTextIndex(0);
    else if (internalProgress < 50) setTextIndex(1);
    else if (internalProgress < 75) setTextIndex(2);
    else if (internalProgress < 100) setTextIndex(3);
    else setTextIndex(4);
  }, [internalProgress]);

  useEffect(() => {
    if (internalProgress >= 100) {
      const timeout = setTimeout(onFinished, 1000);
      return () => clearTimeout(timeout);
    }
  }, [internalProgress, onFinished]);

  useEffect(() => {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(messages[textIndex].slice(0, charIndex));
      charIndex++;
      if (charIndex > messages[textIndex].length) clearInterval(typingInterval);
    }, 30);
    return () => clearInterval(typingInterval);
  }, [textIndex]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#05070c]"
    >
      <div className="w-72 space-y-6 p-6">
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-emerald-400">
            <span>{displayedText}</span>
            <span>{Math.round(internalProgress)}%</span>
          </div>
          <div className="h-1 w-full bg-white/10 relative rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
              animate={{ width: `${internalProgress}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 20 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
