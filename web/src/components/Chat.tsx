import { h } from "preact";
import "../scss/card.scss";
import { useChatState } from "../context/chatContext";

interface ChatProps {
  chatId: string;
}

function Chat({ chatId }: ChatProps) {
  const getChatById = useChatState();
  const messages = getChatById(chatId);

  return <div>{JSON.stringify(messages)}</div>;
}

export default Chat;
