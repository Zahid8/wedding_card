import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  flip?: boolean;
  opacity?: number;
  width?: number;
};

export function Foliage({ className, flip, opacity = 0.9, width = 220 }: Props) {
  return (
    <img
      aria-hidden
      src="/masks/olive-branch.svg"
      alt=""
      className={cn("pointer-events-none absolute", className)}
      style={{
        width,
        opacity,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
