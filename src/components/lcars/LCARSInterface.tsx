import { useState, useEffect } from 'react';
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

  const playSoundAndRedirect = (soundType: 'audio2' | 'audio4', action: string) => {
    beep('beep2');
    handleButtonClick(action);
  };

  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="wrap-all">
      <div className="wrap">
        <div className="left-frame-top">
          <button 
            onClick={() => playSoundAndRedirect('audio2', 'LCARS')} 
            className="panel-1-button"
          >
            LCARS
          </button>
          <div className="panel-2">
            02<span className="hop">-262000</span>
          </div>
        </div>
        <div className="right-frame-top">
          <div className="banner">LCARS 57436.2</div>
          <div className="data-cascade-button-group">
            <div className="data-wrapper">
              <div className="data-column">
                <div className="dc-row-1 font-arctic-ice">47</div>
                <div className="dc-row-2">31</div>
                <div className="dc-row-3">28</div>
                <div className="dc-row-4">94</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1">329</div>
                <div className="dc-row-2 font-night-rain">128</div>
                <div className="dc-row-3">605</div>
                <div className="dc-row-4">704</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 font-night-rain">39725514862</div>
                <div className="dc-row-2 font-arctic-ice">51320259663</div>
                <div className="dc-row-3 font-alpha-blue">21857221984</div>
                <div className="dc-row-4">40372566301</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 font-arctic-ice">56</div>
                <div className="dc-row-2 font-night-rain">04</div>
                <div className="dc-row-3 font-night-rain">40</div>
                <div className="dc-row-4 font-night-rain">35</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 font-arctic-ice">614</div>
                <div className="dc-row-2 font-arctic-ice">883</div>
                <div className="dc-row-3 font-alpha-blue">109</div>
                <div className="dc-row-4">297</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 darkspace darkfont">000</div>
                <div className="dc-row-2 darkspace font-alpha-blue">13</div>
                <div className="dc-row-3 darkspace font-arctic-ice">05</div>
                <div className="dc-row-4 darkspace font-night-rain">25</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1">48</div>
                <div className="dc-row-2 font-night-rain">07</div>
                <div className="dc-row-3">38</div>
                <div className="dc-row-4">62</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1">416</div>
                <div className="dc-row-2 font-night-rain">001</div>
                <div className="dc-row-3">888</div>
                <div className="dc-row-4">442</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 font-night-rain">86225514862</div>
                <div className="dc-row-2 font-arctic-ice">31042009183</div>
                <div className="dc-row-3 font-alpha-blue">74882306985</div>
                <div className="dc-row-4">54048523421</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 font-alpha-blue">10</div>
                <div className="dc-row-2">80</div>
                <div className="dc-row-3 font-night-rain">31</div>
                <div className="dc-row-4 font-alpha-blue">85</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 font-alpha-blue">87</div>
                <div className="dc-row-2">71</div>
                <div className="dc-row-3 font-night-rain">40</div>
                <div className="dc-row-4 font-night-rain">26</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1">98</div>
                <div className="dc-row-2">63</div>
                <div className="dc-row-3 font-night-rain">52</div>
                <div className="dc-row-4 font-alpha-blue">71</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1">118</div>
                <div className="dc-row-2">270</div>
                <div className="dc-row-3">395</div>
                <div className="dc-row-4">260</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1">8675309</div>
                <div className="dc-row-2 font-night-rain">7952705</div>
                <div className="dc-row-3">9282721</div>
                <div className="dc-row-4">4981518</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 darkspace darkfont">000</div>
                <div className="dc-row-2 darkspace font-alpha-blue">99</div>
                <div className="dc-row-3 darkspace font-arctic-ice">10</div>
                <div className="dc-row-4 darkspace font-night-rain">84</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1">65821407321</div>
                <div className="dc-row-2 font-alpha-blue">54018820533</div>
                <div className="dc-row-3 font-night-rain">27174523016</div>
                <div className="dc-row-4">38954062564</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1 font-arctic-ice">999</div>
                <div className="dc-row-2 font-arctic-ice">202</div>
                <div className="dc-row-3 font-alpha-blue">574</div>
                <div className="dc-row-4">293</div>
              </div>
              <div className="data-column">
                <div className="dc-row-1">3872</div>
                <div className="dc-row-2 font-night-rain">1105</div>
                <div className="dc-row-3">1106</div>
                <div className="dc-row-4 font-alpha-blue">7411</div>
              </div>
            </div>
            <nav>
              <button onClick={() => playSoundAndRedirect('audio2', 'HOME ASSISTANT')}>01</button>
              <button onClick={() => playSoundAndRedirect('audio2', 'PHOTO FRAME')}>02</button>
              <button onClick={() => playSoundAndRedirect('audio2', 'LIVE CAMERA')}>03</button>
              <button onClick={() => playSoundAndRedirect('audio2', 'SYSTEM CONTROLS')}>04</button>
            </nav>
          </div>
          <div className="bar-panel first-bar-panel">
            <div className="bar-1"> </div>
            <div className="bar-2"> </div>
            <div className="bar-3"> </div>
            <div className="bar-4"> </div>
            <div className="bar-5"> </div>
          </div>
        </div>
      </div>

      <div className="divider">
        <div className="block-left"> </div>
        <div className="block-right">
          <div className="block-row">
            <div className="bar-11"> </div>
            <div className="bar-12"> </div>
            <div className="bar-13"> </div>
            <div className="bar-14">
              <div className="blockhead"> </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="left-frame">
          <button 
            onClick={() => {
              topFunction();
              playSoundAndRedirect('audio4', 'SCREEN TOP');
            }} 
            id="topBtn"
          >
            <span className="hop">screen</span> top
          </button>
          <div>
            <div className="panel-3">03<span className="hop">-111968</span></div>
            <div className="panel-4">04<span className="hop">-041969</span></div>
            <div className="panel-5">05<span className="hop">-1701D</span></div>
            <div className="panel-6">06<span className="hop">-071984</span></div>
          </div>
          <div>
            <div className="panel-7">07<span className="hop">-081940</span></div>
          </div>
        </div>
        <div className="right-frame">
          <div className="bar-panel">
            <div className="bar-6"> </div>
            <div className="bar-7"> </div>
            <div className="bar-8"> </div>
            <div className="bar-9"> </div>
            <div className="bar-10"> </div>
          </div>
          <main>
            <h1>Hello</h1>
            <h2>Welcome to LCARS • Lower Decks PADD Theme</h2>
            <h3 className="font-radioactive">Version 24.2</h3>
            <h4>Replace This Content With Your Own</h4>
            {systemStatus && (
              <div className="text-lg text-muted-foreground lcars-text">
                CPU: {systemStatus.cpuTemp.toFixed(1)}°C • RAM: {systemStatus.ramPct.toFixed(0)}% • 
                TUNNEL: {systemStatus.tunnel.toUpperCase()}
              </div>
            )}
            <p className="go-big">Live long and prosper.</p>
          </main>
          <footer>
            Content Copyright © 2025 LCARS Dashboard<br />
            LCARS Inspired Website Template by{' '}
            <a href="https://www.thelcars.com">www.TheLCARS.com</a>.
          </footer>
        </div>
      </div>

      <div className="headtrim"> </div>
      <div className="baseboard"> </div>
    </div>
  );
};