/** @format */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { motion, AnimatePresence } from "framer-motion";

export default function SecurityTab({
  onUnlocked,
}: {
  onUnlocked: () => void;
}) {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const [isWaitingForRelease, setIsWaitingForRelease] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const requestRef = useRef<number>(0);
  const detectorRef = useRef<HandLandmarker | null>(null);
  const gestureStartTime = useRef<number | null>(null);

  const HOLD_DURATION = 1500; // 1.5 seconds

  const sequence = useMemo(
    () => [
      { id: 1, label: "PROTOCOL: FIST", icon: "✊" },
      { id: 2, label: "GRANT: OPEN PALM", icon: "✋" },
      { id: 3, label: "VERIFY: VICTORY", icon: "✌️" },
    ],
    []
  );

  const indices = useMemo(
    () => ({
      tips: { thumb: 4, index: 8, middle: 12, ring: 16, pinky: 20 },
      pips: { thumb: 2, index: 6, middle: 10, ring: 14, pinky: 18 },
      mcp: { index: 5, middle: 9, ring: 13, pinky: 17 },
    }),
    []
  );

  const isUp = useCallback(
    (hand: any, finger: keyof typeof indices.tips) => {
      if (finger === "thumb") {
        return hand[indices.tips.thumb].y < hand[indices.pips.thumb].y;
      }
      return hand[indices.tips[finger]].y < hand[indices.pips[finger]].y;
    },
    [indices]
  );

  const validateGesture = useCallback(
    (hand: any, currentStep: number) => {
      const thumb = isUp(hand, "thumb");
      const index = isUp(hand, "index");
      const middle = isUp(hand, "middle");
      const ring = isUp(hand, "ring");
      const pinky = isUp(hand, "pinky");

      if (currentStep === 0) {
        const thumbTipHigherThanMcp = hand[4].y < hand[5].y;
        return (
          thumb && !index && !middle && !ring && !pinky && thumbTipHigherThanMcp
        );
      }
      if (currentStep === 1) {
        return index && middle && ring && pinky;
      }
      if (currentStep === 2) {
        return index && middle && !ring && !pinky;
      }
      return false;
    },
    [isUp]
  );

  useEffect(() => {
    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.10/wasm"
        );
        detectorRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setActive(true);
          };
        }
      } catch (err) {
        console.error("Neural Link Failure", err);
      }
    };
    init();

    return () => {
      detectorRef.current?.close();
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    const detect = (time: number) => {
      const video = videoRef.current;
      if (video && detectorRef.current && active && step < 3) {
        if (video.readyState >= 2 && video.videoWidth > 0) {
          const results = detectorRef.current.detectForVideo(video, time);

          if (results.landmarks?.[0]) {
            const hand = results.landmarks[0];
            const isNeutral =
              !isUp(hand, "index") &&
              !isUp(hand, "middle") &&
              !isUp(hand, "ring") &&
              !isUp(hand, "pinky");

            if (isWaitingForRelease) {
              if (isNeutral) setIsWaitingForRelease(false);
            } else if (validateGesture(hand, step)) {
              if (!gestureStartTime.current) {
                gestureStartTime.current = time;
              }

              const elapsed = time - gestureStartTime.current;
              const progress = Math.min((elapsed / HOLD_DURATION) * 100, 100);
              setHoldProgress(progress);

              if (elapsed >= HOLD_DURATION) {
                setIsWaitingForRelease(true);
                gestureStartTime.current = null;
                setHoldProgress(0);
                setStep((s) => {
                  if (s === 2) {
                    setTimeout(onUnlocked, 1000);
                    return 3;
                  }
                  return s + 1;
                });
              }
            } else {
              gestureStartTime.current = null;
              setHoldProgress(0);
            }
          } else {
            gestureStartTime.current = null;
            setHoldProgress(0);
          }
        }
        requestRef.current = requestAnimationFrame(detect);
      }
    };

    if (active) requestRef.current = requestAnimationFrame(detect);
    return () => cancelAnimationFrame(requestRef.current);
  }, [active, step, validateGesture, isWaitingForRelease, onUnlocked, isUp]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 z-200 bg-[#05070c] flex flex-col items-center justify-center p-6 text-white font-mono"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="hidden "
        />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-12 text-center">
        <div className="space-y-2">
          <h2 className="text-emerald-500 text-xs tracking-[0.5em] font-black uppercase">
            Biometric Scanner
          </h2>
          <p className="text-4xl font-black italic tracking-tighter uppercase">
            Neural Firewall
          </p>
        </div>

        <div className="flex justify-center gap-4">
          {sequence.map((item, i) => (
            <div
              key={item.id}
              className={`relative w-16 h-16 rounded-xl border-2 flex items-center justify-center text-2xl transition-all duration-500 ${
                step > i
                  ? "bg-emerald-500 border-emerald-400 shadow-[0_0_20px_#10b981]"
                  : step === i
                  ? "border-emerald-500 bg-emerald-500/10"
                  : "border-white/10 opacity-30"
              }`}
            >
              {step > i ? "✓" : item.icon}
              {step === i && holdProgress > 0 && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeDasharray="188.5"
                    strokeDashoffset={188.5 - (188.5 * holdProgress) / 100}
                    className="transition-all duration-100 ease-linear"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div className="h-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isWaitingForRelease ? "release" : step}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className={`text-[10px] tracking-widest uppercase font-bold ${
                isWaitingForRelease ? "text-emerald-400" : "text-[#9d00ff]"
              }`}
            >
              {isWaitingForRelease
                ? "RESET HAND POSITION"
                : step < 3
                ? `HOLD ${sequence[step].label.split(": ")[1]}`
                : "ACCESS GRANTED"}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <p className="text-[9px] text-white/40 uppercase tracking-[0.2em]">
          {holdProgress > 0
            ? `Verifying... ${Math.round(holdProgress)}%`
            : "Awaiting Scan"}
        </p>
        <p className="text-[22px] text-pink-600 uppercase">
          Whrn reseting, shape your hands to fist for recognition{" "}
        </p>
      </div>
    </motion.div>
  );
}
