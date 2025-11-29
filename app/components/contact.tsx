"use client";

import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Contact() {
  return (
    <div className="w-full flex justify-center py-32 px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-12 max-w-2xl w-full 
                   bg-black p-10 rounded-3xl shadow-lg shadow-indigo-800/50 
                   border border-indigo-500/30"
      >
        <div className="space-y-6">
          <p className="text-green-400 text-sm tracking-widest">CONTACT ME</p>

          <h1 className="text-4xl font-bold text-white">Get in Touch</h1>

          <p className="text-gray-400 leading-relaxed">
            I’m always open to discussing exciting projects and new opportunities. 
            Let’s build something powerful together.
          </p>

          <div className="space-y-3">
            <ContactItem icon="fa-envelope" text="amirmatinjamshidi@gmail.com" />
            <ContactItem icon="fa-phone" text="+98 912 074 2295" />
            <ContactItem icon="fa-location-dot" text="Theran, Iran" />
          </div>

          <div className="flex gap-5 pt-4">
            <SocialLink
              icon="fa-github"
              link="https://github.com/Saboo24"
              color="text-gray-300 hover:text-white"
            />
            <SocialLink
              icon="fa-linkedin"
              link="https://www.linkedin.com/in/amine-hamzaoui-a2453a35b"
              color="text-blue-500 hover:text-blue-300"
            />
            <SocialLink
              icon="fa-whatsapp"
              link="https://wa.me/213554139526"
              color="text-green-500 hover:text-green-300"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <FormInput label="Your Name" />
          <FormInput label="Your Email" />

          <textarea
            placeholder="Your Message"
            className="w-full h-40 p-4 bg-black rounded-xl border border-gray-700
                       text-gray-200 outline-none focus:border-indigo-500 
                       transition"
          />

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              bgcolor: "#16a34a",
              paddingY: "12px",
              borderRadius: "12px",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#22c55e" },
              boxShadow: "0px 4px 12px rgba(34,197,94,0.4)",
            }}
          >
            SEND MESSAGE
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

type ContactItemProps = {
  icon: string;
  text: string;
};

type SocialLinkProps = {
  icon: string;
  link: string;
  color: string;
};

type FormInputProps = {
  label: string;
};


function ContactItem({ icon, text }: ContactItemProps) {
  return (
    <div className="flex items-center gap-3 text-gray-300">
      <i className={`fa-solid ${icon} text-green-400 text-xl`} />
      <span>{text}</span>
    </div>
  );
}

function SocialLink({ icon, link, color }: SocialLinkProps) {
  return (
    <motion.a
      whileHover={{ scale: 1.15 }}
      href={link}
      target="_blank"
      className={`text-3xl transition ${color}`}
    >
      <i className={`fa-brands ${icon}`} />
    </motion.a>
  );
}

function FormInput({ label }: FormInputProps) {
  return (
    <TextField
      fullWidth
      label={label}
      InputLabelProps={{ style: { color: "#9ca3af" } }}
      sx={{
        "& .MuiInputBase-input": { color: "white" },
        "& fieldset": { borderColor: "#4c4c4c" },
        "&:hover fieldset": { borderColor: "#6366f1" },
      }}
    />
  );
}
