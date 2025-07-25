
'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

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
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="52" viewBox="0 0 96 52" {...props}>
        <g fill="#8892BF">
            <path d="M36.19 26.622a5.952 5.952 0 0 1-5.95 5.953 5.952 5.952 0 0 1-5.954-5.953 5.952 5.952 0 0 1 5.953-5.951 5.952 5.952 0 0 1 5.952 5.951zm-5.952-4.167a4.167 4.167 0 1 0 0 8.334 4.167 4.167 0 0 0 0-8.334zM16.482 17.58a5.536 5.536 0 0 0-5.536 5.537v7.212a5.536 5.536 0 0 0 5.536 5.536h3.457v-4.167h-3.457a1.37 1.37 0 0 1-1.37-1.37v-7.21a1.37 1.37 0 0 1 1.37-1.37h9.098a1.37 1.37 0 0 1 1.37 1.37v2.78h4.167v-2.78a5.536 5.536 0 0 0-5.536-5.537h-9.098zM6.924 23.118a5.536 5.536 0 0 0-5.536 5.536v6.248h4.167v-6.248a1.37 1.37 0 0 1 1.37-1.37h5.17v-4.167h-5.17zM0 34.899h12.46v4.167H0z"/>
            <path d="M49.206 17.58a5.536 5.536 0 0 0-5.536 5.537v12.75h4.167v-12.75a1.37 1.37 0 0 1 1.37-1.37h5.17v-4.167h-5.17zM69.96 17.58v18.286h-4.167V17.58zM80.897 17.58a5.536 5.536 0 0 0-5.536 5.537v12.75h4.167v-12.75a1.37 1.37 0 0 1 1.37-1.37h5.17v-4.167h-5.17z"/>
        </g>
    </svg>
);

const LaravelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="52" viewBox="0 0 50 52" {...props}>
        <path fill="#F05340" d="m49.074 23.34-6.02-10.427-6.02-10.427c-.8-1.385-2.657-1.83-3.932-.87L23.82 5.542 14.538.622a2.49 2.49 0 0 0-3.376 1.385L.926 23.34a2.49 2.49 0 0 0 1.252 3.376l6.02 3.475 2.508 1.447v13.854a2.49 2.49 0 0 0 3.738 2.155l14.288-8.25 14.288-8.25a2.49 2.49 0 0 0 1.252-3.376ZM25.072 8.918 29.36 11.4l-6.793 3.922-4.288-2.475Zm-13.854 28.5V18.15l6.793 3.922v17.555Zm2.508 1.447L6.933 34.942l10.59-6.115 4.29 2.475v12.23Zm22.78-13.08-4.29-2.475 4.29-2.475 4.288 2.475Zm-5.542-3.218L26.68 18.15l4.288-2.475L41.56 21.78ZM13.064 15.6l6.793-3.922 6.793 3.922-6.793 3.922Zm22.78 20.978V24.32l6.793-3.922v7.844Z"/>
    </svg>
);

const icons = [
    { Icon: ReactIcon, size: 80 },
    { Icon: PHPIcon, size: 100 },
    { Icon: LaravelIcon, size: 70 },
    { Icon: ReactIcon, size: 50 },
    { Icon: PHPIcon, size: 60 },
    { Icon: LaravelIcon, size: 90 },
];

export default function AnimatedIcons() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            {icons.map((item, i) => {
                const { Icon, size } = item;
                const top = Math.random() * 80 + 10;
                const left = Math.random() * 80 + 10;
                const duration = Math.random() * 20 + 20; // 20-40 seconds
                const delay = Math.random() * 10;
                const xRange = Math.random() * 200 - 100;
                const yRange = Math.random() * 200 - 100;

                return (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            top: `${top}%`,
                            left: `${left}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.1, 0.1, 0],
                            scale: 1,
                            x: [0, xRange, 0, -xRange, 0],
                            y: [0, yRange, -yRange, 0, yRange],
                        }}
                        transition={{
                            duration,
                            ease: 'linear',
                            repeat: Infinity,
                            delay
                        }}
                    >
                        <Icon style={{ width: size, height: size }} />
                    </motion.div>
                );
            })}
        </div>
    );
}
