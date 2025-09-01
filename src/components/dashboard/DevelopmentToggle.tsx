import { useState } from 'react';
import { Settings, Database, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DevelopmentToggleProps {
  onModeChange?: (isDevelopmentMode: boolean) => void;
}

export const DevelopmentToggle = ({ onModeChange }: DevelopmentToggleProps) => {
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(true);
  const { toast } = useToast();

  const toggleMode = () => {
    const newMode = !isDevelopmentMode;
    setIsDevelopmentMode(newMode);
    onModeChange?.(newMode);
    
    toast({
      title: `${newMode ? 'Development' : 'Production'} Mode`,
      description: `Switched to ${newMode ? 'mock data' : 'live data'} mode`,
      duration: 2000,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
        {isDevelopmentMode ? (
          <Database className="w-3 h-3" />
        ) : (
          <Wifi className="w-3 h-3" />
        )}
        <span className="lcars-text">
          {isDevelopmentMode ? 'MOCK' : 'LIVE'}
        </span>
      </div>
      
      <Button
        onClick={toggleMode}
        size="sm"
        variant="outline"
        className="h-6 px-2 text-xs lcars-touch hover:bg-primary hover:text-primary-foreground"
      >
        <Settings className="w-3 h-3 mr-1" />
        {isDevelopmentMode ? 'GO LIVE' : 'DEV MODE'}
      </Button>
    </div>
  );
};