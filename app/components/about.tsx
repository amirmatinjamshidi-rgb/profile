/** @format */

"use client";
import { motion } from "framer-motion";

const stackGroups = [
  {
    category: "Languages & Core",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3/SCSS"],
    color: "from-[#006466]",
    delay: 0.1,
  },
  {
    category: "Frameworks & Library",
    skills: ["Next.js 15", "React.js", "Three.js", "Astro"],
    color: "from-[#0b525b]",
    delay: 0.2,
  },
  {
    category: "State & Data",
    skills: ["Redux Toolkit", "Zustand", "React Query", "Context API"],
    color: "from-[#3e1f47]",
    delay: 0.3,
  },
  {
    category: "Design & UI",
    skills: ["Tailwind CSS", "Framer Motion", "Material UI", "Shadcn/ui"],
    color: "from-[#4d194d]",
    delay: 0.4,
  },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {stackGroups.map((group) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: group.delay }}
          viewport={{ once: true }}
          className="group relative p-px rounded-3xl bg-linear-to-br from-white/10 to-transparent hover:from-[#006466] transition-all duration-500"
        >
          <div className="relative bg-[#1b3a4b]/90 backdrop-blur-xl p-8 rounded-[1.4rem] h-full space-y-6">
            <h3
              className={`text-xs font-black uppercase tracking-[0.4em] bg-linear-to-r ${group.color} to-white bg-clip-text text-transparent`}
            >
              {group.category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-slate-300 text-sm font-medium hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
