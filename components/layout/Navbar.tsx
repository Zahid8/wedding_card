"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { curtain } from "@/components/home/curtainState";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const curtainOpen = useSyncExternalStore(curtain.subscribe, curtain.get, () => false);
  const hideBrand = pathname === "/" && curtainOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md bg-[color:var(--color-paper)]/85 torn-bottom"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:py-5">
        <Link
          href="/"
          aria-hidden={hideBrand}
          tabIndex={hideBrand ? -1 : 0}
          className={cn(
            "brand-label flex items-baseline gap-1 font-script text-2xl md:text-3xl text-[color:var(--color-bark)] transition-opacity duration-700",
            hideBrand && "opacity-0 pointer-events-none",
          )}
        >
          <span>{site.couple.groomShort}</span>
          <span className="text-[color:var(--color-coral)] px-1">&amp;</span>
          <span>{site.couple.brideShort}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-serif uppercase tracking-[0.2em] text-xs text-[color:var(--color-ink)]/80 hover:text-[color:var(--color-bark)] transition-colors relative",
                  active && "text-[color:var(--color-bark)]",
                )}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-0 right-0 h-1.5 bg-[url('/masks/brush-rule.svg')] bg-no-repeat"
                    style={{ backgroundSize: "100% 6px" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
