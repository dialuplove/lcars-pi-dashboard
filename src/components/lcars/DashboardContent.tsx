import * as React from "react";
import { cn } from "@/lib/utils";
import { MainTileGrid } from "@/components/dashboard/MainTileGrid";
import { HomeAssistantTile } from "@/components/dashboard/tiles/HomeAssistantTile";
import { PhotoFrameTile } from "@/components/dashboard/tiles/PhotoFrameTile";
import { LiveCamTile } from "@/components/dashboard/tiles/LiveCamTile";
import { SystemControlsTile } from "@/components/dashboard/tiles/SystemControlsTile";
import { KioskConfig, CameraStatus } from "@/lib/api";

interface DashboardContentProps {
  activeSection: string;
  config: KioskConfig | null;
  cameraStatus: CameraStatus | null;
  className?: string;
}

export const DashboardContent = ({ 
  activeSection, 
  config, 
  cameraStatus, 
  className 
}: DashboardContentProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case "home-assistant":
        return (
          <div className="h-full p-8">
            <div className="h-full max-w-4xl mx-auto">
              <HomeAssistantTile />
            </div>
          </div>
        );
      
      case "photo-frame":
        return (
          <div className="h-full p-8">
            <div className="h-full max-w-4xl mx-auto">
              <PhotoFrameTile 
                rotation={config?.rotation} 
                intervalSec={config?.intervalSec} 
              />
            </div>
          </div>
        );
      
      case "live-camera":
        return (
          <div className="h-full p-8">
            <div className="h-full max-w-4xl mx-auto">
              <LiveCamTile cameraStatus={cameraStatus} />
            </div>
          </div>
        );
      
      case "system-controls":
        return (
          <div className="h-full p-8">
            <div className="h-full max-w-4xl mx-auto">
              <SystemControlsTile />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="h-full">
            <MainTileGrid config={config} />
          </div>
        );
    }
  };

  return (
    <main className={cn("flex-1 overflow-hidden", className)}>
      <div className="h-full transition-all duration-500 ease-in-out">
        {renderContent()}
      </div>
    </main>
  );
};