import { useCallback, useRef } from 'react';

type BeepType = 'beep1' | 'beep2' | 'beep3' | 'beep4';

interface LCARSSoundOptions {
  volume?: number;
  muted?: boolean;
}

export const useLCARSSound = (options: LCARSSoundOptions = {}) => {
  const { volume = 0.3, muted = false } = options;
  const audioRefs = useRef<{ [key in BeepType]?: HTMLAudioElement }>({});

  // Initialize audio elements
  const initializeAudio = useCallback(() => {
    const beepTypes: BeepType[] = ['beep1', 'beep2', 'beep3', 'beep4'];
    
    beepTypes.forEach((beepType) => {
      if (!audioRefs.current[beepType]) {
        const audio = new Audio(`/audio/${beepType}.mp3`);
        audio.volume = volume;
        audio.preload = 'auto';
        audioRefs.current[beepType] = audio;
      }
    });
  }, [volume]);

  // Play specific beep sound
  const playBeep = useCallback((beepType: BeepType) => {
    if (muted) return;
    
    if (!audioRefs.current[beepType]) {
      initializeAudio();
    }
    
    const audio = audioRefs.current[beepType];
    if (audio) {
      audio.currentTime = 0; // Reset to start
      audio.play().catch((error) => {
        console.warn(`Failed to play LCARS sound ${beepType}:`, error);
      });
    }
  }, [muted, initializeAudio]);

  // Play sound and then execute callback (for button clicks with navigation)
  const playSoundAndExecute = useCallback((beepType: BeepType, callback?: () => void) => {
    playBeep(beepType);
    
    if (callback) {
      // Small delay to let sound start playing
      setTimeout(callback, 50);
    }
  }, [playBeep]);

  // LCARS-specific sound effects
  const sounds = {
    // Navigation and confirmation sounds
    confirm: () => playBeep('beep2'),
    navigate: () => playBeep('beep2'),
    
    // System sounds
    error: () => playBeep('beep1'),
    warning: () => playBeep('beep3'),
    success: () => playBeep('beep4'),
    
    // Panel interactions
    panelActivate: () => playBeep('beep2'),
    panelDeactivate: () => playBeep('beep3'),
    
    // Custom beep
    beep: (type: BeepType) => playBeep(type),
  };

  return {
    ...sounds,
    playSoundAndExecute,
    initializeAudio,
  };
};

export default useLCARSSound;