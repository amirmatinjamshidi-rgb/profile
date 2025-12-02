/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { FieldErrors, useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting, isSubmitSuccessful }
} = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
  await axios.post("/api/contact", data);
  reset();
};

  const onError = (errors: FieldErrors<FormData>) => {
  console.log("Validation errors:", errors);
};

  return (
    <div className="w-full flex justify-center py-32 px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-12 max-w-2xl w-full bg-black p-10 rounded-3xl shadow-lg shadow-indigo-800/50 border border-indigo-500/30"
      >
        <div className="space-y-6">
          <p className="text-green-400 text-sm tracking-widest">CONTACT ME</p>
          <h1 className="text-4xl font-bold text-white">Get in Touch</h1>
          <p className="text-gray-400 leading-relaxed">
            I’m always open to discussing exciting projects and new opportunities. Let’s build something powerful together.
          </p>

          <div className="space-y-3">
            <ContactItem icon="fa-envelope" text="amirmatinjamshidi@gmail.com" />
            <ContactItem icon="fa-phone" text="+98 912 074 2295" />
            <ContactItem icon="fa-location-dot" text="Theran, Iran" />
          </div>
          <div className="flex gap-5 pt-4">
            <SocialLink icon="/git.png" link="https://github.com/amirmatinjamshidi-rgb" color="text-gray-300 hover:text-white" />
            <SocialLink icon="/link.png" link="https://www.linkedin.com/in/matin-jamshidy-88593137b/" color="text-blue-500 hover:text-blue-300" />
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            <TextField
              {...register("name", { required: "Name is required" })}
              fullWidth
              label="Your Name"
              InputLabelProps={{ style: { color: "#9ca3af" } }}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiInputBase-input": { color: "white" },
                "& fieldset": { borderColor: "#4c4c4c" },
                "&:hover fieldset": { borderColor: "#6366f1" },
              }}
            />

            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              fullWidth
              label="Your Email"
              InputLabelProps={{ style: { color: "#9ca3af" } }}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiInputBase-input": { color: "white" },
                "& fieldset": { borderColor: "#4c4c4c" },
                "&:hover fieldset": { borderColor: "#6366f1" },
              }}
            />

            <textarea
              {...register("message", { required: "Message is required" })}
              placeholder="Your Message"
              className={`w-full h-40 p-4 bg-black rounded-xl border border-gray-700 hover:border-black text-gray-200 outline-none focus:border-indigo-500 transition ${errors.message ? "border-red-500" : ""}`}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isSubmitting}
              sx={{
                bgcolor: "#16a34a",
                paddingY: "12px",
                borderRadius: "12px",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#22c55e" },
                boxShadow: "0px 4px 12px rgba(34,197,94,0.4)",
              }}
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </Button>

            {isSubmitSuccessful && <p className="text-green-400 mt-2">Message sent successfully!</p>}

          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-300">
      <i className={`fa-solid ${icon} text-green-400 text-xl`} />
      <span>{text}</span>
    </div>
  );
}

function SocialLink({ icon, link, color }: { icon: string; link: string; color: string }) {
  const isImage = /\.(png|jpe?g|svg)$/i.test(icon);
  return (
    <motion.a whileHover={{ scale: 1.15 }} href={link} target="_blank" className={`text-3xl transition ${color}`}>
      {isImage ? <img src={icon} alt="social icon" className="w-9 h-9 rounded-lg" /> : <i className={`fa-brands ${icon}`} />}
    </motion.a>
  );
}
