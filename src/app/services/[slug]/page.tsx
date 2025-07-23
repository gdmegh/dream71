
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Service: {params.slug.replace(/-/g, ' ')}</h1>
      <p>Details about the {params.slug.replace(/-/g, ' ')} service will be here.</p>
    </div>
  );
}
