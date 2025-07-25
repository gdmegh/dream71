
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const q = query(collection(db, 'Blog'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
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
            <div className="flex items-center gap-2 pt-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className='space-y-2'>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
                </div>
            </div>
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
            Our Blog
          </h1>
          <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on technology, design, and business from the Dream71 team.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden group flex flex-col" rounded="20px">
                   <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative h-56">
                      <Image
                        src={post.imageUrl || 'https://placehold.co/600x400.png'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint="blog post image"
                      />
                    </div>
                  </Link>
                    <CardContent className="p-6 flex flex-col flex-grow">
                       <Link href={`/blog/${post.slug}`} className="block">
                          <h3 className="font-headline text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        <p className="text-muted-foreground font-body text-sm mb-4 line-clamp-3 flex-grow">
                            {post.summary}
                        </p>
                       </Link>
                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                            <Avatar>
                                <AvatarImage src={post.authorImage || 'https://placehold.co/40x40.png'} />
                                <AvatarFallback>{post.author.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm">{post.author}</p>
                                <p className="text-muted-foreground text-xs">{new Date(post.createdAt?.toDate()).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
