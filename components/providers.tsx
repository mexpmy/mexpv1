"use client";

import { HeroUIProvider } from "@heroui/react";
import { NextIntlClientProvider } from 'next-intl';
// 👇 This is the line you are likely missing or have a typo in
import { ThemeProvider as NextThemesProvider } from "next-themes"; 
import { useRouter } from 'next/navigation';

export function Providers({ children, messages, locale }: any) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push} locale={locale}>
      <NextThemesProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}