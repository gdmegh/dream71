
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

const LaravelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="52" viewBox="0 0 50 52" {...props}>
        <path fill="#F05340" d="m49.074 23.34-6.02-10.427-6.02-10.427c-.8-1.385-2.657-1.83-3.932-.87L23.82 5.542 14.538.622a2.49 2.49 0 0 0-3.376 1.385L.926 23.34a2.49 2.49 0 0 0 1.252 3.376l6.02 3.475 2.508 1.447v13.854a2.49 2.49 0 0 0 3.738 2.155l14.288-8.25 14.288-8.25a2.49 2.49 0 0 0 1.252-3.376ZM25.072 8.918 29.36 11.4l-6.793 3.922-4.288-2.475Zm-13.854 28.5V18.15l6.793 3.922v17.555Zm2.508 1.447L6.933 34.942l10.59-6.115 4.29 2.475v12.23Zm22.78-13.08-4.29-2.475 4.29-2.475 4.288 2.475Zm-5.542-3.218L26.68 18.15l4.288-2.475L41.56 21.78ZM13.064 15.6l6.793-3.922 6.793 3.922-6.793 3.922Zm22.78 20.978V24.32l6.793-3.922v7.844Z"/>
    </svg>
);

const icons = [
    { Icon: ReactIcon, className: 'absolute top-[10%] left-[15%] w-16 h-16' },
    { Icon: LaravelIcon, className: 'absolute bottom-[15%] left-[20%] w-20 h-20' },
    { Icon: ReactIcon, className: 'absolute bottom-[25%] right-[25%] w-12 h-12' },
    { Icon: LaravelIcon, className: 'absolute top-[5%] right-[30%] w-16 h-16' },
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
