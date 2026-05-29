import { getMessages } from 'next-intl/server';
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import "@/styles/globals.css";
import { Metadata } from "next";
import Script from "next/script";
// Loader2 is imported here as layout.tsx is now a Server Component.

// 1. Move this here (outside the function)
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL('https://mymexp.com'),
  title: {
    default: "MExp by Syahmi",
    template: "%s — MExp",
  },
  description: "Malaysian digital lab building precision systems at the intersection of engineering, AI, and construction.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "MExp by Syahmi",
    description: "Malaysian digital lab. Engineering-grade digital twins, AI systems, and knowledge infrastructure.",
    images: [{ url: "/logo.png" }],
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) { // <--- 2. Ensure this opening bracket is here!

  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4548223576832848"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen font-sans antialiased bg-transparent">
        <Providers messages={messages} locale={locale}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
