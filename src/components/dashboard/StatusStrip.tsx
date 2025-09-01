import { SystemStatus, getTemperatureStatus, getRamStatus } from '@/lib/api';
import { Cpu, HardDrive, Thermometer, Globe, Shield } from 'lucide-react';

interface StatusStripProps {
  status: SystemStatus | null;
}

export const StatusStrip = ({ status }: StatusStripProps) => {
  if (!status) {
    return (
      <div className="lcars-panel h-full flex items-center justify-center">
        <div className="text-muted-foreground">Loading system status...</div>
      </div>
    );
  }

  const cpuStatus = getTemperatureStatus(status.cpuTemp);
  const gpuStatus = getTemperatureStatus(status.gpuTemp);
  const ramStatus = getRamStatus(status.ramPct);

  return (
    <div className="lcars-panel h-full flex items-center justify-between px-6 bg-gradient-primary">
      <div className="flex items-center space-x-8">
        {/* CPU Temperature */}
        <div className="flex items-center space-x-3">
          <Cpu className="w-6 h-6 text-primary-foreground" />
          <div className="flex items-center space-x-2">
            <span className="text-primary-foreground font-medium">CPU</span>
            <span className="text-primary-foreground text-lg font-mono">
              {status.cpuTemp.toFixed(1)}°C
            </span>
            <div className={`status-pip ${cpuStatus}`} />
          </div>
        </div>

        {/* GPU Temperature */}
        <div className="flex items-center space-x-3">
          <Thermometer className="w-6 h-6 text-primary-foreground" />
          <div className="flex items-center space-x-2">
            <span className="text-primary-foreground font-medium">GPU</span>
            <span className="text-primary-foreground text-lg font-mono">
              {status.gpuTemp.toFixed(1)}°C
            </span>
            <div className={`status-pip ${gpuStatus}`} />
          </div>
        </div>

        {/* RAM Usage */}
        <div className="flex items-center space-x-3">
          <HardDrive className="w-6 h-6 text-primary-foreground" />
          <div className="flex items-center space-x-2">
            <span className="text-primary-foreground font-medium">RAM</span>
            <span className="text-primary-foreground text-lg font-mono">
              {status.ramPct.toFixed(0)}%
            </span>
            <div className={`status-pip ${ramStatus}`} />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8">
        {/* IP Address */}
        <div className="flex items-center space-x-3">
          <Globe className="w-6 h-6 text-primary-foreground" />
          <span className="text-primary-foreground font-mono text-lg">
            {status.ip}
          </span>
        </div>

        {/* Tunnel Status */}
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-primary-foreground" />
          <div className="flex items-center space-x-2">
            <span className="text-primary-foreground font-medium">TUNNEL</span>
            <div className={`status-pip ${status.tunnel === 'up' ? 'online' : 'offline'}`} />
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-primary-foreground/70 font-mono text-sm">
          {new Date(status.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};