import { useState, useEffect } from 'react';
import { KioskConfig, fetchCameraStatus, CameraStatus } from '@/lib/api';
import { HomeAssistantTile } from './tiles/HomeAssistantTile';
import { PhotoFrameTile } from './tiles/PhotoFrameTile';
import { LiveCamTile } from './tiles/LiveCamTile';
import { SystemControlsTile } from './tiles/SystemControlsTile';

interface MainTileGridProps {
  config: KioskConfig | null;
}

export const MainTileGrid = ({ config }: MainTileGridProps) => {
  const [cameraStatus, setCameraStatus] = useState<CameraStatus | null>(null);

  useEffect(() => {
    const loadCameraStatus = async () => {
      try {
        const status = await fetchCameraStatus();
        setCameraStatus(status);
      } catch (error) {
        console.error('Failed to load camera status:', error);
      }
    };

    loadCameraStatus();
    const interval = setInterval(loadCameraStatus, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full grid grid-cols-4 grid-rows-2 gap-4 p-4 overflow-hidden">
      {/* Home Assistant - Large tile (2x2) */}
      <div className="col-span-2 row-span-2 min-h-0 overflow-hidden">
        <HomeAssistantTile />
      </div>

      {/* Photo Frame Controls - Top right */}
      <div className="col-span-2 row-span-1 min-h-0 overflow-hidden">
        <PhotoFrameTile rotation={config?.rotation} intervalSec={config?.intervalSec} />
      </div>

      {/* Live Camera - Bottom right left */}
      <div className="col-span-1 row-span-1 min-h-0 overflow-hidden">
        <LiveCamTile cameraStatus={cameraStatus} />
      </div>

      {/* System Controls - Bottom right right */}
      <div className="col-span-1 row-span-1 min-h-0 overflow-hidden">
        <SystemControlsTile />
      </div>
    </div>
  );
};