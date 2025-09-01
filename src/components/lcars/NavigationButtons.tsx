import * as React from "react";
import { cn } from "@/lib/utils";
import { useLCARSSound } from "@/hooks/useLCARSSound";

interface NavigationButtonsProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
  className?: string;
}

const navigationItems = [
  { id: "home-assistant", label: "01", title: "HOME ASSISTANT" },
  { id: "photo-frame", label: "02", title: "PHOTO FRAME" },
  { id: "live-camera", label: "03", title: "LIVE CAMERA" },
  { id: "system-controls", label: "04", title: "SYSTEM CONTROLS" },
];

export const NavigationButtons = ({ onNavigate, activeSection, className }: NavigationButtonsProps) => {
  const { beep } = useLCARSSound();

  const handleNavClick = (sectionId: string, title: string) => {
    beep('beep2');
    onNavigate(sectionId);
    console.log(`LCARS: Navigation to ${title}`);
  };

  return (
    <nav className={cn("flex gap-4 p-4", className)}>
      {navigationItems.map((item, index) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id, item.title)}
          className={cn(
            "flex-1 h-16 text-xl rounded-[20px] border-0 cursor-pointer min-w-24",
            "lcars-text font-bold transition-all duration-200",
            "hover:brightness-110 active:brightness-90",
            activeSection === item.id && "brightness-125 scale-105",
            // Apply different panel colors to each button
            index === 0 && "lcars-panel-1 text-background",
            index === 1 && "lcars-panel-2 text-background", 
            index === 2 && "lcars-panel-3 text-background",
            index === 3 && "lcars-panel-4 text-background"
          )}
          aria-label={item.title}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};