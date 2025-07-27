
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Briefcase, BookOpen, BarChart2, Sparkles, Building2, PencilRuler, AppWindow, Rss, Newspaper, GalleryHorizontal, Code, ShieldCheck, Gamepad2, Info, MessageSquare, Phone, BrainCircuit, Rocket, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const portfolioComponents: { title: string; href: string; description: string, icon: React.ElementType }[] = [
  {
    title: "View All Projects",
    href: "/portfolio",
    description: "Browse our full collection of innovative projects.",
    icon: Briefcase
  },
  {
    title: "Case Studies",
    href: "/portfolio",
    description: "In-depth looks at how we solve client challenges.",
    icon: BookOpen
  },
];


const insightsLinks = [
    { href: '/blog', label: 'Blog', description: 'Our latest thoughts and articles.', icon: Rss },
    { href: '/news', label: 'News', description: 'Stay updated with company news.', icon: Newspaper },
    { href: '/events', label: 'Events', description: 'Join us at our upcoming events.', icon: GalleryHorizontal },
]

const companyLinks = [
    { href: '/about', label: 'About Us', description: 'Learn about our mission and team.', icon: Info },
    { href: '/testimonials', label: 'Testimonials', description: 'See what our clients are saying.', icon: MessageSquare },
    { href: '/contact', label: 'Contact Us', description: 'Get in touch with our team.', icon: Phone },
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

  const MobileNavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => {
    return (
      <Link href={href} onClick={onClick}>
        <span className={cn(
          "block py-2 font-headline transition-colors duration-300 hover:text-primary",
          pathname === href ? "text-primary" : "text-foreground"
        )}>
          {label}
        </span>
      </Link>
    );
  };

  if (pathname.startsWith('/admin')) {
      return null;
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
              src="/images/Dream71_logo 1.png"
              alt="Dream71 Logo"
              width={200}
              height={60}
              data-ai-hint="logo"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex md:items-center">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                       <Link href="/services" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Services
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                     <NavigationMenuItem>
                        <NavigationMenuTrigger>Portfolio</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/portfolio"
                                        >
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                Our Work
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                               Explore our portfolio of successful projects and client collaborations.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                {portfolioComponents.map((component) => (
                                     <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                        icon={component.icon}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    
                     <NavigationMenuItem>
                        <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                        <NavigationMenuContent>
                           <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[300px] ">
                                {companyLinks.map((component) => (
                                    <ListItem
                                        key={component.label}
                                        title={component.label}
                                        href={component.href}
                                        icon={component.icon}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                     <NavigationMenuItem>
                        <NavigationMenuTrigger>Insights</NavigationMenuTrigger>
                        <NavigationMenuContent>
                           <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[300px] ">
                                {insightsLinks.map((component) => (
                                    <ListItem
                                        key={component.label}
                                        title={component.label}
                                        href={component.href}
                                        icon={component.icon}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="ml-4">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
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
          <nav className="flex flex-col space-y-2 p-4">
             <Accordion type="multiple" className="w-full">
                 <MobileNavLink href="/services" label="Services" onClick={() => setIsOpen(false)} />
                 <AccordionItem value="portfolio">
                    <AccordionTrigger className="font-headline py-2 hover:no-underline hover:text-primary transition-colors data-[state=open]:text-primary">Portfolio</AccordionTrigger>
                    <AccordionContent className="pl-4">
                        <div className="flex flex-col space-y-2">
                           {portfolioComponents.map((link) => (
                              <Link key={link.href} href={link.href} className="font-headline py-1 text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>{link.title}</Link>
                           ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="company">
                    <AccordionTrigger className="font-headline py-2 hover:no-underline hover:text-primary transition-colors data-[state=open]:text-primary">Company</AccordionTrigger>
                    <AccordionContent className="pl-4">
                        <div className="flex flex-col space-y-2">
                         {companyLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="font-headline py-1 text-muted-foreground hover:text-primary" onClick={() => setIsOpen(false)}>{link.label}</Link>
                         ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="insights">
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


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
