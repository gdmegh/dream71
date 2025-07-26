
import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { services as hardcodedServices } from '@/lib/services';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    // First, check hardcoded services
    const hardcodedService = hardcodedServices.find(s => s.slug === slug);
    if (hardcodedService) {
      return NextResponse.json(hardcodedService);
    }
    
    // If not found in hardcoded, check Firestore
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

    // If there's a chartId, fetch the chart data
    if (serviceData.chartId) {
      const chartDocRef = doc(db, 'ChartData', serviceData.chartId);
      const chartDocSnap = await getDoc(chartDocRef);
      if (chartDocSnap.exists()) {
        (serviceData as any).chartData = chartDocSnap.data().dataPoints;
      }
    }

    return NextResponse.json(serviceData);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

