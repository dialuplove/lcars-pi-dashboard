import { useEffect, useState } from 'react';
import { LCARSInterface } from '@/components/lcars/LCARSInterface';
import { LCARSLoader } from '@/components/lcars/LCARSLoader';
import { fetchSystemStatus, SystemStatus } from '@/lib/api';

const Index = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSystemData = async () => {
      try {
        const status = await fetchSystemStatus();
        setSystemStatus(status);
      } catch (error) {
        console.error('Failed to load system status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSystemData();
    
    // Refresh status every 30 seconds
    const interval = setInterval(loadSystemData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <LCARSLoader message="INITIALIZING LCARS INTERFACE" />;
  }

  return <LCARSInterface systemStatus={systemStatus} />;
};

export default Index;