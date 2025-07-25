
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Briefcase, AppWindow, Rss, Newspaper, GalleryHorizontal, MessageSquareQuote, LayoutGrid, BarChartHorizontal } from 'lucide-react';
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

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
    <SidebarProvider>
        <div className="flex flex-col min-h-screen bg-background admin-panel">
            <header className="sticky top-0 z-40 w-full border-b bg-card">
              <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                 <div className="flex items-center gap-2">
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
              </div>
            </header>
            <div className="flex flex-1">
                <Sidebar collapsible="none">
                    <SidebarMenu>
                         {menuItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname.startsWith(item.href)}
                                >
                                    <Link href={item.href}>
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </Sidebar>
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    </SidebarProvider>
  );
}
