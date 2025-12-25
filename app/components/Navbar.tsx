/** @format */

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const navItems = [
  { name: "Home", id: "Home" },
  { name: "About", id: "About" },
  { name: "Projects", id: "Projects" },
  { name: "Services", id: "Services" },
  { name: "Contact", id: "Contact" },
];

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
      const found = navItems.find((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (found) setCurrentSection(found.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-4 top-6 z-50 mx-auto max-w-5xl">
      <nav className="bg-[#1b3a4b]/80 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
        <button
          onClick={() => scrollToSection("Home")}
          className="hover:opacity-80 transition"
        >
          <Image
            src="/batman-icon.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full border-2 border-[#006466]"
          />
        </button>

        <div className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                currentSection === item.id
                  ? "bg-[#006466] text-white shadow-lg shadow-[#006466]/40"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          <MenuRoundedIcon />
        </button>
      </nav>

      {menuOpen && (
        <div className="mt-2 md:hidden bg-[#1b3a4b] border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left px-4 py-3 rounded-lg text-slate-200 hover:bg-[#006466]"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
