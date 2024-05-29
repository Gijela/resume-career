"use client";
import { defaultLocale } from "@/lib/i18n";
import { getLang, prettyObject } from "@/lib/utils";

import {
  EventStreamContentType,
  fetchEventSource,
} from "@fortaine/fetch-event-source";

export interface ChatCompletionRequestMessage {
  role: string;
  content: string;
}

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface ContextProps {
  replyText: string;
  messages: ChatCompletionRequestMessage[];
  setMessages: Dispatch<SetStateAction<ChatCompletionRequestMessage[]>>;
  learnTarget: string;
  setLearnTarget: Dispatch<SetStateAction<string>>;
  addMessage: (content: string) => Promise<void>;
  connectStatus: number;
  controllerSSE: AbortController;
  closeSSEConnect: () => void;
}

const ChatsContext = createContext<Partial<ContextProps>>({});

interface IMessagesProvider {
  children: ReactNode;
}

export enum SSE_Status_Map {
  DEFAULT_STATUS = -1,
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 2,
}

export function MessagesProvider({ children }: IMessagesProvider) {
  const [replyText, setReplyText] = useState<string>("");
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [connectStatus, setConnectStatus] = useState<number>(-1); // SSE_Status_Map
  const [controllerSSE, setControllerSSE] = useState<AbortController>(
    {} as unknown as AbortController
  );
  const [learnTarget, setLearnTarget] = useState<string>("");
  // // 初始化
  // useEffect(() => {
  //   const lang = (getLang() || defaultLocale) as "en" | "zh";

  //   const systemMessage: ChatCompletionRequestMessage = {
  //     role: "system",
  //     content: systemContent[lang],
  //   };
  //   const welcomeMessage: ChatCompletionRequestMessage = {
  //     role: "assistant",
  //     content: welcomeContent[lang],
  //   };
  //   setMessages([systemMessage, welcomeMessage]);
  // }, []);

  const closeSSEConnect = () => {
    // controllerSSE?.abort()
    setConnectStatus(SSE_Status_Map.CLOSED);
    console.log("流连接已断开");
  };

  // 提问 openAI
  const addMessage = async (content: string) => {
    if (!messages.length) {
      const lang = (getLang() || defaultLocale) as "en" | "zh";
      toast.error(
        lang === "zh"
          ? "请从推荐学习路线处跳转进入此页面"
          : "Please jump from the recommended study route to this page"
      );
      return;
    }

    try {
      // 添加问题到 Messages
      const newMessage: ChatCompletionRequestMessage = {
        role: "user",
        content,
      };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);

      // 发起请求 & 返回流式数据
      const newControllerSSE = new AbortController();
      setControllerSSE(newControllerSSE);

      setConnectStatus(SSE_Status_Map.CONNECTING);
      fetchEventSource("/api/chat/gpt", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages }),
        signal: newControllerSSE.signal,
        openWhenHidden: true,
        onopen: async function (res) {
          setConnectStatus(SSE_Status_Map.OPEN);

          // 异常处理
          if (
            !res.ok ||
            !res.headers
              .get("content-type")
              ?.startsWith(EventStreamContentType) ||
            res.status !== 200
          ) {
            let extraInfo = await res.clone().text();
            try {
              const resJson = await res.clone().json();
              extraInfo = prettyObject(resJson);
            } catch (error) {
              console.log("onopen - error", error);
            }

            let responseText = "";
            if (extraInfo) {
              responseText = extraInfo;
            }

            setReplyText(responseText || "请求出错");
          }
        },
        onmessage: function (event) {
          if (event.data === "[DONE]") return;
          const eventMessage = JSON.parse(event.data);
          // streamMessage.content 是完整的消息
          const streamMessage = eventMessage.choices[0]?.message as {
            role: string;
            content: string;
          };
          setReplyText(streamMessage.content);
        },
        onclose() {
          closeSSEConnect();
        },
        onerror(e) {
          closeSSEConnect();
          throw e;
        },
      });
    } catch (error) {
      console.log("发起对话请求出错！");
    }
  };

  useEffect(() => {
    if (connectStatus === SSE_Status_Map.CLOSED) {
      const replyTemplate = {
        role: "assistant",
        content: replyText,
      } as ChatCompletionRequestMessage;
      setMessages([...messages, replyTemplate]);
      setReplyText("");
    }
  }, [connectStatus]);

  return (
    <ChatsContext.Provider
      value={{
        connectStatus,
        controllerSSE,
        closeSSEConnect,
        replyText,
        messages,
        addMessage,
        setMessages,
        learnTarget,
        setLearnTarget,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps;
};
