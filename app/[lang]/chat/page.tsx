import Chat from "@/app/[lang]/chat/Chat";
import { TypeLocale } from "@/lib/i18n";

export default async function LangHome({
  params: { lang },
}: {
  params: { lang: TypeLocale };
}) {
  // const { dashboard } = await dictionaries[lang]();

  return <Chat lang={lang} />;
}
