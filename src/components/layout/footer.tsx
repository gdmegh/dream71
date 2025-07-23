import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: '#' },
];

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/services' },
      { label: 'Mobile Apps', href: '/services' },
      { label: 'UI/UX Design', href: '/services' },
      { label: 'QA & Testing', href: '/services' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 text-center md:text-left">
          <div className="md:col-span-4 lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
               <Image
                  src="https://placehold.co/150x40/FFFFFF/000000?text=Dream71"
                  alt="Dream71 Logo"
                  width={150}
                  height={40}
                  data-ai-hint="logo"
                  className="h-10 w-auto"
                />
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 font-body mx-auto md:mx-0">
              Dream71 is a leading software development company in Bangladesh, building innovative solutions for a global clientele.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-headline font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors font-body">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
              <h3 className="font-headline font-semibold text-foreground mb-4">Contact</h3>
              <ul className="space-y-2 font-body text-muted-foreground">
                  <li>House #123, Road #45</li>
                  <li>Dhaka 1212, Bangladesh</li>
                  <li className="pt-2">
                    <a href="mailto:contact@dream71.com" className="hover:text-primary transition-colors">contact@dream71.com</a>
                  </li>
                  <li>
                    <a href="tel:+880123456789" className="hover:text-primary transition-colors">+880 123 456 789</a>
                  </li>
              </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground font-body">
          <p>&copy; {new Date().getFullYear()} Dream71. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
