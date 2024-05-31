"use client";
import { isMobile } from "@/lib/utils";

export default function VideoDemo({ lang }: { lang: "zh" | "en" }) {
  return (
    <div className="mt-4 sm:mt-8 w-[300px] h-[500px] sm:w-[860px] sm:h-[420px] flex justify-center">
      <video controls>
        <source
          src={`https://f005.backblazeb2.com/file/PicCloudGijela/demo-${lang}-${
            isMobile() ? "mobile" : "pc"
          }.mp4`}
          type="video/mp4"
        />
      </video>
    </div>
  );
}
