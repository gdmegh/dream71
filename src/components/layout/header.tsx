"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About Us' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/admin/portfolio', label: 'Portfolio CMS' },
  { href: '/admin/testimonials', label: 'Testimonials CMS' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    return (
      <Link href={href} onClick={() => setIsOpen(false)}>
        <span className={cn(
          "relative py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full font-headline",
          pathname === href ? "text-primary after:w-full" : ""
        )}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/Logo.png"
              alt="Dream71 Logo"
              width={150}
              height={40}
              data-ai-hint="logo"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background shadow-lg">
          <nav className="flex flex-col items-center space-y-4 p-4">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            <Button asChild>
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
