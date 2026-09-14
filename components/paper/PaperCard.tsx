import { cn } from "@/lib/utils";
import type { PropsWithChildren, CSSProperties } from "react";

type Props = PropsWithChildren<{
  className?: string;
  tilt?: number;
  torn?: boolean;
  style?: CSSProperties;
}>;

export function PaperCard({ children, className, tilt = 0, torn = true, style }: Props) {
  return (
    <div
      className={cn(
        "paper-card relative px-6 py-8 md:px-10 md:py-10",
        torn && "torn-top torn-bottom",
        className,
      )}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}
    >
      {children}
    </div>
  );
}
