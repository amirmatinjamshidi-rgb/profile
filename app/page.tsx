/** @format */
"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

import Navbar from "./components/Navbar";
import TechStack from "./components/about";
import Projects from "./components/projects";
import Services from "./components/Services";
import Contact from "./components/contact";
import LoadingScreen from "./components/Loading";
import MechanicalScene from "./components/Mechanical";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (isLoading) return;

      gsap.to(progressBarRef.current, {
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        scaleX: 1,
        backgroundColor: "#4d194d",
        ease: "none",
      });

      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      });

      const sections = gsap.utils.toArray(".reveal-section");
      sections.forEach((section: any) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 w-full bg-[#006466] z-100 origin-left scale-x-0 shadow-[0_0_15px_#006466]"
      />

      <div
        ref={containerRef}
        className="relative min-h-screen w-full bg-[#0b132b] overflow-x-hidden"
      >
        <MechanicalScene />
        <Navbar />

        <main
          className={`relative z-10 text-white selection:bg-[#4d194d] transition-opacity duration-1000 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <section
            id="Home"
            className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 lg:px-24 gap-12"
          >
            <div className="text-left space-y-6 max-w-4xl order-2 md:order-1">
              <h1 className="hero-text text-6xl md:text-8xl font-black tracking-tighter">
                Amir Matin{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-[#006466]">
                  Jamshidi
                </span>
              </h1>
              <p className="hero-text text-xl md:text-2xl font-medium text-emerald-200/60 uppercase tracking-widest">
                Front-End Engineer & UI Architect
              </p>
            </div>
            <div className="hero-text order-1 md:order-2">
              <Image
                src="/shinji.png"
                alt="pfp"
                height={300}
                width={300}
                className="rounded-[3rem] border-2 border-white/10 shadow-2xl"
                priority
              />
            </div>
          </section>

          <section
            id="About"
            className="reveal-section py-32 px-6"
          >
            <div className="max-w-6xl mx-auto space-y-16">
              <h2 className="text-center text-4xl md:text-6xl font-black uppercase italic">
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
              <h2 className="text-4xl md:text-6xl font-black uppercase">
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
              <h2 className="text-4xl md:text-6xl font-black uppercase">
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
