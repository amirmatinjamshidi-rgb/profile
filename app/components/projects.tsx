/** @format */

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

const projects = [
  {
    id: 1,
    title: "Shop Now",
    desc: "A training E-commerce shop With real products to sell and Payment System and login using FireBase.",
    tech: ["React", "JavaScript", "Css"],
    link: "#",
    github: "#",
    image: "/Shopnow.png",
    color: "group-hover:shadow-[#006466]/40",
  },
  {
    id: 2,
    title: "Concepto",
    desc: "A website to search companies and their Information.",
    tech: ["React", "JavaScript", "Redux"],
    link: "#",
    github: "#",
    image: "/Thumbnail.jpg",
    color: "group-hover:shadow-[#4d194d]/40",
  },
  {
    id: 3,
    title: "Hotel Mojan",
    desc: "Exploring the bridge between complex data systems and visual clarity using Framer Motion.",
    tech: ["React", "Next.js", "TypeScript"],
    link: "#",
    github: "#",
    image: "/Hotel.png",
    color: "group-hover:shadow-[#0b525b]/40",
  },
];

export default function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`group relative rounded-4xl bg-[#1b3a4b]/20 border border-white/5 overflow-hidden hover:bg-[#212f45]/40 transition-all duration-500 shadow-2xl ${project.color}`}
        >
          <div className="relative h-56 w-full overflow-hidden">
            <div className="absolute inset-0 bg-[#4d194d]/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div className="p-8 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-white tracking-tighter">
                {project.title}
              </h3>
              <div className="flex gap-3 text-slate-400">
                <a
                  href={project.github}
                  className="hover:text-white transition-colors"
                >
                  <GitHubIcon fontSize="small" />
                </a>
                <a
                  href={project.link}
                  className="hover:text-[#006466] transition-colors"
                >
                  <LaunchIcon fontSize="small" />
                </a>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-[#006466] brightness-150 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
