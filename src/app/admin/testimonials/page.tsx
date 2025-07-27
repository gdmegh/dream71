
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import TestimonialsClientPage from './TestimonialsClientPage';

async function getTestimonials() {
  const q = query(collection(db, "Testimonial"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const testimonialsData = JSON.parse(JSON.stringify(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  return testimonialsData;
}

export default async function TestimonialsCMS() {
  const testimonials = await getTestimonials();
  return <TestimonialsClientPage initialTestimonials={testimonials} />;
}
