/** @format */

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactDetailProps {
  icon: string;
  label: string;
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await axios.post("/api/contact", data);

      if (response.status === 200) {
        alert("Message sent successfully!");
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Something went wrong";
      console.error("Submission failed:", errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-start py-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="lg:w-1/3 space-y-6"
      >
        <h2 className="text-5xl font-black text-white tracking-tighter italic">
          Let&apos;s{" "}
          <span className="text-[#4d194d] brightness-200">Connect</span>
        </h2>
        <p className="text-slate-300 leading-relaxed text-lg">
          Building high-performance systems requires a bridge between ideas and
          execution. Reach out to start the process.
        </p>
        <div className="space-y-6 pt-6 border-l-2 border-[#4d194d] pl-6">
          <ContactDetail
            icon="envelope"
            label="amirmatinjamshidi@gmail.com"
          />
          <ContactDetail
            icon="location-dot"
            label="Tehran, Iran"
          />
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 w-full space-y-5 bg-[#3e1f47]/20 p-8 md:p-12 rounded-4xl border border-[#4d194d]/40 backdrop-blur-xl shadow-[0_20px_50px_rgba(77,25,77,0.3)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <input
              {...register("name", { required: "Your name is essential" })}
              placeholder="Full Name"
              className={`bg-[#1b3a4b]/30 border ${
                errors.name
                  ? "border-pink-500 shadow-[0_0_10px_#ec4899]"
                  : "border-white/10"
              } p-4 rounded-2xl outline-none focus:border-[#4d194d] text-white w-full transition-all duration-300`}
            />
            <ErrorMessage message={errors.name?.message} />
          </div>

          <div className="space-y-2">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email Address"
              className={`bg-[#1b3a4b]/30 border ${
                errors.email
                  ? "border-pink-500 shadow-[0_0_10px_#ec4899]"
                  : "border-white/10"
              } p-4 rounded-2xl outline-none focus:border-[#4d194d] text-white w-full transition-all duration-300`}
            />
            <ErrorMessage message={errors.email?.message} />
          </div>
        </div>

        <div className="space-y-2">
          <textarea
            {...register("message", {
              required: "Please leave a short message",
            })}
            placeholder="Tell me about your project..."
            rows={5}
            className={`bg-[#1b3a4b]/30 border ${
              errors.message
                ? "border-pink-500 shadow-[0_0_10px_#ec4899]"
                : "border-white/10"
            } p-4 rounded-2xl outline-none focus:border-[#4d194d] text-white w-full resize-none transition-all duration-300`}
          />
          <ErrorMessage message={errors.message?.message} />
        </div>

        <button
          disabled={isSubmitting}
          className="
    relative overflow-hidden group w-full py-5 
    bg-[#312244] text-white font-black rounded-2xl 
    shadow-xl shadow-[#4d194d]/40 transition-all duration-300
    disabled:opacity-50 uppercase tracking-widest text-sm
  "
        >
          <div
            className="
    absolute inset-0 bg-linear-to-r from-[#4d194d] to-[#3e1f47] 
    opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out
  "
          />

          <div
            className="
    absolute inset-0 bg-linear-to-r from-[#3e1f47] to-[#4d194d] 
    opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out
  "
          />

          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Transmit Message"
            )}
          </span>
        </button>
      </motion.form>
    </div>
  );
}

function ErrorMessage({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-pink-400 text-xs font-bold tracking-wide pl-2"
        >
          ● {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function ContactDetail({ icon, label }: ContactDetailProps) {
  return (
    <div className="flex items-center gap-4 text-slate-300 group">
      <div className="w-12 h-12 rounded-2xl bg-[#4d194d]/30 flex items-center justify-center text-[#4d194d] brightness-200 group-hover:scale-110 transition-all border border-[#4d194d]/20">
        <i className={`fa-solid fa-${icon}`} />
      </div>
      <span className="text-sm font-semibold tracking-tight">{label}</span>
    </div>
  );
}
