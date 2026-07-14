"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const { personal } = portfolioData;

  return (
    <section id="contact" className="relative z-10 py-20 md:py-28">
      <div className="section-container">
        <SectionHeading
          title="Let's Connect"
          subtitle="Open to professional conversations, collaborations, and opportunities in emergency operations and public safety."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="card p-8 md:p-10 text-center">
            <p className="text-[hsl(var(--secondary-text))] mb-8 leading-relaxed">
              Whether you have a professional inquiry, a potential collaboration
              in emergency management and security operations, or simply wish to
              connect — I welcome the conversation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-hover))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--accent)/0.2)] w-full sm:w-auto justify-center"
              >
                <Mail size={16} />
                Send Email
              </a>
              <a
                href={`tel:${personal.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--primary-text))] hover:border-[hsl(var(--accent)/0.4)] hover:bg-[hsl(var(--surface-elevated))] transition-all w-full sm:w-auto justify-center"
              >
                <Phone size={16} />
                Call
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-albadrani-38a906a3?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Mohammed Albadrani's LinkedIn profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--primary-text))] hover:border-[hsl(var(--accent)/0.4)] hover:bg-[hsl(var(--surface-elevated))] transition-all w-full sm:w-auto justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[hsl(var(--border))]">
              <div className="flex items-center justify-center gap-2 text-sm text-[hsl(var(--secondary-text))]">
                <MapPin size={14} className="text-[hsl(var(--accent))]" />
                {personal.location}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
