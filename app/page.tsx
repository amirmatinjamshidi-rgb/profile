// app/page.tsx
import Navbar from "./components/Navbar";
import Contact from "./components/contact";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-24 md:pt-32 min-h-screen bg-black">

        <section className="px-6 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Amir Matin Jamshidi
          </h1>
          <p className="text-xl md:text-2xl text-green-400 mt-4">
            React Developer and Fast learner
          </p>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Turning ideas into powerful, beautiful, and fast web and Game experiences.
          </p>
        </section>

        <Services />



  <Contact />
       
        <footer className="py-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Amir Matin. Built with Next.js & Tailwind.
        </footer>
      </main>
    </>
  );
}