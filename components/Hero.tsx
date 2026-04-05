'use client';

import NextLink from "next/link";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import { Link } from "@heroui/link";
import { CustomLogo } from "@/components/CustomLogo";
import { useTranslations } from 'next-intl';
import clsx from "clsx";

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden py-10 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <CustomLogo className="mx-auto mb-6 animate-bounce" size={60} />

        <h1 className={`${title({ size: "lg" })} tracking-tight text-3xl sm:text-4xl md:text-6xl px-2`}>
          {/* Using Rich Text to keep the gradient styling */}
          {t.rich('mainTitle', {
            important: (chunks) => (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] font-extrabold text-3xl sm:text-4xl md:text-6xl">
                {chunks}
              </span>
            )
          })}
        </h1>

        <p className={`${subtitle({ class: "mt-6 mx-auto px-4" })} text-default-600 max-w-2xl text-sm sm:text-base md:text-lg`}>
          {t('description')}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            className={clsx(buttonStyles({ color: "primary", radius: "full", variant: "shadow" }), "w-full sm:w-auto px-10")}
            href="https://pro.mymexp.com"
          >
            {t('getStarted')}
          </Link>

          <Link
            className={clsx(buttonStyles({ variant: "bordered", radius: "full" }), "w-full sm:w-auto px-10")}
            href="https://portal.mymexp.com"
          >
            {t('learnMore')}
          </Link>
        </div>

        <div className="mt-10 text-sm text-default-500">
          <span className="inline-flex items-center gap-2">
            {t.rich('footer', {
              next: (chunks) => <strong className="font-medium">{chunks}</strong>,
              hero: (chunks) => <strong className="font-medium">{chunks}</strong>
            })}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;