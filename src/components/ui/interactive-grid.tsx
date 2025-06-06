import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridProps extends React.HTMLAttributes<HTMLDivElement> {}

export const InteractiveGrid = ({
  className,
  ...props
}: InteractiveGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        gridRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      gridRef.current.style.setProperty("--mouse-x", `${x}`);
      gridRef.current.style.setProperty("--mouse-y", `${y}`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(0,0,0,0.1) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};
