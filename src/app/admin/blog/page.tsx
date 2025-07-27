
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import BlogClientPage from './BlogClientPage';

async function getPosts() {
  const q = query(collection(db, "Blog"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const postsData = JSON.parse(JSON.stringify(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  return postsData;
}

export default async function BlogCMS() {
  const posts = await getPosts();
  return <BlogClientPage initialPosts={posts} />;
}
