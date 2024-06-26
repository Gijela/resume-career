"use client";
import { useHeaderHeight } from "@/components/HeaderProvider";
import HeaderLinks from "@/components/header/HeaderLinks";
import { LangSwitcher } from "@/components/header/LangSwitcher";
import { siteConfig } from "@/config/site";
import { defaultLocale, localeNames } from "@/lib/i18n";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { ThemedButton } from "../ThemedButton";

const links = [
  // {
  //   label: "Features",
  //   href: "#Features",
  // },
  {
    label: {
      zh: "定价",
      en: "Pricing",
    },
    href: "#Pricing",
  },
  // {
  //   label: "Wall of Love",
  //   href: "#WallOfLove",
  // },
  {
    label: {
      zh: "常见问题",
      en: "FAQ",
    },
    href: "#FAQ",
  },
];

const localeHeader = {
  zh: {
    name: "探索高薪工作",
    dashboard: "控制台",
    credit: "积分",
  },
  en: {
    name: "Explore high salary Careers",
    dashboard: "dashboard",
    credit: "Credit",
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAnchors, setShowAnchors] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const headerRef = useRef(null);
  const { setHeaderHeight } = useHeaderHeight();

  useEffect(() => {
    if (pathname === "/") {
      setShowAnchors(true);
      return;
    }

    let showAnchorsFlag = Object.keys(localeNames).some(
      (lang) => "/" + lang === pathname
    );
    setShowAnchors(!!showAnchorsFlag);
  }, [pathname]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(
        (headerRef.current as { offsetHeight: number }).offsetHeight
      );
    }
  }, []);

  // get lang from pathname
  const getLang = () => {
    if (pathname === "/") return "";
    const matchResult = pathname.match(/^\/([^/]+)/);
    // eg: matchResult = ['/zh', 'zh', index: 0, input: '/zh', groups: undefined]
    return matchResult?.[1] ?? "";
  };

  const CreditNode = ({ extraClass }: { extraClass?: string }) => (
    <Link
      href={`/${getLang()}/price`}
      className={`cursor-pointer hover:text-blue-600 ${extraClass}`}
    >
      {localeHeader[(getLang() || defaultLocale) as "en" | "zh"]?.credit}：
      {user?.publicMetadata?.credit as number}
    </Link>
  );

  return (
    <header
      ref={headerRef}
      className="py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <nav className="relative z-50 flex justify-between">
        <div className="flex items-center md:gap-x-12 md:min-w-96">
          <Link
            href={`/${getLang()}`}
            aria-label="Landing Page Boilerplate"
            title="Landing Page Boilerplate"
            className="flex items-center space-x-1 font-bold"
          >
            <Image
              alt={siteConfig.name}
              src="/logo.svg"
              className="w-8 h-8 mr-2"
              width={32}
              height={32}
            />
            <span className="text-gray-950 dark:text-gray-300 hidden md:block hover:text-blue-600 text-base">
              {localeHeader[(getLang() || defaultLocale) as "en" | "zh"]?.name}
            </span>
          </Link>
          <Link href={`/${getLang() || defaultLocale}/dashboard`}>
            <span className="font-semibold text-blue-600 ml-4 sm:ml-0 text-base">
              {
                localeHeader[(getLang() || defaultLocale) as "en" | "zh"]
                  ?.dashboard
              }
            </span>
          </Link>
        </div>

        {showAnchors && (
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={
                    link.label[(getLang() || defaultLocale) as "en" | "zh"]
                  }
                  title={
                    link.label[(getLang() || defaultLocale) as "en" | "zh"]
                  }
                  className="tracking-wide transition-colors duration-200 font-norma"
                >
                  {link.label[(getLang() || defaultLocale) as "en" | "zh"]}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="hidden md:flex items-center gap-x-6 min-w-96 justify-end">
          <ThemedButton />
          <LangSwitcher />

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {user && <CreditNode />}
        </div>

        <div className="flex md:hidden items-center">
          {user && <CreditNode extraClass="p-2" />}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuIcon />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-50">
              <div className="p-5 bg-background border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Link
                      href={`/${getLang()}`}
                      aria-label="Landing Page Boilerplate"
                      title="Landing Page Boilerplate"
                      className="inline-flex items-center"
                    >
                      <Image
                        alt={siteConfig.name}
                        src="/logo.svg"
                        className="w-8 h-8"
                        width={32}
                        height={32}
                      />
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-950 dark:text-gray-300">
                        {
                          localeHeader[
                            (getLang() || defaultLocale) as "en" | "zh"
                          ]?.name
                        }
                      </span>
                    </Link>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="tracking-wide transition-colors duration-200 font-norma"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CgClose />
                    </button>
                  </div>
                </div>
                {showAnchors && (
                  <nav>
                    <ul className="space-y-4">
                      {links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-label={
                              link.label[
                                (getLang() || defaultLocale) as "en" | "zh"
                              ]
                            }
                            title={
                              link.label[
                                (getLang() || defaultLocale) as "en" | "zh"
                              ]
                            }
                            className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {
                              link.label[
                                (getLang() || defaultLocale) as "en" | "zh"
                              ]
                            }
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                <div className="pt-2">
                  <div className="flex items-center gap-x-5 justify-between">
                    <HeaderLinks />
                    <div className="flex items-center justify-end gap-x-5">
                      <ThemedButton />
                      <LangSwitcher />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
