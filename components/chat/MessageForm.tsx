import { Button, TextArea } from "@apideck/components";
import { useRef, useState } from "react";
import { SSE_Status_Map, useMessages } from "./MessagesProvider";

const MessageForm = () => {
  const [content, setContent] = useState("");
  const { addMessage, connectStatus, controllerSSE, closeSSEConnect } =
    useMessages();
  const formRef = useRef(null);

  const handleSubmit = async (e?: any) => {
    e?.preventDefault();
    addMessage(content);
    setContent("");
  };

  const handleStopGenerate = () => {
    controllerSSE.abort();
    closeSSEConnect();
  };

  return (
    <form
      className="w-full mx-auto max-w-5xl rounded-t-xl absolute bottom-0 right-1/2 translate-x-2/4"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="relative border border-gray-300 box-border shadow-2xl rounded-t-xl backdrop-blur border-gray-500/10 dark:border-gray-50/[0.06] bg-white dark:bg-inherit supports-backdrop-blur:bg-white/95 p-5">
        <label htmlFor="content" className="sr-only">
          Your message
        </label>
        <TextArea
          disabled={[SSE_Status_Map.CONNECTING, SSE_Status_Map.OPEN].includes(
            connectStatus
          )}
          name="content"
          rows={3}
          value={content}
          autoFocus
          className="!p-3 text-gray-900 border-0 ring-1 dark:ring-0 ring-gray-300/40 focus:ring-gray-300/80 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800/80 backdrop-blur shadow-none"
          onChange={(e: any) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <div className="absolute right-8 bottom-10">
          <div className="flex space-x-3">
            {![SSE_Status_Map.CONNECTING, SSE_Status_Map.OPEN].includes(
              connectStatus
            ) ? (
              <Button size="small" type="submit">
                发送
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </Button>
            ) : (
              <Button size="small" disabled={true} isLoading={true}>
                生成中
              </Button>
            )}
          </div>
        </div>
        {[SSE_Status_Map.CONNECTING, SSE_Status_Map.OPEN].includes(
          connectStatus
        ) && (
          <Button
            className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
            size="small"
            onClick={handleStopGenerate}
          >
            停止生成
          </Button>
        )}
      </div>
    </form>
  );
};

export default MessageForm;
