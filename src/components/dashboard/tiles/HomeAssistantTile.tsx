import { useState } from 'react';
import { Home, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HomeAssistantTile = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="lcars-panel h-full flex flex-col bg-gradient-accent">
      <div className="flex items-center justify-between p-4 border-b border-accent-foreground/20">
        <div className="flex items-center space-x-3">
          <Home className="w-6 h-6 text-accent-foreground" />
          <span className="text-lg font-medium text-accent-foreground">Home Assistant</span>
        </div>
        <div className="status-pip online" />
      </div>

      <div className="flex-1 relative">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-accent/80 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin mx-auto" />
                <div className="absolute inset-2 border-2 border-accent-foreground/20 border-r-accent-foreground/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>
              <div className="space-y-2">
                <div className="text-accent-foreground lcars-text">LOADING HOME ASSISTANT</div>
                <div className="text-xs text-accent-foreground/70 lcars-number">
                  ESTABLISHING SECURE CONNECTION...
                </div>
              </div>
            </div>
          </div>
        )}
        
        <iframe
          src="about:blank"
          className="w-full h-full border-0 rounded-lg"
          title="Home Assistant Dashboard"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      <div className="p-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent border-accent-foreground/40 text-accent-foreground hover:bg-accent-foreground hover:text-accent lcars-touch"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Fullscreen
        </Button>
      </div>
    </div>
  );
};