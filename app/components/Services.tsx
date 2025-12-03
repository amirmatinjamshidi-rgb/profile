/** @format */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function Services() {
  const myServices = [
    {
      id: 1,
      name: "web development",
      image: "/next.svg",
      discription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.",
    },
    {
      id: 2,
      name: "Game development",
      image: "/next.svg",
      discription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.",
    },
    {
      id: 3,
      name: "Digital connection",
      image: "/next.svg",
      discription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.",
    },
    {
      id: 4,
      name: "Fast Learner",
      image: "/next.svg",
      discription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eligendi soluta est veniam sequi nemo.",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-20 py-30">
      {myServices.map((cat, index) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true, margin: "-90px" }}
          className="
    group bg-black p-6 
    relative
    transform  hover:scale-105
   group rounded-3xl shadow-lg shadow-blue-800 
            transition-all duration-500 ease-linear overflow-hidden
            before:w-full before:h-full before:bg-blue-800
            hover:before:left-0
    before:content-[''] before:absolute before:top-0 before:-left-full
    before:transition-all before:duration-500 before:z-0
    group-hover:before:left-0
  "
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="mb-4 relative z-1 flex justify-center"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              height={60}
              width={60}
            />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 + 0.1 }}
            className="text-cyan-400 mt-2 text-lg font-bold transition-colors duration-500 relative z-1 group-hover:text-white sm:text"
          >
            {cat.name}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            className="text-gray-400 text-sm mt-2 leading-relaxed transition-colors duration-500 relative z-1 group-hover:text-gray-100"
          >
            {cat.discription}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}

export default Services;
