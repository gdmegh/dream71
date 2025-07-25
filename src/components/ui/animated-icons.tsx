
'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" {...props}>
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

export default function AnimatedIcons() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
             <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-[10%] md:left-[5%] md:translate-x-0 md:translate-y-0"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
                <ReactIcon className="w-24 h-24 opacity-50" />
            </motion.div>
        </div>
    );
}
