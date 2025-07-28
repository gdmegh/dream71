
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Metadata } from 'next';
import PortfolioClientPage from './PortfolioClientPage';

type PageProps = {
  params: {
    slug: string;
  };
};

async function getProject(slug: string) {
    if (!slug) return null;
    try {
        const q = query(
            collection(db, 'Project'),
            where('slug', '==', slug),
            limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const projectData = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
        };
        // Ensure data is serializable for the client component
        return JSON.parse(JSON.stringify(projectData));
    } catch (e) {
        console.error("Error fetching project:", e);
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Dream71 Portfolio`,
    description: project.summary,
  };
}

// Main Server Component
export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }
  
  return <PortfolioClientPage project={project} />;
}
