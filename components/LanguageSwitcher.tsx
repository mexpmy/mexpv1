"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "ms", label: "Bahasa Melayu", flag: "https://flagcdn.com/w40/my.png" },
  { code: "zh", label: "中文", flag: "https://flagcdn.com/w40/cn.png" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const activeLang = languages.find((l) => l.code === currentLocale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    // Safely update the locale in the URL path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <Button 
          variant="flat" 
          color="primary"
          startContent={
            <Avatar 
              src={activeLang.flag} 
              className="w-5 h-5" 
              isBordered 
              color="primary" 
            />
          }
        >
          {activeLang.code.toUpperCase()}
        </Button>
      </DropdownTrigger>
      
      <DropdownMenu 
        aria-label="Select Language"
        variant="faded"
        onAction={(key) => handleLanguageChange(key as string)}
      >
        {languages.map((lang) => (
          <DropdownItem
            key={lang.code}
            description={lang.code === currentLocale ? "Active" : ""}
            startContent={
              <Avatar 
                alt={lang.label} 
                className="w-6 h-6 text-tiny" 
                src={lang.flag} 
              />
            }
          >
            {lang.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}