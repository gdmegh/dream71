
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About Us' },
];

const insightsLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/news', label: 'News' },
    { href: '/events', label: 'Events' },
]

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
    const isAdmin = pathname.startsWith('/admin');
    if (isAdmin) return null;

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

  const InsightsDropdown = () => {
     const isAdmin = pathname.startsWith('/admin');
     if (isAdmin) return null;
     const isActive = insightsLinks.some(link => pathname.startsWith(link.href));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    "relative flex items-center gap-1 py-1 transition-colors duration-300 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full font-headline outline-none",
                    isActive ? "text-primary after:w-full" : ""
                )}>
                    <span>Insights</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {insightsLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                        <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
  }

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
            <InsightsDropdown />
            {!pathname.startsWith('/admin') && <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>}
          </nav>
          <div className="md:hidden">
             {!pathname.startsWith('/admin') && <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background shadow-lg">
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="font-headline py-2 hover:no-underline hover:text-primary transition-colors data-[state=open]:text-primary">Insights</AccordionTrigger>
                    <AccordionContent className="pl-4">
                        <div className="flex flex-col space-y-2">
                         {insightsLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="font-headline py-1 text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>{link.label}</Link>
                         ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Button asChild>
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
