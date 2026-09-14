"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/content/site";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-6">
      <ul className="flex flex-col gap-3">
        {faqs.items.map((item, i) => {
          const isOpen = open === i;
          const tilt = (i % 2 === 0 ? -0.4 : 0.4);
          return (
            <li key={item.q}>
              <div
                className={cn(
                  "paper-card torn-top torn-bottom transition-colors",
                  isOpen && "shadow-inner",
                )}
                style={{
                  transform: `rotate(${tilt}deg)`,
                  background: isOpen
                    ? "linear-gradient(180deg, rgba(252,215,207,0.55), rgba(252,215,207,0.15))"
                    : undefined,
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg md:text-xl text-[color:var(--color-bark)] leading-snug">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 mt-1 transition-transform text-[color:var(--color-tan)]",
                      isOpen && "rotate-45",
                    )}
                  >
                    <Plus size={22} strokeWidth={1.25} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 font-serif italic text-[color:var(--color-ink)]/85 leading-relaxed">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
