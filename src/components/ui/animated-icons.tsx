
'use client';
import React from 'react';

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

const icons = [
    { Icon: ReactIcon, className: 'absolute top-[10%] left-[15%] w-16 h-16' },
    { Icon: ReactIcon, className: 'absolute bottom-[15%] right-[20%] w-20 h-20' },
    { Icon: ReactIcon, className: 'absolute top-[25%] right-[25%] w-12 h-12' },
    { Icon: ReactIcon, className: 'absolute bottom-[5%] left-[30%] w-16 h-16' },
];

export default function AnimatedIcons() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            {icons.map((item, i) => {
                const { Icon, className } = item;
                return (
                    <div key={i} className={className}>
                        <Icon />
                    </div>
                );
            })}
        </div>
    );
}
