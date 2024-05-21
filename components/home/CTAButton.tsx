"use client";

import { Button } from "@/components/ui/button";
import { defaultLocale } from "@/lib/i18n";
import { RocketIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CTAButton = ({ locale }: { locale: { title: string } }) => {
  const pathname = usePathname();

  return (
    <Link href={`/${pathname.split("/")[1] || defaultLocale}/dashboard`}>
      <Button
        variant="default"
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        aria-label="Get Boilerplate"
      >
        <RocketIcon />
        {locale.title}
      </Button>
    </Link>
  );
};

export default CTAButton;
