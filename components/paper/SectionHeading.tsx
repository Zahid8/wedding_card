import { cn } from "@/lib/utils";
import { BrushRule } from "./BrushRule";

type Props = {
  eyebrow?: string;
  script?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  script,
  title,
  subtitle,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <span className="tracked-label">{eyebrow}</span>}
      {script && (
        <h2 className="font-script text-5xl md:text-6xl leading-none text-[color:var(--color-bark)]">
          {script}
        </h2>
      )}
      {title && (
        <h2 className="font-serif uppercase tracking-[0.24em] text-[color:var(--color-bark)] text-lg md:text-xl">
          {title}
        </h2>
      )}
      <BrushRule width={120} className="mt-1" />
      {subtitle && (
        <p className="font-serif italic text-[color:var(--color-ink)]/80 max-w-2xl mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
