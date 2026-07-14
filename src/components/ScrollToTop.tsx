"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Scroll visibility check
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", listener);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? "auto" : "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 10 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: prefersReduced ? 0 : 0.2 }}
          className="fixed bottom-5 right-5 lg:bottom-8 lg:right-8 z-40 w-12 h-12 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] text-[hsl(var(--primary-text))] shadow-lg flex items-center justify-center hover:bg-[hsl(var(--surface-elevated))] hover:border-[hsl(var(--accent)/0.3)] hover:text-[hsl(var(--accent))] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 active:scale-95 transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="stroke-[2.5]" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
