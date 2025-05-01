import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { db, collection, addDoc } from "../../firebase";
import { useTheme } from "next-themes";
import { RainbowButton } from "./rainbow-button";
import { ShineBorder } from "./shine-border";
import Link from "next/link";
import { DATA } from "@/data/resume";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const recaptchaRef = useRef<HTMLElement | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const { resolvedTheme } = useTheme();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the captcha!");
      return;
    }

    console.log("Form data:", formData);

    try {
      console.log("Adding data to Firestore...");
      const docRef = await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error writing document: ", error);
      alert(`Something went wrong: ${(error as Error).message}`);
    }
  };

  return (
        <div className="relative mt-10 max-w-lg mx-auto p-6 bg-customGray dark:bg-black rounded-xl border border-slate-300 dark:border-gray-700 shadow-lg">
          <ShineBorder
            borderWidth={1}
            duration={10}
            shineColor={["#f23777", "#6f3cf5", "#f09c47"]}
          />

          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Contact Me
          </h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg  bg-gray-100 dark:bg-transparent dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border rounded-lg  bg-gray-100 dark:bg-transparent dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full mt-1 p-3 border rounded-lg bg-gray-100 dark:bg-transparent dark:text-white"
              ></textarea>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 rounded">
              <div className="scale-[0.85] md:scale-100 origin-top">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdQ1QwrAAAAAECqMtX0qJDxYzvJ7xgfwJIzSFGy"
                  theme={resolvedTheme}
                  onChange={(token: string | null) =>
                    setCaptchaToken(token || "")
                  }
                />
              </div>
            </div>
            <div className=" justify-self-center">
              <button
                type="submit"
                className="p-3 dark:text-black font-bold dark:bg-white bg-black text-white rounded-lg transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
  );
};

export default ContactForm;
