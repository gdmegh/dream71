
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Briefcase, AppWindow, Rss, Newspaper, GalleryHorizontal, MessageSquareQuote, LayoutGrid, BarChartHorizontal } from 'lucide-react';

const menuItems = [
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/admin/services', label: 'Services', icon: AppWindow },
  { href: '/admin/blog', label: 'Blog', icon: Rss },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/events', label: 'Events', icon: GalleryHorizontal },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/tech-stack', label: 'Tech Stack', icon: LayoutGrid },
  { href: '/admin/charts', label: 'Charts', icon: BarChartHorizontal },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="flex min-h-screen bg-muted/40 admin-panel">
      <aside className="hidden md:flex flex-col w-64 border-r bg-card">
        <div className="flex items-center h-16 border-b px-6">
          <Link href="/">
            <Image
                src="/images/Logo-dark.png"
                alt="Dream71 Logo"
                width={150}
                height={40}
                data-ai-hint="logo"
                className="h-8 w-auto"
            />
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname.startsWith(item.href) ? 'bg-primary/10 text-primary' : ''}`}
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
            ))}
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="flex h-16 items-center justify-between border-b bg-card px-6 md:justify-end">
            <div className="md:hidden">
                {/* Mobile menu button can be added here */}
            </div>
            {/* User dropdown or other header items can go here */}
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
