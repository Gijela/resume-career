import { TypeLocale } from "@/lib/i18n";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 在新标签页中打开指定的 URL。
 * @param {string} url 要打开的 URL 地址。
 */
export function openUrlInNewTab(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.click();
  a.remove();
}

const uploaderOptions = {
  apiKey: !!process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    ? process.env.NEXT_PUBLIC_BYTESCALE_API_KEY
    : "free",
  maxFileCount: 1,
  mimeTypes: ["application/pdf"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#3B82F6",
    },
    textAlign: "center",
  },
  // tags: ["career_explorer"],
};

export const getUploaderOptions = (btnMsg: string) => {
  return {
    locale: {
      orDragDropFile: "",
      uploadFileBtn: btnMsg,
    },
    ...uploaderOptions,
  };
};

export function normalizeText(input: string): string {
  // Replace multiple spaces with a single space
  let normalized = input.replace(/\s+/g, " ");
  // Replace multiple line breaks with a single line break
  normalized = normalized.replace(/\n+/g, "\n");
  // Trim leading/trailing whitespace
  return normalized.trim();
}

// get lang from pathname
export const getLang = (): TypeLocale | "" => {
  const pathname = window.location.pathname;
  if (pathname === "/") return "";
  const matchResult = pathname.match(/^\/([^/]+)/);
  // eg: matchResult = ['/zh', 'zh', index: 0, input: '/zh', groups: undefined]
  return (matchResult?.[1] as TypeLocale) ?? "";
};

export function prettyObject(msg: any) {
  const obj = msg;
  if (typeof msg !== "string") {
    msg = JSON.stringify(msg, null, "  ");
  }
  if (msg === "{}") {
    return obj.toString();
  }
  if (msg.startsWith("```json")) {
    return msg;
  }
  return ["```json", msg, "```"].join("\n");
}

export const isMobile = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|android/.test(userAgent);
};
