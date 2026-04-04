'use client';

import NextLink from "next/link";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import { Link } from "@heroui/link";
import { CustomLogo } from "@/components/CustomLogo";
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto max-w-4xl px-6 text-center">
        <CustomLogo className="mx-auto mb-6 animate-bounce" size={80} />

        <h1 className={`${title({ size: "lg" })} tracking-tight text-4xl md:text-6xl`}>
          {/* Using Rich Text to keep the gradient styling */}
          {t.rich('mainTitle', {
            important: (chunks) => (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] font-extrabold">
                {chunks}
              </span>
            )
          })}
        </h1>

        <p className={`${subtitle({ class: "mt-6 mx-auto" })} text-default-600 max-w-2xl`}>
          {t('description')}
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
            href="https://pro.mymexp.com"
          >
            {t('getStarted')}
          </Link>

          <Link
            className={buttonStyles({ variant: "bordered", radius: "full" })}
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