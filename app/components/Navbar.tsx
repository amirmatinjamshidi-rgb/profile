"use client";
import Image from "next/image";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", id: "Home" },
  { name: "About", id: "About" },
  { name: "Projects", id: "Projects" },
  { name: "Services", id: "Services" },
  { name: "Contact", id: "Contact" },
];
export const runtime = "edge";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("Home");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let found = "Home";

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            found = item.id;
            break;
          }
        }
      }

      setCurrentSection(found);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavButton = ({ name, id }: { name: string; id: string }) => {
    const isActive = currentSection === id;

    return (
      <button
        onClick={() => scrollToSection(id)}
        className={`
          relative px-7 py-4 overflow-hidden rounded-2xl font-semibold text-lg
          transition-all duration-500 group
          ${isActive ? "scale-105 shadow-2xl shadow-red-600/50" : "hover:scale-105"}
        `}
      >
        <span
          className={`
            absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            ${isActive
              ? "from-red-600 via-pink-600 to-purple-700 opacity-100"
              : "from-green-500 via-emerald-500 to-teal-600"}
          `}
        />

        <span
          className={`
            absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent
            -translate-x-full group-hover:translate-x-full
            transition-transform duration-1000 skew-x-12
          `}
        />

        <span className="relative z-10">
          <span className={isActive ? "text-white drop-shadow-lg" : "text-gray-300 group-hover:text-white"}>
            {name}
          </span>
        </span>

        <span
          className={`
            absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-red-500 rounded-full
            shadow-[0_0_20px_#ef4444] blur-sm
            transition-all duration-700
            ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          `}
        />
      </button>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto max-w-6xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-900/30 py-4 md:top-6 md:rounded-3xl">
      <div className="px-6 flex items-center justify-between">
        <button onClick={() => scrollToSection("Home")} className="flex items-center gap-3">
          <Image
            src="/batman-icon.jpg"
            alt="Logo"
            width={40}
            priority
            height={40}
            className="rounded-full shadow-lg shadow-yellow-500/60"
          />
          <span className="text-white font-bold text-xl hidden sm:block">AMIR MATIN</span>
        </button>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavButton key={item.id} name={item.name} id={item.id} />
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-white"
        >
          <MenuRoundedIcon fontSize="large" />
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-gray-800">
          <div className="px-6 py-6 flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-6 py-4 rounded-xl text-lg font-medium transition-all ${
                    isActive
                      ? "bg-red-900/40 text-white border border-red-500/60 shadow-2xl shadow-red-600/40"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                  {isActive && <span className="ml-4 text-red-400 text-sm">Current</span>}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}