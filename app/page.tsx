/** @format */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Components
import Navbar from "./components/Navbar";
import TechStack from "./components/about";
import Projects from "./components/projects";
import Services from "./components/Services";
import Contact from "./components/contact";
import LoadingScreen from "./components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <div className="bg-[#1b3a4b] min-h-screen">
        <Navbar />

        <main
          className={`text-white selection:bg-[#4d194d] selection:text-white transition-opacity duration-700 ${
            isLoading ? "h-screen overflow-hidden opacity-0" : "opacity-100"
          }`}
        >
          <section
            id="Home"
            className="min-h-screen bg-linear-to-b from-[#006466] to-[#0b525b] flex flex-col md:flex-row items-center justify-center px-6 lg:px-24 gap-12"
          >
            <div className="text-left space-y-8 max-w-4xl order-2 md:order-1">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-black tracking-tighter"
              >
                Amir Matin{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-[#006466]">
                  Jamshidi
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl font-medium text-emerald-200/60 uppercase tracking-[0.2em]"
              >
                Front-End Engineer & UI Architect
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="order-1 md:order-2"
            >
              <Image
                src="/shinji.png"
                alt="pfp"
                height={300}
                width={300}
                className="rounded-[3rem] border-2 border-white/10 shadow-2xl"
              />
            </motion.div>
          </section>

          {/* TECH STACK SECTION (Replaced Identity) */}
          <section
            id="About"
            className="py-32 px-6 bg-linear-to-b from-[#0b525b] to-[#1b3a4b]"
          >
            <div className="max-w-6xl mx-auto space-y-20 ">
              <div className="flex flex-col items-center text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                  Tech{" "}
                  <span className="text-[#006466] brightness-150">
                    Environment
                  </span>
                </h2>
                <div className="h-1 w-24 bg-[#006466]" />
              </div>
              <TechStack />
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section
            id="Projects"
            className="py-32 px-6 bg-linear-to-b from-[#1b3a4b] to-[#272640]"
          >
            <div className="max-w-6xl mx-auto space-y-20">
              <div className="flex flex-col items-center text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                  Selected Works
                </h2>
                <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
                  Case Studies & Experiments
                </p>
              </div>
              <Projects />
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section
            id="Services"
            className="py-32 px-6 bg-linear-to-b from-[#272640] to-[#3e1f47]"
          >
            <div className="max-w-6xl mx-auto space-y-20 ">
              <h2 className="text-center text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Capabilities
              </h2>
              <Services />
            </div>
          </section>

          <section
            id="Contact"
            className="py-32 px-6 bg-linear-to-b from-[#3e1f47] to-[#4d194d]"
          >
            <Contact />
          </section>
        </main>
      </div>
    </>
  );
}
