
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import NewsClientPage from './NewsClientPage';

async function getArticles() {
  const q = query(collection(db, "News"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const articlesData = JSON.parse(JSON.stringify(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  return articlesData;
}

export default async function NewsCMS() {
  const articles = await getArticles();
  return <NewsClientPage initialArticles={articles} />;
}
