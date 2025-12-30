/** @format */

"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import HandScroll from "./components/HandScroll";
import Navbar from "./components/Navbar";
import TechStack from "./components/about";
import Projects from "./components/projects";
import Services from "./components/Services";
import Contact from "./components/contact";
import LoadingScreen from "./components/Loading";
import MechanicalScene from "./components/Mechanical";
import ParticleNetwork from "./components/effect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isLoading) return;

      ScrollTrigger.refresh();

      gsap.to(progressBarRef.current, {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        scaleX: 1,
        backgroundColor: "#9d00ff",
        ease: "none",
      });

      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 40,
          duration: 1,
        });
      });
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  return (
    <>
      <HandScroll />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 w-full bg-[#9d00ff] z-100 origin-left scale-x-0 shadow-[0_0_20px_#9d00ff]"
      />

      <div
        ref={containerRef}
        className={`relative min-h-screen w-full overflow-x-hidden bg-[#010206] ${
          isLoading ? "max-h-screen overflow-hidden" : ""
        }`}
      >
        <div className="fixed inset-0 z-0">
          <MechanicalScene />
        </div>

        <ParticleNetwork />

        <Navbar />

        <main
          className={`relative z-20 text-white transition-opacity duration-1000 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <section
            id="Home"
            className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 lg:px-24 gap-12"
          >
            <div className="text-center md:text-left space-y-6 max-w-4xl order-2 md:order-1">
              <h1 className="hero-text text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none">
                Amir Matin{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-[#006466] green-glow">
                  Jamshidi
                </span>
              </h1>
              <p className="hero-text text-lg md:text-2xl font-medium uppercase tracking-widest text-[#9d00ff] purple-glow">
                Front-End Engineer & UI Architect
              </p>
            </div>

            <div className="hero-text order-1 md:order-2 flex justify-center">
              <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(157,0,255,0.4)]">
                <Image
                  src="/shinji.png"
                  alt="pfp"
                  width={300}
                  height={300}
                  priority
                  className="w-48 h-48 md:w-[300px] md:h-[300px] object-cover"
                />
              </div>
            </div>
          </section>

          <section
            id="About"
            className="reveal-section py-32 px-6"
          >
            <div className="max-w-6xl mx-auto space-y-16">
              <h2 className="text-center text-3xl md:text-6xl font-black uppercase italic">
                Tech <span className="text-[#006466]">Environment</span>
              </h2>
              <TechStack />
            </div>
          </section>

          <section
            id="Projects"
            className="reveal-section py-32 px-6"
          >
            <div className="max-w-6xl mx-auto space-y-16 text-center">
              <h2 className="text-3xl md:text-6xl font-black uppercase">
                Selected Works
              </h2>
              <Projects />
            </div>
          </section>

          <section
            id="Services"
            className="reveal-section py-32 px-6"
          >
            <div className="max-w-6xl mx-auto space-y-16 text-center">
              <h2 className="text-3xl md:text-6xl font-black uppercase">
                Capabilities
              </h2>
              <Services />
            </div>
          </section>

          <section
            id="Contact"
            className="reveal-section py-32 px-6"
          >
            <Contact />
          </section>
        </main>
      </div>
    </>
  );
}
