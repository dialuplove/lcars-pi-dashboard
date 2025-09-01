import { useState } from 'react';
import { Camera, Play, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CameraStatus, requestCameraToken } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface LiveCamTileProps {
  cameraStatus: CameraStatus | null;
}

export const LiveCamTile = ({ cameraStatus }: LiveCamTileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const openStream = async () => {
    if (!cameraStatus?.active) {
      toast({
        title: 'Camera Offline',
        description: 'Camera HulaGirl is currently offline',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { streamUrl: url } = await requestCameraToken('HG01');
      setStreamUrl(url);
      
      // In a real implementation, this would open a video player
      toast({
        title: 'Stream Opened',
        description: 'Live camera stream is now available',
      });
    } catch (error) {
      toast({
        title: 'Stream Failed',
        description: 'Unable to obtain camera stream',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusPip = () => {
    if (!cameraStatus) return 'warning';
    return cameraStatus.active ? 'online' : 'offline';
  };

  return (
    <div className="lcars-panel h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Camera className="w-6 h-6 text-foreground" />
          <span className="font-medium">HulaGirl</span>
        </div>
        <div className={`status-pip ${getStatusPip()}`} />
      </div>

      <div className="flex-1 p-4 flex flex-col">
        {/* Camera Preview/Status */}
        <div className="flex-1 bg-muted rounded-lg flex items-center justify-center mb-4 relative overflow-hidden min-h-0 max-h-full">
          {cameraStatus?.active ? (
            <div className="text-center">
              <Camera className="w-12 h-12 text-muted-foreground mb-2 mx-auto" />
              <div className="text-sm text-muted-foreground">Live Preview</div>
              {cameraStatus.deviceId && (
                <div className="text-xs text-muted-foreground mt-1">
                  ID: {cameraStatus.deviceId}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-destructive mb-2 mx-auto" />
              <div className="text-sm text-destructive">Camera Offline</div>
            </div>
          )}
        </div>

        {/* Open Stream Button */}
        <Button
          onClick={openStream}
          disabled={!cameraStatus?.active || isLoading}
          className="w-full lcars-touch"
          variant={cameraStatus?.active ? 'default' : 'secondary'}
        >
          {isLoading ? (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
          ) : (
            <Play className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Opening...' : 'Open Stream'}
        </Button>
      </div>
    </div>
  );
};