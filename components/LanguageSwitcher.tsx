"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@heroui/react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

const languages = [
  { code: "en", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "ms", flag: "https://flagcdn.com/w40/my.png" },
  { code: "zh", flag: "https://flagcdn.com/w40/cn.png" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("Common");

  const activeLang = languages.find((l) => l.code === currentLocale) || languages[0];

  const getLabel = (code: string) => {
    if (code === "en") return t("english");
    if (code === "ms") return t("malay");
    if (code === "zh") return t("chinese");
    return code;
  };

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <Button 
          variant="flat" 
          color="primary" 
          size="sm"
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
        aria-label={t("language")}
        variant="faded"
        onAction={(key) => handleLanguageChange(key as string)}
      >
        {languages.map((lang) => (
          <DropdownItem
            key={lang.code}
            description={lang.code === currentLocale ? "Active" : ""}
            startContent={
              <Avatar 
                alt={getLabel(lang.code)} 
                className="w-6 h-6 text-tiny" 
                src={lang.flag} 
              />
            }
          >
            {getLabel(lang.code)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
