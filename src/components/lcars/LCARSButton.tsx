import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useLCARSSound } from "@/hooks/useLCARSSound";

const lcarsButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 lcars-text",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-115",
        panel1: "lcars-panel-1 hover:brightness-115",
        panel2: "lcars-panel-2 hover:brightness-115", 
        panel3: "lcars-panel-3 hover:brightness-115",
        panel4: "lcars-panel-4 hover:brightness-115",
        panel5: "lcars-panel-5 hover:brightness-115",
        panel6: "lcars-panel-6 hover:brightness-115",
        panel7: "lcars-panel-7 hover:brightness-115",
        panel8: "lcars-panel-8 hover:brightness-115",
        panel9: "lcars-panel-9 hover:brightness-115",
        panel10: "lcars-panel-10 hover:brightness-115",
        nav1: "bg-[hsl(var(--lcars-cool))] text-background hover:brightness-115",
        nav2: "bg-[hsl(var(--lcars-roseblush))] text-background hover:brightness-115",
        nav3: "bg-[hsl(var(--lcars-honey))] text-background hover:brightness-115",
        nav4: "bg-[hsl(var(--lcars-cardinal))] text-foreground hover:brightness-115",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-md px-8",
        panel: "min-h-16 px-4 py-3",
        nav: "h-20 w-56 px-6",
      },
      shape: {
        default: "rounded-none",
        pill: "rounded-full",
        panel: "rounded-none border-4 border-background",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

export interface LCARSButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof lcarsButtonVariants> {
  asChild?: boolean;
  soundEffect?: 'beep1' | 'beep2' | 'beep3' | 'beep4' | false;
  panelNumber?: string;
}

const LCARSButton = React.forwardRef<HTMLButtonElement, LCARSButtonProps>(
  ({ className, variant, size, shape, asChild = false, soundEffect = 'beep2', panelNumber, onClick, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { beep } = useLCARSSound();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (soundEffect) {
        beep(soundEffect);
      }
      
      if (onClick) {
        onClick(event);
      }
    };

    return (
      <Comp
        className={cn(lcarsButtonVariants({ variant, size, shape, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {panelNumber && (
          <span className="lcars-number">
            {panelNumber.split('-')[0]}<span className="hop">-{panelNumber.split('-')[1]}</span>
          </span>
        )}
        {children}
      </Comp>
    );
  }
);
LCARSButton.displayName = "LCARSButton";

export { LCARSButton, lcarsButtonVariants };