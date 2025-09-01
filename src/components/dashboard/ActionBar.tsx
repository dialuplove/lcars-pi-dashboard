import { LCARSButton } from '@/components/lcars/LCARSButton';
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
    <div className="h-20 bg-card border-t-4 border-background flex items-center justify-center gap-4">
      <LCARSButton
        variant="nav1"
        size="nav"
        shape="pill"
        panelNumber="01-001"
        onClick={() => handleAction('settings')}
      >
        <Settings className="w-5 h-5" />
        SETTINGS
      </LCARSButton>

      <LCARSButton
        variant="nav2"
        size="nav"
        shape="pill"
        panelNumber="02-002"
        onClick={() => handleAction('restart')}
      >
        <RotateCcw className="w-5 h-5" />
        RESTART
      </LCARSButton>

      <LCARSButton
        variant="nav3"
        size="nav"
        shape="pill"
        panelNumber="03-003"
        onClick={() => handleAction('refresh')}
      >
        <RefreshCw className="w-5 h-5" />
        REFRESH
      </LCARSButton>

      <LCARSButton
        variant="nav4"
        size="nav"
        shape="pill"
        panelNumber="04-004"
        onClick={() => handleAction('help')}
      >
        <HelpCircle className="w-5 h-5" />
        HELP
      </LCARSButton>
    </div>
  );
};