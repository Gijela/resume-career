import { useHeaderHeight } from "@/components/HeaderProvider";
import MessageForm from "@/components/chat/MessageForm";
import { useEffect, useRef, useState } from "react";
import GeneratingMessage from "./GeneratingMessage";
import { SSE_Status_Map, useMessages } from "./MessagesProvider";
import { Markdown } from "./markdownRender/markdown";

const msgFormHeight = 130;

const MessagesList = () => {
  const { connectStatus, messages } = useMessages();
  const loadingRef = useRef<HTMLDivElement>(null);
  const GenerateRef = useRef<HTMLDivElement>(null);
  const { headerHeight } = useHeaderHeight();
  const [maxListHeight, setMaxListHeight] = useState<number>(0);

  useEffect(() => {
    const screenHeight = window.innerHeight;
    const maxContentHeight = screenHeight - headerHeight - msgFormHeight;
    setMaxListHeight(maxContentHeight);
  }, [headerHeight]);

  useEffect(() => {
    if (connectStatus === SSE_Status_Map.CONNECTING) {
      loadingRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [connectStatus]);

  useEffect(() => {
    GenerateRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [messages]);

  return (
    <div className="flex flex-col self-stretch bg-slate-50 dark:bg-inherit dark:border-t dark:border-gray-800">
      <div
        className="w-full mx-auto max-w-5xl overflow-auto scrollbar-hide p-3 sm:p-6"
        style={{ height: maxListHeight }}
      >
        {messages?.map((message, i) => {
          const isUser = message.role === "user";
          if (message.role === "system") return null;
          return (
            <div
              id={`message-${i}`}
              className={`flex mb-3 fade-up ${
                !isUser ? "justify-start" : "justify-end"
              }`}
              key={message.content + String(i)}
            >
              {!isUser && (
                <img
                  src={"/gpt.png"}
                  className="mr-4 w-9 h-9 rounded-full"
                  alt="avatar"
                />
              )}
              <div
                style={{ maxWidth: "calc(100% - 45px)" }}
                className={`group relative px-3 py-2 rounded-lg ${
                  isUser
                    ? "bg-gradient-to-br from-primary-700 to-primary-600 text-white text-[0.875rem] ml-16"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 mr-16"
                }`}
              >
                {isUser ? (
                  <div className="dark:text-black">
                    {message.content?.trim()}
                  </div>
                ) : (
                  <div className="dark:text-white">
                    <Markdown content={message.content!} />
                  </div>
                )}
              </div>
              {isUser && (
                <img
                  src={"/logo.png"}
                  className="ml-4 w-9 h-9 rounded-full"
                  alt="avatar"
                />
              )}
            </div>
          );
        })}
        {/* loading animation */}
        {connectStatus === SSE_Status_Map.CONNECTING && (
          <div ref={loadingRef} className="flex justify-start mb-4">
            <img
              src="/gpt.png"
              className="mr-4 w-9 h-9 rounded-full"
              alt="avatar"
            />
            <div className="loader p-2.5 px-4 bg-gray-200 dark:bg-gray-800 rounded-lg space-x-1.5 flex justify-between items-center relative">
              <span className="block w-3 h-3 rounded-full bg-blue-600 animate-bounce"></span>
              <span className="block w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-200"></span>
              <span className="block w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-400"></span>
            </div>
          </div>
        )}
        {/* 流式信息未获得'data: [DONE]'时显示 */}
        {connectStatus === SSE_Status_Map.OPEN && (
          <div
            ref={GenerateRef}
            className={`flex mb-3 fade-up justify-start`}
            key={"x"}
          >
            <img
              src={"/gpt.png"}
              className="mr-4 w-9 h-9 rounded-full"
              alt="avatar"
            />
            <div
              style={{ maxWidth: "calc(100% - 45px)" }}
              className={`mr-16 group relative px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 dark:text-white`}
            >
              <GeneratingMessage />
            </div>
          </div>
        )}
      </div>
      {maxListHeight && (
        <div style={{ height: msgFormHeight }}>
          <MessageForm />
        </div>
      )}
    </div>
  );
};

export default MessagesList;
