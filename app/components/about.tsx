/** @format */

"use client";
import { motion } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import CloudQueueSharpIcon from "@mui/icons-material/CloudQueueSharp";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";

const aboutBox = [
  {
    id: 1,
    name: "Languages",
    discription: "JS, TS, JAVA, C#",
    icon: <CodeIcon />,
  },
  {
    id: 2,
    name: "Education",
    discription: "Bachelor's at Azad University",
    icon: <SchoolIcon />,
  },
  {
    id: 3,
    name: "Projects",
    discription: "3+ Products, 2 Contributions",
    icon: <CloudQueueSharpIcon />,
  },
  {
    id: 4,
    name: "Skills",
    discription: "React, Next.js, Tailwind",
    icon: <PermContactCalendarRoundedIcon />,
  },
];

function About() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {aboutBox.map((cat) => (
        <motion.div
          key={cat.id}
          whileHover={{ y: -10 }}
          className="relative group p-8 rounded-2xl bg-[#1b3a4b]/40 border border-white/5 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#006466] to-[#4d194d] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

          <div className="text-[#006466] brightness-150 mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {cat.icon}
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {cat.discription}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default About;
