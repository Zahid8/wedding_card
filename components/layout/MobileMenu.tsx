"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  // Menu is open only for the path it was opened on; navigating closes it.
  const open = openPath === pathname;
  const setOpen = (v: boolean) => setOpenPath(v ? pathname : null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-[color:var(--color-bark)]"
      >
        <Menu strokeWidth={1.25} size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden bg-[color:var(--color-paper)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative h-full flex flex-col p-8">
              <div className="flex items-center justify-between">
                <span className="font-script text-2xl text-[color:var(--color-bark)]">
                  {site.couple.groomShort}{" "}
                  <span className="text-[color:var(--color-coral)]">&amp;</span>{" "}
                  {site.couple.brideShort}
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 text-[color:var(--color-bark)]"
                >
                  <X strokeWidth={1.25} size={22} />
                </button>
              </div>
              <img
                aria-hidden
                src="/masks/olive-branch.svg"
                alt=""
                className="absolute right-4 top-24 w-40 opacity-70"
              />
              <nav className="mt-16 flex flex-col gap-6">
                {site.nav.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "font-serif uppercase tracking-[0.24em] text-lg text-[color:var(--color-ink)]/85",
                          active && "text-[color:var(--color-bark)]",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="mt-auto font-serif italic text-[color:var(--color-tan)] text-sm">
                {site.date.display} · {site.venue.name}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
