import { useEffect, useState } from 'react';
import { StatusStrip } from '@/components/dashboard/StatusStrip';
import { MainTileGrid } from '@/components/dashboard/MainTileGrid';
import { ActionBar } from '@/components/dashboard/ActionBar';
import { fetchSystemStatus, fetchKioskConfig, SystemStatus, KioskConfig } from '@/lib/api';

const Index = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [kioskConfig, setKioskConfig] = useState<KioskConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [status, config] = await Promise.all([
          fetchSystemStatus(),
          fetchKioskConfig(),
        ]);
        setSystemStatus(status);
        setKioskConfig(config);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
    
    // Refresh status every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="lcars-panel p-8 animate-pulse">
          <div className="text-xl text-primary">Initializing LCARS Interface...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="lcars-grid">
        {/* Top Status Strip */}
        <div className="col-span-6 row-span-1">
          <StatusStrip status={systemStatus} />
        </div>

        {/* Main Tile Grid */}
        <div className="col-span-6 row-span-2">
          <MainTileGrid config={kioskConfig} />
        </div>

        {/* Bottom Action Bar */}
        <div className="col-span-6 row-span-1">
          <ActionBar />
        </div>
      </div>
    </div>
  );
};

export default Index;