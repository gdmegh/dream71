
import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    const q = query(
      collection(db, 'Service'),
      where('slug', '==', slug),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const serviceDoc = querySnapshot.docs[0];
    const serviceData = { id: serviceDoc.id, ...serviceDoc.data() };

    // If there's a chartId, fetch the chart data from ChartData collection
    // This logic is being deprecated in favor of storing chartData directly on the service
    if (serviceData.chartId) {
      const chartDocRef = doc(db, 'ChartData', serviceData.chartId);
      const chartDocSnap = await getDoc(chartDocRef);
      if (chartDocSnap.exists() && !serviceData.chartData) {
        (serviceData as any).chartData = chartDocSnap.data().dataPoints;
      }
    }

    return NextResponse.json(serviceData);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
