"use client";

import MessagesList from "@/components/chat/MessageList";
import { TypeLocale } from "@/lib/i18n";

export default function Chat({ lang }: { lang: TypeLocale }) {
  return <MessagesList />;
}
