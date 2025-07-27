
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, User } from 'lucide-react';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(true);
      setError(false);
      try {
        const q = query(
          collection(db, 'Blog'),
          where('slug', '==', slug),
          limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setPost(null);
        } else {
          const postData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          };
          setPost(postData);
        }
      } catch (e) {
        console.error("Error fetching post:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
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

  if (error || !post) {
    return notFound();
  }

  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 mt-6 text-muted-foreground">
            <div className='flex items-center gap-2'>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={post.authorImage || 'https://placehold.co/40x40.png'} />
                    <AvatarFallback>{post.author.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span>{post.author}</span>
            </div>
            <div className='flex items-center gap-2'>
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.createdAt?.toDate()).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[300px] md:h-[500px] w-full mb-8">
              <Image
                src={post.imageUrl || 'https://placehold.co/1200x600.png'}
                alt={post.title}
                fill
                className="object-cover rounded-[20px]"
                data-ai-hint="blog post main image"
              />
            </div>
            <div
              className="prose dark:prose-invert max-w-none font-body text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
