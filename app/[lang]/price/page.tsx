import Pricing from "@/components/home/Pricing";
import { TypeLocale, getDictionary } from "@/lib/i18n";

export default async function Price({
  params: { lang },
}: {
  params: { lang: TypeLocale };
}) {
  const dict = await getDictionary(lang);

  return (
    <>
      <Pricing locale={dict.Pricing} langName={lang}></Pricing>
    </>
  );
}
