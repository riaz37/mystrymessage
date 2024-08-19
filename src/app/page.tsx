"use client";
import Navbar from "@/components/ui/navbar/Navbar";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

export default function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/messages.json")
      .then((response) => response.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        {/* Header Section */}
        <header className="w-full max-w-5xl text-center">
          <motion.h1
            className="text-6xl font-extrabold text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Mystry Message
          </motion.h1>
          <motion.p
            className="mt-4 text-2xl text-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover the magic of anonymous messaging.
          </motion.p>
        </header>

       

        {/* Features Section */}
        <section className="mt-12 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 text-center lg:text-left">
          {[
            {
              title: "Anonymous Messaging",
              description: "Send and receive messages without revealing your identity.",
            },
            {
              title: "Secure & Private",
              description: "Your messages are encrypted and secure.",
            },
            {
              title: "Easy to Use",
              description: "Simple and intuitive interface for seamless communication.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-200">{feature.title}</h2>
              <p className="mt-4 text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Call to Action Section */}
        <section className="mt-12 w-full max-w-5xl text-center">
          <motion.a
            href="/signup"
            className="inline-block bg-gray-800 text-gray-200 font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Get Started
          </motion.a>
        </section>

        {/* Footer Section */}
        <footer className="mt-12 w-full max-w-5xl text-center text-gray-400">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            &copy; 2024 Mystry Message. All rights reserved.
          </motion.p>
        </footer>
      </main>
    </>
  );
}
