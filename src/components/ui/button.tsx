// src/components/ui/button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "outline";
  size?: "icon" | "default";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "outline" && "border border-gray-300",
          size === "icon" && "p-2",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";