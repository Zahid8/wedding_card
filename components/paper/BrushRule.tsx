import { cn } from "@/lib/utils";

export function BrushRule({
  className,
  width = 200,
  vertical = false,
}: {
  className?: string;
  width?: number;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <span
        aria-hidden
        className={cn("inline-block bg-[url('/masks/brush-rule.svg')] bg-no-repeat", className)}
        style={{ width: 6, height: width, backgroundSize: `6px ${width}px`, transform: "rotate(90deg)" }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={cn("inline-block bg-[url('/masks/brush-rule.svg')] bg-no-repeat", className)}
      style={{ width, height: 8, backgroundSize: `${width}px 8px` }}
    />
  );
}
