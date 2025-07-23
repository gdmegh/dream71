'use client';

import { useEffect, useRef, useState } from 'react';

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let effect: any;
    const initializeVanta = async () => {
      const p5 = (await import('p5')).default;
      const TOPOLOGY = (await import('vanta/dist/vanta.topology.min.js')).default;
      
      if (vantaRef.current && !effect) {
        // Temporarily disable console.error to avoid benign THREE.js warnings
        const originalError = console.error;
        console.error = (...args) => {
          if (/THREE.Color: Unknown color/.test(args[0])) {
            return;
          }
          originalError.apply(console, args);
        };
        
        const primaryColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--primary')
          .trim();
        
        const backgroundColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--background')
          .trim();

        effect = TOPOLOGY({
            el: vantaRef.current,
            p5: p5,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: `hsl(${primaryColor})`,
            backgroundColor: `hsl(${backgroundColor})`,
        });

        setVantaEffect(effect);
        
        // Restore original console.error
        console.error = originalError;
      }
    };
    
    initializeVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 z-0" />;
};

export default VantaBackground;
