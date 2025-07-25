
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from 'lucide-react';

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      setLoading(true);
      const q = query(
        collection(db, 'News'),
        where('slug', '==', slug),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setArticle(null);
      } else {
        const articleData = {
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        };
        setArticle(articleData);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/4 mx-auto mb-8" />
        <Skeleton className="h-[500px] w-full rounded-lg mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      </div>
    );
  }

  if (!article) {
    return notFound();
  }

  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span>{new Date(article.createdAt?.toDate()).toLocaleDateString()}</span>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[300px] md:h-[500px] w-full mb-8">
              <Image
                src={article.imageUrl || 'https://placehold.co/1200x600.png'}
                alt={article.title}
                fill
                className="object-cover rounded-[20px]"
                data-ai-hint="news article main image"
              />
            </div>
            <div
              className="prose dark:prose-invert max-w-none font-body text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
