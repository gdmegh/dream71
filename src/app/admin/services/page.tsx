
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ServicesClientPage from './ServicesClientPage';

async function getServices() {
  const q = query(collection(db, "Service"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const servicesData = JSON.parse(JSON.stringify(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  return servicesData;
}

export default async function ServicesCMS() {
  const services = await getServices();
  return <ServicesClientPage initialServices={services} />;
}
