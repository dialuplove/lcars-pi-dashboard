import { useState, useEffect } from 'react';

interface LCARSLoaderProps {
  message?: string;
}

export const LCARSLoader = ({ message = "INITIALIZING LCARS INTERFACE" }: LCARSLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [currentSystem, setCurrentSystem] = useState('MAIN COMPUTER');

  const systems = [
    'MAIN COMPUTER',
    'SENSOR ARRAY',
    'LIFE SUPPORT',
    'NAVIGATION',
    'COMMUNICATIONS',
    'TACTICAL SYSTEMS'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const systemInterval = setInterval(() => {
      setCurrentSystem(systems[Math.floor(Math.random() * systems.length)]);
    }, 800);

    return () => clearInterval(systemInterval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="lcars-panel bg-card border-4 border-primary p-12 min-w-[500px]">
        <div className="text-center space-y-8">
          {/* LCARS Logo/Header */}
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary lcars-text">
              LCARS
            </div>
            <div className="text-lg text-muted-foreground lcars-text">
              LIBRARY COMPUTER ACCESS/RETRIEVAL SYSTEM
            </div>
          </div>

          {/* Main Progress Bar */}
          <div className="space-y-4">
            <div className="text-xl text-foreground lcars-text">
              {message}
            </div>
            
            <div className="relative">
              <div className="w-full h-6 bg-muted border border-border">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="absolute right-2 top-0 h-full flex items-center">
                <span className="text-sm text-background font-bold lcars-number">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          {/* System Loading Indicators */}
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground lcars-text">
              LOADING SYSTEM: {currentSystem}
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {systems.slice(0, 6).map((system, index) => (
                <div key={system} className="flex items-center space-x-2">
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      progress > (index * 16.67) 
                        ? 'bg-success animate-pulse' 
                        : 'bg-muted'
                    }`}
                  />
                  <span className="text-xs text-muted-foreground lcars-text">
                    {system}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Cascade Animation */}
          <div className="border-t border-border pt-4">
            <div className="text-xs font-mono space-y-1 opacity-60">
              <div className="data-cascade-row-1">01011100 11001010 10110101</div>
              <div className="data-cascade-row-2">11100011 01010110 11010010</div>
              <div className="data-cascade-row-3">10101011 11000101 01011100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};