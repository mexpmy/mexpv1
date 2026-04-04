import { getMessages } from 'next-intl/server';
import { Providers } from "@/components/providers"; 
import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";
import { Metadata } from "next";

// 1. Move this here (outside the function)
export const dynamic = 'force-dynamic'; 

export const metadata: Metadata = {
  title: {
    default: "MExp by Syahmi",
    template: "%s - My App Name",
  },
  description: "My digital Lab",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function LocaleLayout({
  children,
  params
}:{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) { // <--- 2. Ensure this opening bracket is here!
  
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-transparent">
        <Providers messages={messages} locale={locale}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}