import { cn } from "@/lib/utils";

type Props = {
  edge?: "top" | "bottom" | "both";
  color?: string;
  className?: string;
};

export function TornEdge({ edge = "top", color = "var(--color-paper)", className }: Props) {
  return (
    <div className={cn("pointer-events-none relative", className)} aria-hidden>
      {(edge === "top" || edge === "both") && (
        <div
          className="absolute inset-x-0 top-0 h-6 torn-bottom"
          style={{ background: color }}
        />
      )}
      {(edge === "bottom" || edge === "both") && (
        <div
          className="absolute inset-x-0 bottom-0 h-6 torn-top"
          style={{ background: color }}
        />
      )}
    </div>
  );
}
