import { cn } from "@/lib/utils";

type Props = {
  variant?: "sage" | "blush" | "sand";
  className?: string;
};

const gradients: Record<string, string> = {
  sage: "radial-gradient(60% 60% at 30% 30%, rgba(166,173,151,0.55), transparent 65%), radial-gradient(50% 55% at 75% 75%, rgba(220,201,176,0.5), transparent 70%)",
  blush: "radial-gradient(65% 60% at 25% 25%, rgba(252,215,207,0.7), transparent 65%), radial-gradient(55% 55% at 80% 80%, rgba(232,135,122,0.25), transparent 70%)",
  sand: "radial-gradient(60% 60% at 30% 30%, rgba(220,201,176,0.7), transparent 65%), radial-gradient(50% 55% at 70% 70%, rgba(166,173,151,0.35), transparent 70%)",
};

export function Wash({ variant = "sage", className }: Props) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 blur-2xl opacity-90", className)}
      style={{ backgroundImage: gradients[variant] }}
    />
  );
}
