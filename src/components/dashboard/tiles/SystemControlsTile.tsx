import { useState } from 'react';
import { Terminal, RotateCcw, FileText, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { triggerSystemAction } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export const SystemControlsTile = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAction = async (action: 'restart' | 'refresh' | 'logs') => {
    setIsLoading(action);
    try {
      if (action === 'logs') {
        // Simulate opening logs in a new window/tab
        toast({
          title: 'System Logs',
          description: 'Opening system logs viewer...',
        });
      } else {
        await triggerSystemAction(action);
        toast({
          title: 'Action Completed',
          description: `System ${action} initiated successfully`,
        });
      }
    } catch (error) {
      toast({
        title: 'Action Failed',
        description: `Failed to execute ${action}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="lcars-panel h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Terminal className="w-6 h-6 text-foreground" />
          <span className="font-medium">System</span>
        </div>
        <div className="status-pip online" />
      </div>

      <div className="flex-1 p-4 flex flex-col space-y-3">
        <Button
          onClick={() => handleAction('restart')}
          disabled={isLoading !== null}
          variant="destructive"
          size="sm"
          className="w-full lcars-touch"
        >
          {isLoading === 'restart' ? (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
          ) : (
            <RotateCcw className="w-4 h-4 mr-2" />
          )}
          Restart Services
        </Button>

        <Button
          onClick={() => handleAction('logs')}
          disabled={isLoading !== null}
          variant="secondary"
          size="sm"
          className="w-full lcars-touch"
        >
          {isLoading === 'logs' ? (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
          ) : (
            <FileText className="w-4 h-4 mr-2" />
          )}
          Open Logs
        </Button>

        <Button
          onClick={() => handleAction('refresh')}
          disabled={isLoading !== null}
          variant="outline"
          size="sm"
          className="w-full lcars-touch"
        >
          {isLoading === 'refresh' ? (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>
    </div>
  );
};