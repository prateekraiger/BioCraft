import React from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InteractiveGrid = React.forwardRef<
  HTMLDivElement,
  InteractiveGridProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative h-full w-full bg-white", className)}
      {...props}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
    </div>
  );
});
