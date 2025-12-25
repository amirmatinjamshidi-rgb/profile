/** @format */

"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Mounting Components...");

  useEffect(() => {
    const messages = [
      "Hydrating React tree...",
      "Injecting Tailwind styles...",
      "Optimizing Asset chunks...",
      "Fetching UI Layouts...",
      "Render Complete.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        if (prev % 20 === 0) {
          setText(messages[i]);
          i++;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#0b132b]"
    >
      <div className="w-72 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-emerald-500/60">
            <span>{text}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-px w-full bg-white/10 relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
