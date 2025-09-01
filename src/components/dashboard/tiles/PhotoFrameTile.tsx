import { useState } from 'react';
import { Image, Play, Pause, SkipForward, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoFrameTileProps {
  rotation?: string[];
  intervalSec?: number;
}

export const PhotoFrameTile = ({ rotation, intervalSec = 30 }: PhotoFrameTileProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFolder, setCurrentFolder] = useState('Family Photos');

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextPhoto = () => {
    console.log('Next photo requested');
  };

  return (
    <div className="lcars-panel h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Image className="w-6 h-6 text-foreground" />
          <span className="text-lg font-medium">Photo Frame</span>
        </div>
        <div className={`status-pip ${isPlaying ? 'online' : 'warning'}`} />
      </div>

      <div className="flex-1 p-4 flex flex-col space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <FolderOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{currentFolder}</span>
          </div>
          <div className="text-muted-foreground">
            {intervalSec}s interval
          </div>
        </div>

        {/* Rotation Info */}
        {rotation && (
          <div className="text-xs text-muted-foreground">
            Rotation: {rotation.join(' → ')}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center space-x-3 mt-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            className="lcars-touch"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextPhoto}
            disabled={!isPlaying}
            className="lcars-touch"
          >
            <SkipForward className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="lcars-touch"
          >
            <FolderOpen className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};