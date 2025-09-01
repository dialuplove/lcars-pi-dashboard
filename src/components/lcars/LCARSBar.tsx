import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const lcarsBarVariants = cva(
  "rounded-full transition-all duration-300",
  {
    variants: {
      variant: {
        1: "lcars-panel-3",
        2: "lcars-panel-1", 
        3: "lcars-panel-3",
        4: "bg-muted",
        5: "lcars-panel-2",
        6: "lcars-panel-5",
        7: "lcars-panel-6",
        8: "lcars-panel-7",
        9: "lcars-panel-8",
        10: "lcars-panel-9",
        11: "lcars-panel-1",
        12: "lcars-panel-2",
        13: "lcars-panel-3",
        14: "lcars-panel-4",
      },
      size: {
        default: "h-8",
        sm: "h-6",
        lg: "h-10",
      },
      width: {
        auto: "w-auto",
        fixed: "w-16",
        medium: "w-20",
        large: "w-24",
        xl: "w-28",
        xxl: "w-32",
        flex: "flex-1",
      },
    },
    defaultVariants: {
      variant: 1,
      size: "default",
      width: "auto",
    },
  }
);

export interface LCARSBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lcarsBarVariants> {
  animated?: boolean;
}

const LCARSBar = React.forwardRef<HTMLDivElement, LCARSBarProps>(
  ({ className, variant, size, width, animated = false, ...props }, ref) => {
    return (
      <div
        className={cn(
          lcarsBarVariants({ variant, size, width }),
          animated && "animate-pulse",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
LCARSBar.displayName = "LCARSBar";

export { LCARSBar, lcarsBarVariants };