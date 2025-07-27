
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import EventsClientPage from './EventsClientPage';

async function getEvents() {
  const q = query(collection(db, "Event"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  const eventsData = JSON.parse(JSON.stringify(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  return eventsData;
}

export default async function EventsCMS() {
  const events = await getEvents();
  return <EventsClientPage initialEvents={events} />;
}
