import DashBoard from "@/app/[lang]/dashboard/Board";
import { TypeLocale, dictionaries } from "@/lib/i18n";

export default async function LangHome({
  params: { lang },
}: {
  params: { lang: TypeLocale };
}) {
  const { dashboard } = await dictionaries[lang]();

  return <DashBoard lang={lang} dashBoard={dashboard} />;
}
