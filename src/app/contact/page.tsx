"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useState, FormEvent } from "react";
import { FaWhatsapp, FaInstagram, FaSnapchat } from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h1 className="text-3xl font-bold mb-6">Contact Khyal Store</h1>
            <div className="space-y-4">
              <section>
                <h2 className="text-2xl font-semibold">Customer Support</h2>
                <p>Email: support@khyalstore.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mt-4">Business Hours</h2>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mt-4">Address</h2>
                <p>Khyal Store Headquarters</p>
                <p>123 Beauty Lane</p>
                <p>Cosmetic City, Beauty State 12345</p>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Social Contact</h3>
                  <div className="flex space-x-4 items-center">
                    <Link
                      href="https://wa.me/+966XXXXXXXXX"
                      target="_blank"
                      className="text-green-500 hover:text-green-600 transition-colors"
                    >
                      <FaWhatsapp size={32} />
                    </Link>
                    <Link
                      href="https://www.instagram.com/khyal.store"
                      target="_blank"
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                    >
                      <FaInstagram size={32} />
                    </Link>
                    <Link
                      href="https://www.snapchat.com/add/khyal.store"
                      target="_blank"
                      className="text-yellow-500 hover:text-yellow-600 transition-colors"
                    >
                      <FaSnapchat size={32} />
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-600 mt-2">
                  Message sent successfully! We'll get back to you soon.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 mt-2">
                  Failed to send message. Please try again later.
                </p>
              )}
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
