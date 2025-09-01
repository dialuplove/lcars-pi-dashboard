import { useState, useEffect } from 'react';
import { DataCascade } from './DataCascade';
import { LCARSButton } from './LCARSButton';
import { useLCARSSound } from '@/hooks/useLCARSSound';
import { SystemStatus } from '@/lib/api';

interface LCARSInterfaceProps {
  systemStatus: SystemStatus | null;
}

export const LCARSInterface = ({ systemStatus }: LCARSInterfaceProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { beep } = useLCARSSound();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = (action: string) => {
    beep('beep2');
    console.log(`LCARS: ${action} activated`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* LCARS Header */}
      <div className="relative">
        <div className="absolute top-4 right-8 text-right">
          <div className="text-6xl font-bold text-primary lcars-text">
            LCARS
          </div>
          <div className="text-3xl text-primary lcars-number">
            56844
          </div>
        </div>
      </div>

      {/* Main LCARS Layout */}
      <div className="flex h-screen">
        {/* Left Side Panels */}
        <div className="flex flex-col w-64 space-y-2 p-4">
          {/* Top Left Panel */}
          <div className="lcars-panel-2 h-16 rounded-tl-[60px] rounded-bl-sm flex items-center px-6">
            <span className="text-background font-bold lcars-text">LCARS</span>
          </div>

          {/* Time Panel */}
          <div className="lcars-panel-1 h-20 rounded-l-[40px] flex items-center px-6">
            <div className="text-background">
              <div className="text-sm lcars-number">
                {String(currentTime.getMonth() + 1).padStart(2, '0')}-{String(currentTime.getDate()).padStart(2, '0')}{currentTime.getFullYear()}
              </div>
            </div>
          </div>

          {/* Main Left Panel */}
          <div className="lcars-panel-3 flex-1 rounded-l-[80px] rounded-br-[40px] flex flex-col justify-center px-6 space-y-4">
            <div className="text-background lcars-number text-sm">03-111968</div>
            <div className="text-background lcars-number text-sm">04-041969</div>
          </div>
        </div>

        {/* Center Content Area */}
        <div className="flex-1 px-8 py-16 flex flex-col">
          {/* Data Cascade */}
          <div className="flex-1 mb-8">
            <DataCascade />
          </div>

          {/* Bottom Status Bar */}
          <div className="flex space-x-2 mb-4">
            <div className="lcars-panel-3 h-8 flex-1 rounded-full" />
            <div className="lcars-panel-1 h-8 w-16 rounded-full" />
            <div className="lcars-panel-3 h-8 flex-1 rounded-full" />
            <div className="bg-muted h-8 w-32 rounded-full" />
          </div>

          {/* Welcome Message */}
          <div className="text-center space-y-4">
            <div className="text-right">
              <div className="text-6xl text-primary lcars-text mb-4">HELLO</div>
            </div>
            <div className="text-2xl text-foreground lcars-text">
              WELCOME TO LCARS • NEMESIS BLUE THEME • ULTRA LAYOUT
            </div>
            <div className="text-xl text-success lcars-text">
              VERSION 24.2
            </div>
            {systemStatus && (
              <div className="text-lg text-muted-foreground lcars-text">
                CPU: {systemStatus.cpuTemp.toFixed(1)}°C • RAM: {systemStatus.ramPct.toFixed(0)}% • 
                TUNNEL: {systemStatus.tunnel.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Control Panels */}
        <div className="flex flex-col w-80 space-y-4 p-4">
          {/* Status Indicator */}
          <div className="text-right mb-4">
            <div className="text-2xl text-primary lcars-text">
              OPTICAL DATA NETWORK AVAILABLE
            </div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <LCARSButton
              variant="nav1"
              size="nav"
              shape="pill"
              onClick={() => handleButtonClick('HOME ASSISTANT')}
              className="h-24 text-2xl rounded-[20px]"
            >
              01
            </LCARSButton>
            
            <LCARSButton
              variant="nav2"
              size="nav"
              shape="pill"
              onClick={() => handleButtonClick('PHOTO FRAME')}
              className="h-24 text-2xl rounded-[20px]"
            >
              02
            </LCARSButton>
            
            <LCARSButton
              variant="nav3"
              size="nav" 
              shape="pill"
              onClick={() => handleButtonClick('LIVE CAMERA')}
              className="h-24 text-2xl rounded-[20px]"
            >
              03
            </LCARSButton>
            
            <LCARSButton
              variant="nav4"
              size="nav"
              shape="pill"
              onClick={() => handleButtonClick('SYSTEM CONTROLS')}
              className="h-24 text-2xl rounded-[20px]"
            >
              04
            </LCARSButton>
          </div>

          {/* Additional Control Panels */}
          <div className="space-y-2 mt-8">
            <div className="lcars-panel-5 h-12 rounded-r-[30px] flex items-center justify-center">
              <span className="text-background lcars-text text-sm">MAIN COMPUTER</span>
            </div>
            <div className="lcars-panel-6 h-12 rounded-r-[30px] flex items-center justify-center">
              <span className="text-background lcars-text text-sm">SENSOR ARRAY</span>
            </div>
            <div className="lcars-panel-7 h-12 rounded-r-[30px] flex items-center justify-center">
              <span className="text-background lcars-text text-sm">LIFE SUPPORT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};