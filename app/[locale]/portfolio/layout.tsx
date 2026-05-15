export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-[calc(100vh-64px)] overflow-hidden">
      {children}
    </section>
  );
}