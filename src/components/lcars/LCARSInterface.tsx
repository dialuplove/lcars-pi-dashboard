import { useState, useEffect } from 'react';
import { useLCARSSound } from '@/hooks/useLCARSSound';
import { SystemStatus, KioskConfig, CameraStatus, fetchCameraStatus } from '@/lib/api';
import { LCARSPanel } from './LCARSPanel';
import { LCARSBar } from './LCARSBar';
import { NavigationButtons } from './NavigationButtons';
import { DashboardContent } from './DashboardContent';
import { DataCascade } from './DataCascade';

interface LCARSInterfaceProps {
  systemStatus: SystemStatus | null;
  config: KioskConfig | null;
}

export const LCARSInterface = ({ systemStatus, config }: LCARSInterfaceProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('dashboard');
  const [cameraStatus, setCameraStatus] = useState<CameraStatus | null>(null);
  const { beep } = useLCARSSound();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadCameraStatus = async () => {
      try {
        const status = await fetchCameraStatus();
        setCameraStatus(status);
      } catch (error) {
        console.error('Failed to load camera status:', error);
      }
    };

    loadCameraStatus();
    const interval = setInterval(loadCameraStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  const handleLCARSClick = () => {
    beep('beep2');
    setActiveSection('dashboard');
    console.log('LCARS: Navigation to main dashboard');
  };

  const topFunction = () => {
    beep('beep4');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="wrap-all">
      <div className="wrap">
        <div className="left-frame-top">
          <LCARSPanel 
            variant={2}
            size="large"
            shape="rounded-top-left"
            interactive
            onClick={handleLCARSClick}
          >
            LCARS
          </LCARSPanel>
          <LCARSPanel 
            variant={1}
            size="xl"
            shape="rounded-left"
            panelNumber="02-262000"
          />
        </div>
        <div className="right-frame-top">
          <div className="banner">
            LCARS {currentTime.toLocaleString('en-US', { 
              year: '2-digit',
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(/[\/,]/g, '').replace(/\s/g, '.')}
          </div>
          <div className="data-cascade-button-group">
            <div className="data-wrapper">
              <DataCascade columns={18} animated={true} />
            </div>
            <NavigationButtons 
              onNavigate={handleNavigation}
              activeSection={activeSection}
            />
          </div>
          <div className="bar-panel first-bar-panel">
            <LCARSBar variant={1} width="flex" />
            <LCARSBar variant={2} width="fixed" />
            <LCARSBar variant={3} width="flex" />
            <LCARSBar variant={4} width="xl" />
            <LCARSBar variant={5} width="large" />
          </div>
        </div>
      </div>

      <div className="divider">
        <div className="block-left"> </div>
        <div className="block-right">
          <div className="block-row">
            <LCARSBar variant={11} width="flex" />
            <LCARSBar variant={12} width="medium" />
            <LCARSBar variant={13} width="flex" />
            <div className="relative lcars-panel-4 w-32 h-full rounded-full">
              <div className="blockhead"> </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="left-frame">
          <button 
            onClick={topFunction}
            className="lcars-panel-3 h-12 rounded-l-[40px] flex items-center px-6 text-background lcars-text font-bold cursor-pointer border-0 transition-all duration-200 hover:brightness-110 active:brightness-90"
            id="topBtn"
          >
            <span className="hop">screen</span> top
          </button>
          <div className="space-y-2">
            <LCARSPanel variant={3} shape="rounded-left" panelNumber="03-111968" />
            <LCARSPanel variant={4} shape="rounded-left" panelNumber="04-041969" />
            <LCARSPanel variant={5} shape="rounded-left" panelNumber="05-1701D" />
            <LCARSPanel variant={6} shape="rounded-left" panelNumber="06-071984" />
          </div>
          <div>
            <LCARSPanel variant={7} shape="rounded-left" panelNumber="07-081940" />
          </div>
        </div>
        <div className="right-frame">
          <div className="bar-panel">
            <LCARSBar variant={6} width="flex" />
            <LCARSBar variant={7} width="medium" />
            <LCARSBar variant={8} width="flex" />
            <LCARSBar variant={9} width="fixed" />
            <LCARSBar variant={10} width="xl" />
          </div>
          <DashboardContent 
            activeSection={activeSection}
            config={config}
            cameraStatus={cameraStatus}
          />
          <footer className="px-8 py-4 text-center text-sm text-muted-foreground">
            {systemStatus && (
              <div className="mb-2 lcars-text">
                CPU: {systemStatus.cpuTemp.toFixed(1)}°C • RAM: {systemStatus.ramPct.toFixed(0)}% • 
                TUNNEL: {systemStatus.tunnel.toUpperCase()}
              </div>
            )}
            Content Copyright © 2025 LCARS Dashboard<br />
            LCARS Inspired Website Template by{' '}
            <a href="https://www.thelcars.com" className="text-primary hover:brightness-110">
              www.TheLCARS.com
            </a>
          </footer>
        </div>
      </div>

      <div className="headtrim"> </div>
      <div className="baseboard"> </div>
    </div>
  );
};