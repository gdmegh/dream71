
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ChartsClientPage from './ChartsClientPage';

async function getCharts() {
  const q = query(collection(db, "ChartData"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const chartsData = JSON.parse(JSON.stringify(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  return chartsData;
}

export default async function ChartsCMS() {
  const charts = await getCharts();
  return <ChartsClientPage initialCharts={charts} />;
}
