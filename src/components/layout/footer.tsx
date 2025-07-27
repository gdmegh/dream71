
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: '#' },
];

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Our Services', href: '/services' },
      { label: 'About Us', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'News', href: '/news' },
      { label: 'Events', href: '/events' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) {
      return null;
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
               <Image
                  src="/images/Dream71_logo 1.png"
                  alt="Dream71 Logo"
                  width={150}
                  height={40}
                  data-ai-hint="logo"
                  className="h-10 w-auto"
                />
            </Link>
            <p className="text-muted-foreground text-base font-body mb-4 mx-auto md:mx-0">
                A leading Software Company Focusing on E-Governance, Web Applications, Mobile Applications, Artificial intelligence and BlockChain.
            </p>
             <div className="space-y-3 text-base text-muted-foreground font-body text-center md:text-left">
                <div className="flex items-start justify-center md:justify-start gap-3">
                    <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <span>House No 16 ( Level 5 and 9) Block - A, Basundhara R/A, Main Road, Dhaka-1229,Bangladesh</span>
                </div>
                 <div className="flex items-center justify-center md:justify-start gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href="mailto:info@dream71.com" className="hover:text-primary">info@dream71.com</a>
                </div>
                 <div className="flex items-start justify-center md:justify-start gap-3">
                    <Phone className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                    <div>
                        <p>Sales: <a href="tel:+8801312233212" className="hover:text-primary">+88 01312 233 212</a>, <a href="tel:+8801782724420" className="hover:text-primary">+88 01782 724 420</a></p>
                        <p>Admin: <a href="tel:+8801718596724" className="hover:text-primary">+88 01718 596 724</a></p>
                        <p>Mobile: <a href="tel:+8801715091734" className="hover:text-primary">+880 1715 091 734</a></p>
                    </div>
                </div>
            </div>
          </div>
          {footerLinks.map((section) => (
              <div key={section.title}>
              <h3 className="font-headline font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                  {section.links.map((link) => (
                  <li key={link.label}>
                      <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors font-body text-base">
                      {link.label}
                      </Link>
                  </li>
                  ))}
              </ul>
              </div>
          ))}
        </div>
         <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-center">
            <p className="text-muted-foreground font-body text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Dream71. All rights reserved.</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
        </div>
      </div>
    </footer>
  );
}
