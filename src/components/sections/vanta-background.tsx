'use client'

import { useEffect, useRef, useState } from 'react'

// VANTA.TOPOLOGY expects a P5 instance to be attached to the window object.
// We also need to import the VANTA script here to make sure it's loaded.
import type p5 from 'p5'
import type { VantaTopology } from '@/types/vanta'

declare global {
  interface Window {
    p5: typeof p5,
    VANTA: {
      TOPOLOGY: VantaTopology
    }
  }
}

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.VANTA && window.p5) {
      if (!vantaEffect) {
        setVantaEffect(window.VANTA.TOPOLOGY({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 'hsl(var(--primary))',
          backgroundColor: 'hsl(140 70% 8%)'
        }))
      }
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={vantaRef} className="absolute inset-0 z-0" />
}

export default VantaBackground;
