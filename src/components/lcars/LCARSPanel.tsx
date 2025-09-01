import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useLCARSSound } from "@/hooks/useLCARSSound";

const lcarsPanelVariants = cva(
  "flex items-center px-6 text-background lcars-text font-bold transition-all duration-200 border-0",
  {
    variants: {
      variant: {
        1: "lcars-panel-1",
        2: "lcars-panel-2", 
        3: "lcars-panel-3",
        4: "lcars-panel-4",
        5: "lcars-panel-5",
        6: "lcars-panel-6",
        7: "lcars-panel-7",
        8: "lcars-panel-8",
        9: "lcars-panel-9",
        10: "lcars-panel-10",
      },
      size: {
        default: "h-12",
        large: "h-16",
        xl: "h-20",
      },
      shape: {
        default: "rounded-none",
        "rounded-left": "rounded-l-[40px]",
        "rounded-right": "rounded-r-[40px]",
        "rounded-top-left": "rounded-tl-[60px] rounded-bl-sm",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: 1,
      size: "default",
      shape: "default",
    },
  }
);

export interface LCARSPanelProps
  extends VariantProps<typeof lcarsPanelVariants> {
  panelNumber?: string;
  interactive?: boolean;
  soundEffect?: 'beep1' | 'beep2' | 'beep3' | 'beep4' | false;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const LCARSPanel = ({ 
  className, 
  variant, 
  size, 
  shape, 
  panelNumber, 
  interactive = false, 
  soundEffect = 'beep2', 
  onClick, 
  children 
}: LCARSPanelProps) => {
  const { beep } = useLCARSSound();

  const handleClick = () => {
    if (interactive && soundEffect) {
      beep(soundEffect);
    }
    
    if (onClick) {
      onClick();
    }
  };

  const content = (
    <>
      {panelNumber && (
        <span className="lcars-number">
          {panelNumber.includes('-') ? (
            <>
              {panelNumber.split('-')[0]}
              <span className="hop">-{panelNumber.split('-')[1]}</span>
            </>
          ) : (
            panelNumber
          )}
        </span>
      )}
      {children}
    </>
  );

  if (interactive) {
    return (
      <button
        className={cn(
          lcarsPanelVariants({ variant, size, shape }),
          "cursor-pointer hover:brightness-110 active:brightness-90",
          className
        )}
        onClick={handleClick}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      className={cn(
        lcarsPanelVariants({ variant, size, shape }),
        className
      )}
    >
      {content}
    </div>
  );
};