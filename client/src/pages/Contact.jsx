import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("https://formspree.io/f/xldnzevg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send ❌");
      }
    } catch (err) {
      setStatus("Error occurred ❌");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center">📫 Contact Me</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Send Message
        </button>
        <p className="text-sm mt-2 text-center">{status}</p>
      </form>

      <div className="flex justify-center gap-6 text-blue-600 text-2xl">
        <a href="https://github.com/indranilpaul15" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/indranilpaul15" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://twitter.com/indranilpaul15" target="_blank" rel="noreferrer">
          <FaXTwitter />
        </a>
      </div>
    </div>
  );
}
