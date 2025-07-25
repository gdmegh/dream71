
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const q = query(collection(db, 'News'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const newsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNews(newsData);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden" rounded="20px">
          <Skeleton className="h-56 w-full" />
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            Latest News
          </h1>
          <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest happenings, announcements, and stories from Dream71.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <Card key={article.id} className="overflow-hidden group" rounded="20px">
                  <Link href={`/news/${article.slug}`}>
                    <div className="relative h-56">
                      <Image
                        src={article.imageUrl || 'https://placehold.co/600x400.png'}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="news article image"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-headline text-xl font-bold mb-2 text-foreground">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {new Date(article.createdAt?.toDate()).toLocaleDateString()}
                      </p>
                      <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
