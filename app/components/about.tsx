/** @format */
"use client";
import { motion } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import CloudQueueSharpIcon from "@mui/icons-material/CloudQueueSharp";
const aboutBox = [
  {
    id: 1,
    name: "languages",
    discription: "html , css, javascript , typescript , java , c#",
    icon: <CodeIcon />,
  },
  {
    id: 2,
    name: "education ",
    discription: "bachlor's degree at South Azad University",
    icon: <SchoolIcon />,
  },
  {
    id: 3,
    name: "projects",
    discription: "built more than 3 projects and contributed on 2",
    icon: <CloudQueueSharpIcon />,
  },
];
function About() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 ">
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
    group bg-black p-6 relative transform  group rounded-3xl shadow-lg 
    before:w-full before:h-full before:bg-blue-800
    hover:before:left-0 ease-linear overflow-hidden
     before:absolute before:top-0 before:-left-full shadow-orange-400 
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
            <p className="text-fuchsia-600 text-sm mt-2 leading-relaxed transition-colors duration-500 relative z-1 group-hover:text-gray-100">
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
