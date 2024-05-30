"use client";

import { Button } from "@/components/ui/button";
import { defaultLocale } from "@/lib/i18n";
import { RocketIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const CTAButton = ({ locale }: { locale: { title: string } }) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const Router = useRouter();

  const handleClickDemo = () => {
    const lang = pathname.split("/")[1] || defaultLocale;
    Router.push(
      `/${lang}/career/${
        lang === "zh" ? "E3arouR3XF5Asky7" : "WQd2GpFgZeNZejsW"
      }`
    );
  };

  return (
    <div className="flex gap-4">
      <Link href={`/${pathname.split("/")[1] || defaultLocale}/dashboard`}>
        <Button
          variant="default"
          className="flex items-center h-[48px] w-[180px] gap-2 bg-blue-500 hover:bg-blue-600 text-white"
          aria-label="Get Boilerplate"
        >
          <RocketIcon />
          {locale.title}
        </Button>
      </Link>
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={handleClickDemo}
      >
        <span className="">
          {(pathname.split("/")[1] || defaultLocale) === "zh"
            ? "尝试使用示例"
            : "Try the demo"}
        </span>
        {theme === "light" ? (
          <img src="/black-arrow.png" alt="black-arrow" className="h-[16px]" />
        ) : (
          <img src="/white-arrow.png" alt="white-arrow" className="h-[16px]" />
        )}
      </div>
    </div>
  );
};

export default CTAButton;
