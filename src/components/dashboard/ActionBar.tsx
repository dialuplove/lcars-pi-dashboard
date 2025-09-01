import { Button } from '@/components/ui/button';
import { Settings, RotateCcw, RefreshCw, HelpCircle } from 'lucide-react';
import { triggerSystemAction } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const ActionBar = () => {
  const { toast } = useToast();

  const handleAction = async (action: 'restart' | 'refresh' | 'settings' | 'help') => {
    try {
      if (action === 'settings') {
        toast({
          title: 'Settings',
          description: 'Settings panel not yet implemented',
        });
        return;
      }

      if (action === 'help') {
        toast({
          title: 'Help',
          description: 'LCARS Dashboard v1.0 - Touch interface for Raspberry Pi',
        });
        return;
      }

      if (action === 'refresh') {
        window.location.reload();
        return;
      }

      await triggerSystemAction(action);
      toast({
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Initiated`,
        description: `System ${action} has been triggered successfully`,
      });
    } catch (error) {
      toast({
        title: 'Action Failed',
        description: `Failed to execute ${action}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="lcars-panel h-full flex items-center justify-center bg-gradient-secondary">
      <div className="flex items-center space-x-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleAction('settings')}
          className="h-16 px-8 bg-transparent border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary lcars-touch"
        >
          <Settings className="w-6 h-6 mr-3" />
          SETTINGS
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => handleAction('restart')}
          className="h-16 px-8 bg-transparent border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary lcars-touch"
        >
          <RotateCcw className="w-6 h-6 mr-3" />
          RESTART
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => handleAction('refresh')}
          className="h-16 px-8 bg-transparent border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary lcars-touch"
        >
          <RefreshCw className="w-6 h-6 mr-3" />
          REFRESH
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => handleAction('help')}
          className="h-16 px-8 bg-transparent border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary lcars-touch"
        >
          <HelpCircle className="w-6 h-6 mr-3" />
          HELP
        </Button>
      </div>
    </div>
  );
};