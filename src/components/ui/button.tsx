// src/components/ui/button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "outline" | "ghost";
  size?: "icon" | "default";
};

// 🟢 Nueva función auxiliar
export function buttonVariants({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "outline" | "ghost";
  className?: string;
}) {
  let base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  let variantClass = "";
  if (variant === "outline") variantClass = "border border-gray-300";
  else if (variant === "ghost") variantClass = "bg-transparent hover:bg-gray-100";
  else variantClass = "bg-blue-600 text-white hover:bg-blue-700";

  return cn(base, variantClass, className);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, className })}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
