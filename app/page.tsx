import Navbar from "./components/Navbar";
import Contact from "./components/contact";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20 md:pt-28 bg-black text-white">

        <section
          id="Home"
          className="min-h-screen flex items-center justify-center px-6 animate-on-scroll"
        >
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold animate-on-scroll">
              Amir Matin Jamshidi
            </h1>
            <p className="text-2xl md:text-4xl text-green-400 animate-on-scroll">
              Full-Stack Developer
            </p>
            <p className="text-gray-400 mt-8 max-w-2xl mx-auto text-lg leading-relaxed animate-on-scroll">
              Crafting fast, beautiful, and powerful web experiences with modern tech.
            </p>
          </div>
        </section>

        <section
          id="About"
          className="py-32 px-6 animate-on-scroll"
        >
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold animate-on-scroll">About Me</h2>
            <p className="text-xl text-gray-300 leading-relaxed animate-on-scroll">
              Tehran-based developer passionate about clean code, stunning UI, and performance.
            </p>
          </div>
        </section>

        <section
          id="Projects"
          className="py-32 px-6 bg-zinc-950 animate-on-scroll"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 animate-on-scroll">Projects</h2>
          
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