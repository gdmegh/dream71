
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Briefcase, AppWindow, Rss, Newspaper, GalleryHorizontal, MessageSquareQuote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { value: 'portfolio', href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { value: 'services', href: '/admin/services', label: 'Services', icon: AppWindow },
  { value: 'blog', href: '/admin/blog', label: 'Blog', icon: Rss },
  { value: 'news', href: '/admin/news', label: 'News', icon: Newspaper },
  { value: 'events', href: '/admin/events', label: 'Events', icon: GalleryHorizontal },
  { value: 'testimonials', href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = menuItems.find(item => pathname.startsWith(item.href))?.value || 'portfolio';
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-40 w-full border-b bg-background">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
             <div className="flex items-center gap-2">
                 <Link href="/">
                    <Image
                        src="/images/Logo.png"
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
       <main className="flex-1">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
                 <Tabs value={activeTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-6">
                        {menuItems.map((item) => (
                        <TabsTrigger key={item.value} value={item.value} asChild>
                           <Link href={item.href}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                           </Link>
                        </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value={activeTab}>
                        {children}
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    </div>
  );
}
