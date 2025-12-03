/** @format */
import About from "./components/about";
import Navbar from "./components/Navbar";
import Contact from "./components/contact";
import Services from "./components/Services";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20 md:pt-28 bg-transparent text-white">
        <section
          id="Home"
          className="min-h-screen flex items-center justify-center px-6 animate-on-scroll gap-12"
        >
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold animate-on-scroll">
              Amir Matin Jamshidi
            </h1>
            <p className="text-2xl md:text-4xl text-green-400 animate-on-scroll">
              Front-End Developer
            </p>
            <p className="font-bold text-center max-w-3xl">
              I’m a Software Engineer who loves transforming ideas into
              reliable, scalable products. Over time, I’ve explored several
              technologies and found my passion in building high-performance
              systems and intuitive user experiences. I’m proficient in
              <i>
                <b className="purple">
                  JavaScript, C++, Rust, Node.js, and Java{" "}
                </b>
              </i>
              — and I enjoy working across both backend and frontend stacks. My
              key areas of interest include developing
              <i>
                <b className="text-purple-700">
                  Web Applications,Next.js,React.js,
                </b>
              </i>
              and exploring new ways to bridge on-chain and off-chain systems.
            </p>
          </div>
          <Image
            src="/shinji.png"
            alt="pfp"
            height={270}
            width={270}
            className="flex items-center justify-center animate-on-scroll rounded-3xl mb-40"
          />
        </section>

        <section
          id="About"
          className="py-32 px-6 animate-on-scroll"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold animate-on-scroll">
              About Me
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed animate-on-scroll">
              Tehran-based developer passionate about clean code, stunning UI,
              and performance.
            </p>
            <About />
          </div>
        </section>

        <section
          id="Projects"
          className="py-32 px-6 bg-zinc-950 animate-on-scroll"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 animate-on-scroll">
              Projects
            </h2>
          </div>
        </section>

        <section
          id="Services"
          className="py-32 px-6 animate-on-scroll"
        >
          <Services />
        </section>
        <section
          id="Contact"
          className="py-32 px-6 animate-on-scroll"
        >
          <Contact />
        </section>
      </main>
    </>
  );
}
