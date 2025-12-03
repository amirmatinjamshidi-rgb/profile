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
    discription: "JavaScript , TypeScript , JAVA , C#",
    icon: <CodeIcon />,
  },
  {
    id: 2,
    name: "Education ",
    discription: "Bachlor's degree at Azad University",
    icon: <SchoolIcon />,
  },
  {
    id: 3,
    name: "Projects",
    discription: "Built more than 3 projects and contributed on 2",
    icon: <CloudQueueSharpIcon />,
  },
  {
    id: 4,
    name: "Extra skills",
    discription: "HTML ,CSS , Diffrent libraries related to front end",
    icon: <PermContactCalendarRoundedIcon />,
  },
];
function About() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 ">
      {aboutBox.map((cat, index) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileInView={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-90px" }}
          className="  
    group bg-transparent p-6 relative transform  group rounded-3xl shadow-lg 
    before:w-full before:h-full before:bg-blue-800
    hover:before:left-0 ease-linear overflow-hidden
     before:absolute before:top-0 before:-left-full shadow-red-500 
    before:transition-all before:duration-500 before:z-0
    group-hover:before:left-0 transition-all duration-500 "
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="mb-4 relative"
          >
            <h3 className="text-emerald-500 mt-2 text-lg font-bold transition-colors duration-500 relative z-1 group-hover:text-white sm:text ">
              {cat.name} {cat.icon}
            </h3>
            <p className="text-cyan-400 text-sm mt-2 leading-relaxed transition-colors duration-500 relative z-1 group-hover:text-gray-100">
              {" "}
              {cat.discription}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default About;
