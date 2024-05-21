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
