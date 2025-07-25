
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function EventGalleryPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const q = query(collection(db, 'Event'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-lg" />
      ))}
    </div>
  );

  return (
    <>
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
            Event Gallery
          </h1>
          <p className="font-body mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A visual journey through our workshops, conferences, and company milestones.
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {events.map((event) => (
                <Dialog key={event.id}>
                  <DialogTrigger asChild>
                    <div className="relative h-64 w-full group overflow-hidden rounded-lg cursor-pointer">
                      <Image
                        src={event.imageUrl || 'https://placehold.co/400x400.png'}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint="event photo"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                        <div className="text-white">
                            <h3 className="font-headline text-lg font-bold">{event.title}</h3>
                            <p className='text-sm'>{new Date(event.date?.toDate()).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0">
                    <Image
                      src={event.imageUrl || 'https://placehold.co/800x600.png'}
                      alt={event.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
