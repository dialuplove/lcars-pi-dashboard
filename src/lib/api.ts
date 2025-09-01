// Mock API utilities for LCARS dashboard
export interface SystemStatus {
  cpuTemp: number;
  gpuTemp: number;
  ramPct: number;
  ip: string;
  tunnel: 'up' | 'down';
  timestamp: number;
}

export interface KioskConfig {
  rotation: ['HA', 'Photos', 'Cam'];
  intervalSec: number;
}

export interface CameraStatus {
  active: boolean;
  deviceId?: string;
  streamUrl?: string;
}

// Mock API endpoints - replace with real endpoints in production
export const fetchSystemStatus = async (): Promise<SystemStatus> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
  
  return {
    cpuTemp: 45 + Math.random() * 20, // 45-65°C
    gpuTemp: 40 + Math.random() * 25, // 40-65°C
    ramPct: 30 + Math.random() * 40, // 30-70%
    ip: '192.168.1.100',
    tunnel: Math.random() > 0.1 ? 'up' : 'down', // 90% uptime
    timestamp: Date.now(),
  };
};

export const fetchKioskConfig = async (): Promise<KioskConfig> => {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return {
    rotation: ['HA', 'Photos', 'Cam'],
    intervalSec: 30,
  };
};

export const fetchCameraStatus = async (): Promise<CameraStatus> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const isActive = Math.random() > 0.2; // 80% active rate
  
  return {
    active: isActive,
    deviceId: 'HG01',
    streamUrl: isActive ? 'https://mock-stream.example.com/hls/stream.m3u8' : undefined,
  };
};

export const requestCameraToken = async (deviceId: string): Promise<{ token: string; streamUrl: string }> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (Math.random() > 0.1) { // 90% success rate
    return {
      token: `mock_token_${Date.now()}`,
      streamUrl: `https://mock-stream.example.com/hls/${deviceId}/stream.m3u8`,
    };
  } else {
    throw new Error('Failed to obtain camera token');
  }
};

export const triggerSystemAction = async (action: 'restart' | 'refresh' | 'logs'): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`LCARS: Triggered ${action} action`);
  return { success: true };
};

// Health status helpers
export const getTemperatureStatus = (temp: number): 'online' | 'warning' | 'offline' => {
  if (temp > 80) return 'offline'; // Critical
  if (temp > 70) return 'warning'; // Warning
  return 'online'; // Normal
};

export const getRamStatus = (percentage: number): 'online' | 'warning' | 'offline' => {
  if (percentage > 90) return 'offline'; // Critical
  if (percentage > 80) return 'warning'; // Warning
  return 'online'; // Normal
};