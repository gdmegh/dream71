export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto py-10">{children}</div>;
}
