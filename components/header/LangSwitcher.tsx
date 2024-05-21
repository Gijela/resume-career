"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, usePathname, useRouter } from "next/navigation";

import { TypeLocale, defaultLocale, localeNames } from "@/lib/i18n";

export const LangSwitcher = () => {
  const { lang } = useParams();

  let langName: string = defaultLocale;
  if (typeof lang === "string") {
    langName = lang;
  } else if (Array.isArray(lang) && lang.length > 0) {
    langName = lang[0];
  }

  const router = useRouter();
  const pathname = usePathname();

  const handleSwitchLanguage = (value: TypeLocale) => {
    router.push(pathname.replace(/\/[^/]+/, `/${value}`));
  };

  return (
    <Select value={langName} onValueChange={handleSwitchLanguage}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(localeNames).map((key: string) => {
          const name = localeNames[key as TypeLocale];
          return (
            <SelectItem className="cursor-pointer" key={key} value={key}>
              {name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
