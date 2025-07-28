
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PortfolioClientPage from './PortfolioClientPage';

async function getProjects() {
  const q = query(collection(db, "Project"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const projectsData = JSON.parse(JSON.stringify(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  return projectsData;
}

export default async function PortfolioCMS() {
  const projects = await getProjects();
  return <PortfolioClientPage initialProjects={projects} />;
}
