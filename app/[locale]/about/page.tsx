// Example for app/[locale]/about/page.tsx
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // You MUST await this line in Next.js 16
  const { locale } = await params;

  return (
    <div>
      <h1>About Page</h1>
      <p>Current locale: {locale}</p>
    </div>
  );
}