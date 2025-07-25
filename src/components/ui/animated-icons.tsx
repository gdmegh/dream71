
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

const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path fill="#3776AB" d="M12,15.7c-2.3,0-4.1-1.8-4.1-4.1V3.9c0-2.3,1.8-4.1,4.1-4.1h3.8c2.3,0,4.1,1.8,4.1,4.1v1.5c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5V3.9c0-0.8-0.7-1.5-1.5-1.5h-3.8c-0.8,0-1.5,0.7-1.5,1.5v7.7c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5v-1h2.2v1c0,2.3-1.8,4.1-4.1,4.1z"/>
        <path fill="#FFD43B" d="M12,8.3c2.3,0,4.1,1.8,4.1,4.1v7.7c0,2.3-1.8,4.1-4.1,4.1H8.2c-2.3,0-4.1-1.8-4.1-4.1v-1.5c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v1.5c0,0.8,0.7,1.5,1.5,1.5h3.8c0.8,0,1.5-0.7,1.5-1.5v-7.7c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v1h-2.2v-1C7.9,10.1,9.7,8.3,12,8.3z"/>
    </svg>
);


export default function AnimatedIcons() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
             <motion.div
                className="absolute top-[10%] left-[5%]"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
                <ReactIcon className="w-24 h-24 opacity-50" />
            </motion.div>
             <div
                className="absolute bottom-[10%] right-[5%]"
            >
                <PythonIcon className="w-16 h-16 opacity-50" />
            </div>
        </div>
    );
}
