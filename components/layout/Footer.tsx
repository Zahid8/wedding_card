import Image from "next/image";
import { site } from "@/content/site";

export const footerCopy = {
  line1: "Dua is the best present",
  line2: "with best compliments from relatives and friends",
};

export function Footer() {
  return (
    <footer className="relative isolate mt-10 overflow-hidden min-h-[440px] md:min-h-[560px] flex items-center justify-center">
      {/* marble courtyard with bougainvillea, 80% opacity, framed so the flower banks flank the text */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-80">
        <Image
          src="/art/footer.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 78%" }}
        />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 py-16 text-center flex flex-col items-center gap-3">
        <p className="font-script text-4xl md:text-5xl text-[color:var(--color-bark)] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
          {footerCopy.line1}
        </p>
        <p className="tracked-label drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">{footerCopy.line2}</p>
        <p className="sr-only">
          {site.couple.groom} &amp; {site.couple.bride}, {site.date.range}
        </p>
      </div>
    </footer>
  );
}
