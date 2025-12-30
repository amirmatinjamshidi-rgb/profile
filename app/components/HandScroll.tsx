/**
 * eslint-disable react-hooks/purity
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect, useState } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function HandScroll() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPinching, setIsPinching] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const requestRef = useRef<number>(0);

  const scrollData = useRef({
    currentY: 0,
    targetY: 0,
    lastHandY: 0,
    isFirstPinch: true,
  });

  const calculateDistance = (p1: any, p2: any) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  const initHandTracking = async () => {
    setLoading(true);
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
          setLoading(false);
          setActive(true);
          scrollData.current.currentY = window.scrollY;
          predict(handLandmarker);
        };
      }
    } catch (err) {
      console.error("Webcam access denied or MediaPipe failed", err);
      setLoading(false);
    }
  };

  const predict = (handLandmarker: HandLandmarker) => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      const results = handLandmarker.detectForVideo(
        videoRef.current,
        performance.now()
      );

      if (results.landmarks && results.landmarks[0]) {
        const hand = results.landmarks[0];
        const thumbTip = hand[4];
        const indexTip = hand[8];
        const handY = indexTip.y;

        const dist = calculateDistance(thumbTip, indexTip);
        const pinching = dist < 0.04;
        setIsPinching(pinching);

        if (pinching) {
          if (scrollData.current.isFirstPinch) {
            scrollData.current.lastHandY = handY;
            scrollData.current.isFirstPinch = false;
          }

          const deltaY = (handY - scrollData.current.lastHandY) * 1.25;
          scrollData.current.targetY +=
            deltaY * document.documentElement.scrollHeight;
          scrollData.current.lastHandY = handY;
        } else {
          scrollData.current.isFirstPinch = true;
        }
      }
    }

    scrollData.current.targetY = Math.max(
      0,
      Math.min(
        scrollData.current.targetY,
        document.documentElement.scrollHeight - window.innerHeight
      )
    );
    const lerpY =
      window.scrollY + (scrollData.current.targetY - window.scrollY) * 0.15;
    window.scrollTo(0, lerpY);

    requestRef.current = requestAnimationFrame(() => predict(handLandmarker));
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (videoRef.current?.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-100 flex flex-col items-center gap-6">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="hidden"
      />

      <div className="flex gap-4 items-center bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-2xl">
        <button
          onClick={() =>
            active ? window.location.reload() : initHandTracking()
          }
          className={`px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${
            active
              ? "bg-red-500/20 text-red-400 border border-red-500/50"
              : "bg-emerald-500 text-black hover:scale-105"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              active ? "bg-red-500 animate-pulse" : "bg-black/40"
            }`}
          />
          {loading
            ? "INITIALIZING..."
            : active
            ? "EXIT HAND MODE"
            : "ACTIVATE NEURAL SCROLL"}
        </button>
      </div>

      {active && (
        <div
          className={`transition-all duration-300 px-4 py-2 rounded-full text-[9px] font-mono tracking-widest border ${
            isPinching
              ? "bg-emerald-500 text-black border-emerald-400 scale-110 shadow-[0_0_20px_#10b981]"
              : "bg-white/5 text-white/40 border-white/10"
          }`}
        >
          {isPinching ? "SCROLL ENGAGED" : "PINCH FINGERS TO SCROLL"}
        </div>
      )}
    </div>
  );
}
