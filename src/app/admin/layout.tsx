
'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Briefcase, MessageSquareQuote, PanelLeft, Newspaper, Rss, GalleryHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const menuItems = [
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/blog', label: 'Blog', icon: Rss },
  { href: '/admin/events', label: 'Events', icon: GalleryHorizontal },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2 p-2">
                 <Image
                  src="/images/Logo.png"
                  alt="Dream71 Logo"
                  width={150}
                  height={40}
                  data-ai-hint="logo"
                  className="h-8 w-auto"
                />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <header className="flex items-center gap-4 p-4 border-b">
                 <SidebarTrigger className="md:hidden" />
                 <h1 className="text-xl font-semibold">Admin Panel</h1>
            </header>
            <main className="p-4 md:p-6 lg:p-8">
                 {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
