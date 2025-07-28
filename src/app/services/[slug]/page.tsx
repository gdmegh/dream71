
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CtaSection from '@/components/sections/cta-section';
import type { Metadata } from 'next';
import ServiceClientPage from './ServiceClientPage';


// --- SERVER-SIDE DATA FETCHING & METADATA ---

type PageProps = {
  params: {
    slug: string;
  };
};

async function getService(slug: string) {
    if (!slug) return null;
    try {
        const q = query(collection(db, 'Service'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const serviceDoc = querySnapshot.docs[0];
        const serviceData = { id: serviceDoc.id, ...serviceDoc.data() };
        
        return JSON.parse(JSON.stringify(serviceData));
    } catch (e) {
        console.error("Error fetching service:", e);
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getService(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Dream71 Services`,
    description: service.description,
  };
}


// --- MAIN SERVER COMPONENT ---

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }
  
  return <ServiceClientPage service={service} />;
}
