/** @format */

import About from "./components/about";
import Navbar from "./components/Navbar";
import Contact from "./components/contact";
import Services from "./components/Services";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#212f45] min-h-screen selection:bg-[#006466] selection:text-white">
      <Navbar />

      <main className="text-white">
        <section
          id="Home"
          className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 lg:px-24 gap-12 bg-linear-to-brom-[#006466] to-[#144552]"
        >
          <div className="text-left space-y-6 max-w-3xl order-2 md:order-1">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
              Amir Matin{" "}
              <span className="text-[#006466] brightness-150">Jamshidi</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-emerald-200/80 tracking-wide uppercase">
              Software Engineer & Front-End Architect
            </p>
            <div className="h-1 w-20 bg-[#006466]" />
            <p className="text-lg leading-relaxed text-slate-200">
              I transform ideas into reliable, scalable products. Proficient in
              <span className="px-2 py-1 mx-1 rounded bg-[#1b3a4b] font-mono text-emerald-300">
                JavaScript
              </span>
              <span className="px-2 py-1 mx-1 rounded bg-[#1b3a4b] font-mono text-emerald-300">
                TypeScrip
              </span>
              <span className="px-2 py-1 mx-1 rounded bg-[#1b3a4b] font-mono text-emerald-300">
                Java
              </span>
              I build high-performance systems and intuitive user experiences
              across The Front End.
            </p>
          </div>

          <div className="relative order-1 md:order-2 group">
            <div className="absolute -inset-1 bg-linear-to-r from-[#006466] to-[#4d194d] rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <Image
              src="/shinji.png"
              alt="pfp"
              height={320}
              width={320}
              className="relative rounded-3xl border border-white/10 grayscale hover:grayscale-0 transition duration-500 shadow-2xl"
            />
          </div>
        </section>

        <section
          id="About"
          className="py-32 px-6 bg-[#144552]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-20 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">About Me</h2>
              <p className="text-[#006466] brightness-200 font-mono tracking-widest uppercase">
                Tehran, Iran
              </p>
            </div>
            <About />
          </div>
        </section>

        <section
          id="Services"
          className="py-32 px-6 bg-linear-to-b from-[#144552] via-[#272640] to-[#312244]"
        >
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold">Expertise</h2>
          </div>
          <Services />
        </section>

        <section
          id="Contact"
          className="py-32 px-6 bg-[#4d194d]"
        >
          <Contact />
        </section>
      </main>
    </div>
  );
}
