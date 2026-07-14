"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Download, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 md:pb-20"
    >
      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-[hsl(var(--accent)/0.3)] bg-[hsl(var(--accent-muted))] text-[hsl(var(--accent))]">
                {personal.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight text-[hsl(var(--primary-text))]"
            >
              {personal.heroTagline}
            </motion.h1>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-xl md:text-2xl font-semibold text-gradient"
            >
              {personal.fullName}
            </motion.p>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 text-[hsl(var(--secondary-text))] text-base md:text-lg leading-relaxed max-w-xl"
            >
              {personal.heroSummary}
            </motion.p>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--secondary-text))]"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-[hsl(var(--accent))]" />
                {personal.location}
              </span>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="https://drive.google.com/drive/u/1/folders/1LCbwPEAP9DpCkbV3fokhQ4knGpLZ1_hB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-hover))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--accent)/0.2)] w-full sm:w-auto"
              >
                <Download size={16} />
                View CV

              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--primary-text))] hover:border-[hsl(var(--accent)/0.4)] hover:bg-[hsl(var(--surface-elevated))] transition-all w-full sm:w-auto"
              >
                <Mail size={16} />
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Glow behind portrait */}
              <div className="absolute inset-0 rounded-full bg-[hsl(var(--accent)/0.1)] blur-3xl scale-110" />

              {/* Portrait ring */}
              <div className="portrait-ring rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                <Image
                  src="/mohammed-albadrani-portfolio/images/portrait.jpg"
                  alt={`Professional portrait of ${personal.fullName}`}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
