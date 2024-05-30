import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { SiBuymeacoffee } from "react-icons/si";

const OPEN_SOURCE_URL = "https://github.com/weijunext/landing-page-boilerplate";

const baseSiteConfig = {
  name: "Career Explore",
  description: "Explore your careers in seconds",
  url: "https://career.zeabur.app",
  ogImage: "https://landingpage.weijunext.com/og.png",
  metadataBase: "/",
  keywords: [
    "landing page boilerplate",
    "landing page template",
    "awesome landing page",
    "next.js landing page",
  ],
  authors: [
    {
      name: "Gijela",
      url: "https://github.com/Gijela",
      twitter: "https://twitter.com/frontendGijela",
    },
  ],
  creator: "@weijunext",
  // todo: check user_id
  openSourceURL:
    "https://buy.stripe.com/test_bIYg2ndEaepb50IcMM?userID=user_linjianhui6677",
  themeColors: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  nextThemeColor: "dark", // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.png",
  },
  headerLinks: [
    { name: "repo", href: OPEN_SOURCE_URL, icon: BsGithub },
    {
      name: "twitter",
      href: "https://twitter.com/frontendGijela",
      icon: BsTwitterX,
    },
    {
      name: "buyMeCoffee",
      href: "https://www.buymeacoffee.com/weijunext",
      icon: SiBuymeacoffee,
    },
  ],
  footerLinks: [
    {
      name: "twitter",
      href: "https://twitter.com/frontendGijela",
      icon: BsTwitterX,
    },
    { name: "github", href: "https://github.com/weijunext/", icon: BsGithub },
    // {
    //   name: "buyMeCoffee",
    //   href: "https://www.buymeacoffee.com/weijunext",
    //   icon: SiBuymeacoffee,
    // },
    // {
    //   name: "juejin",
    //   href: "https://juejin.cn/user/26044008768029",
    //   icon: SiJuejin,
    // },
    // {
    //   name: "weChat",
    //   href: "https://weijunext.com/make-a-friend",
    //   icon: BsWechat,
    // },
  ],
  footerProducts: [
    // { url: "https://weijunext.com/", name: "J实验室" },
    // { url: "https://smartexcel.cc/", name: "Smart Excel" },
    // {
    //   url: "https://landingpage.weijunext.com/",
    //   name: "Landing Page Boilerplate",
    // },
    // { url: "https://nextjs.weijunext.com/", name: "Next.js Practice" },
    // { url: "https://starter.weijunext.com/", name: "Next.js Starter" },
    // { url: "https://githubbio.com", name: "Github Bio Generator" },
    // {
    //   url: "https://github.com/weijunext/indie-hacker-tools",
    //   name: "Indie Hacker Tools",
    // },
  ],
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
};
