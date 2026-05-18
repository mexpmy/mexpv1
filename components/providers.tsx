"use client";

import { HeroUIProvider } from "@heroui/react";
import { NextIntlClientProvider } from 'next-intl';
// 👇 This is the line you are likely missing or have a typo in
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from 'next/navigation';

export function Providers({ children, messages, locale }: any) {
  const router = useRouter();

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    originalError.apply(console, args);
  };
}

  return (
    <HeroUIProvider navigate={router.push} locale={locale}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
          {children}
        </NextIntlClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
} 
  