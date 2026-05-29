"use client";

import { HeroUIProvider } from "@heroui/react";
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
  messages: Record<string, any>;
  locale: string;
}

export function Providers({ children, messages, locale }: ProvidersProps) {
  const router = useRouter();

  // Only suppress the known Next.js script hydration warning in development
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
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Kuala_Lumpur">
          {children}
        </NextIntlClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

  