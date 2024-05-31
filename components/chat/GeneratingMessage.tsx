import { useMessages } from "./MessagesProvider";
import { Markdown } from "./markdownRender/markdown";

export default function GeneratingMessage() {
  const { replyText } = useMessages();

  return <Markdown content={replyText} />;
}
