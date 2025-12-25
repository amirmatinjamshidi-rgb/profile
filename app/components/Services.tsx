/** @format */

"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const myServices = [
  {
    id: 1,
    name: "Web Development",
    image: "/next.svg",
    desc: "Building high-performance, scalable web applications with Next.js.",
  },
  {
    id: 2,
    name: "Systems Engineering",
    image: "/next.svg",
    desc: "Low-level performance optimization using C++ and Rust.",
  },
  {
    id: 3,
    name: "UI/UX Design",
    image: "/next.svg",
    desc: "Crafting intuitive user journeys and stunning visual interfaces.",
  },
  {
    id: 4,
    name: "Architecture",
    image: "/next.svg",
    desc: "Bridging on-chain and off-chain systems with reliable logic.",
  },
];

export default function Services() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-20">
      {myServices.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="group relative p-8 rounded-3xl bg-linear-to-br from-[#1b3a4b] to-[#212f45] border border-white/5 hover:border-[#006466]/50 transition-all duration-500 shadow-xl"
        >
          <div className="mb-6 bg-[#006466]/20 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Image
              src={service.image}
              alt={service.name}
              height={32}
              width={32}
              className="brightness-200"
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{service.name}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {service.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
