
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

const PHPIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 78" {...props}>
        <path fill="#777BB4" d="M64 78c-23.23 0-42.06-18.83-42.06-42.06S40.77 0 64 0s42.06 18.83 42.06 42.06S87.23 78 64 78z"/>
        <path fill="#FFF" d="M83.52 38.61c-4.32 0-7.36 2.08-9.08 5.75h-.13c-.32-1.89-.58-3.69-.58-5.75v-18.1h-10.4v39.52h8.56v-12.9c0-5.75 1.54-9.39 6.22-9.39 3.9 0 5.88 2.87 5.88 8.1v14.19h10.4V46.7c.02-6.53-2.73-10.17-10.87-10.17l-.01 2.08zm-32.06-2.08c-4.32 0-7.36 2.08-9.08 5.75h-.13c-.32-1.89-.58-3.69-.58-5.75v-18.1h-10.4v39.52h8.56v-12.9c0-5.75 1.54-9.39 6.22-9.39 3.9 0 5.88 2.87 5.88 8.1v14.19h10.4V46.7c0-6.53-2.74-10.17-10.87-10.17zm-32-2.08c-4.32 0-7.36 2.08-9.08 5.75h-.13c-.32-1.89-.58-3.69-.58-5.75v-18.1H.28v39.52h8.56v-12.9c0-5.75 1.54-9.39 6.22-9.39 3.9 0 5.88 2.87 5.88 8.1v14.19H31.4V46.7c0-6.53-2.74-10.17-10.88-10.17l-.02 2.08z"/>
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
                <PHPIcon className="w-16 h-16 opacity-50" />
            </div>
        </div>
    );
}
