
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PortfolioClientPage from './PortfolioClientPage';

async function getProjects() {
  const q = query(collection(db, "Project"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  // Using JSON.parse(JSON.stringify(...)) to serialize the data with Timestamps
  const projectsData = JSON.parse(JSON.stringify(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  return projectsData;
}

async function getTechStack() {
    const querySnapshot = await getDocs(collection(db, 'TechStack'));
    const techStackData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return techStackData;
}

export default async function PortfolioCMS() {
  const projects = await getProjects();
  const techStack = await getTechStack();

  return <PortfolioClientPage initialProjects={projects} initialTechStack={techStack} />;
}
