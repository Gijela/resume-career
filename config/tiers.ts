import { siteConfig } from "@/config/site";
import { Tier, TiersEnum } from "@/types/pricing";

export const TIERS_EN: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Plan Hobby",
    price: "$0",
    description: "Increase 3 Credits, never expires.",
    features: ["Free", "3 Credits", "Access all functions", "3 trials"],
    buttonText: "Start",
    buttonColor: "secondary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Pro,
    title: "Plan Pro",
    price: "$1.99",
    description: "Increase 10 Credits, never expires.",
    features: [
      "Various methods of payment",
      "10 Credits",
      "Access all functions",
      "Faster AI processing",
    ],
    buttonText: "buy plan",
    buttonColor: "primary",
    buttonVariant: "solid",
    creditAmount: 10, // [clerk metadata] 添加的积分数
    priceId: "price_1PM9ovRo4ZPuRCXnlyOSGGXO", // [prod mode] stripe $1.99
  },
  {
    key: TiersEnum.Team,
    title: "Plan Team",
    price: "$8.99",
    description: "Increase 50 Credits, never expires.",
    features: [
      "Various methods of payment",
      "50 Credits",
      "Access all functions",
      "Answer one-on-one questions",
    ],
    buttonText: "buy plan",
    buttonColor: "primary",
    buttonVariant: "solid",
    creditAmount: 50,
    priceId: "price_1PMATLRo4ZPuRCXnAbM2pwLP", // [prod mode] stripe $8.99
  },
];

export const TIERS_ZH: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Hobby 计划",
    price: "￥0",
    description: "增加3个积分，永久有效",
    features: ["免费", "3个积分", "访问全部功能", "3次试用机会"],
    buttonText: "开始探索",
    buttonColor: "secondary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Pro,
    title: "Pro 计划",
    price: "￥3.69",
    description: "增加10个积分，永久有效",
    features: ["支付宝结账", "10个积分", "访问全部功能", "更快的AI处理"],
    buttonText: "购买",
    buttonColor: "primary",
    buttonVariant: "solid",
    creditAmount: 10, // [clerk metadata] 添加的积分数
    priceId: "price_1PMAgTRo4ZPuRCXn7Hjz636h", // [prod mode] stripe ￥3.69
  },
  {
    key: TiersEnum.Team,
    title: "Team 计划",
    price: "￥14.69",
    description: "增加50个积分，永久有效",
    features: ["支付宝结账", "50个积分", "访问全部功能", "一对一答疑"],
    buttonText: "购买",
    buttonColor: "primary",
    buttonVariant: "solid",
    creditAmount: 50,
    priceId: "price_1PMAphRo4ZPuRCXnGguRGiA7", // [prod mode] stripe ￥14.69
  },
];

export const TIERS_JA: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "オープンソース / 無料",
    price: "無料",
    href: siteConfig.openSourceURL || "#",
    description:
      "GitHubリポジトリからランディングページのボイラープレートを自由にクローンできます。",
    features: ["無料", "全コードへのアクセス", "二次開発", "MITライセンス"],
    buttonText: "始める",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "カスタマイズ",
    href: siteConfig.authors[0].twitter || "#",
    description: "専用のランディングページをカスタマイズするために支払います。",
    price: "$188",
    features: [
      "全コードへのアクセス",
      "二次開発",
      "独占スタイル",
      "1対1のサービス",
      "より精巧なページ",
    ],
    buttonText: "お問い合わせ",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_AR: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "مفتوح المصدر / مجاني",
    price: "مجاناً",
    href: siteConfig.openSourceURL || "#",
    description: "يمكنك نسخ قالب صفحة الهبوط من مستودع GitHub بحرية.",
    features: ["مجاني", "الوصول إلى كامل الكود", "التطوير الثانوي", "رخصة MIT"],
    buttonText: "ابدأ الآن",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "تخصيص",
    href: siteConfig.authors[0].twitter || "#",
    description: "ادفع لتخصيص صفحة هبوط حصرية.",
    price: "$188",
    features: [
      "الوصول إلى كامل الكود",
      "التطوير الثانوي",
      "أسلوب حصري",
      "خدمة فردية",
      "صفحات أكثر دقة",
    ],
    buttonText: "اتصل بنا",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_ES: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Código Abierto / Gratuito",
    price: "Gratis",
    href: siteConfig.openSourceURL || "#",
    description:
      "Clona libremente la plantilla de página de aterrizaje desde el repositorio de GitHub.",
    features: [
      "Gratis",
      "Acceso a todo el código",
      "Desarrollo secundario",
      "Licencia MIT",
    ],
    buttonText: "Comenzar",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Personalizar",
    href: siteConfig.authors[0].twitter || "#",
    description: "Paga para personalizar una página de aterrizaje exclusiva.",
    price: "$188",
    features: [
      "Acceso a todo el código",
      "Desarrollo secundario",
      "Estilo exclusivo",
      "Servicio personalizado",
      "Páginas más exquisitas",
    ],
    buttonText: "Contáctanos",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

export const TIERS_RU: Array<Tier> = [
  {
    key: TiersEnum.Free,
    title: "Открытый Источник / Бесплатно",
    price: "Бесплатно",
    href: siteConfig.openSourceURL || "#",
    description:
      "Свободно клонируйте шаблон лендинга из репозитория на GitHub.",
    features: [
      "Бесплатно",
      "Доступ ко всему коду",
      "Вторичная разработка",
      "Лицензия MIT",
    ],
    buttonText: "Начать",
    buttonColor: "primary",
    buttonVariant: "solid",
  },
  {
    key: TiersEnum.Customize,
    title: "Настройка",
    href: siteConfig.authors[0].twitter || "#",
    description: "Оплатите персонализацию эксклюзивной лендинг страницы.",
    price: "$188",
    features: [
      "Доступ ко всему коду",
      "Вторичная разработка",
      "Эксклюзивный стиль",
      "Индивидуальное обслуживание",
      "Более изысканные страницы",
    ],
    buttonText: "Связаться с нами",
    buttonColor: "default",
    buttonVariant: "flat",
  },
];

interface TiersCollection {
  [key: `TIERS_${string}`]: Array<Tier>;
}

export const ALL_TIERS: TiersCollection = {
  TIERS_EN,
  TIERS_ZH,
  TIERS_JA,
  TIERS_AR,
  TIERS_ES,
  TIERS_RU,
};
