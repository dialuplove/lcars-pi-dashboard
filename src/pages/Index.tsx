import { useState, useEffect } from 'react';
import { LCARSInterface } from '@/components/lcars/LCARSInterface';
import { LCARSThemeProvider } from '@/components/lcars/LCARSTheme';
import { LCARSLoader } from '@/components/lcars/LCARSLoader';
import { ActionBar } from '@/components/dashboard/ActionBar';
import { StatusStrip } from '@/components/dashboard/StatusStrip';
import { MainTileGrid } from '@/components/dashboard/MainTileGrid';
import { DevelopmentToggle } from '@/components/dashboard/DevelopmentToggle';
import { fetchSystemStatus, fetchKioskConfig, SystemStatus, KioskConfig } from '@/lib/api';

const Index = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [config, setConfig] = useState<KioskConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLCARS, setShowLCARS] = useState(true); // Default to LCARS view

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [statusData, configData] = await Promise.all([
          fetchSystemStatus(),
          fetchKioskConfig()
        ]);
        
        setSystemStatus(statusData);
        setConfig(configData);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();

    // Refresh system status every 30 seconds
    const statusInterval = setInterval(async () => {
      try {
        const statusData = await fetchSystemStatus();
        setSystemStatus(statusData);
      } catch (error) {
        console.error('Failed to refresh system status:', error);
      }
    }, 30000);

    return () => clearInterval(statusInterval);
  }, []);

  if (loading) {
    return <LCARSLoader message="INITIALIZING LCARS INTERFACE" />;
  }

  return (
    <LCARSThemeProvider defaultTheme="nemesis-blue">
      <div className="min-h-screen bg-background">
        <DevelopmentToggle onModeChange={(devMode) => setShowLCARS(!devMode)} />
        
        {showLCARS ? (
          <LCARSInterface systemStatus={systemStatus} config={config} />
        ) : (
          <>
            <ActionBar />
            <StatusStrip status={systemStatus} />
            <MainTileGrid config={config} />
          </>
        )}
      </div>
    </LCARSThemeProvider>
  );
};

export default Index;