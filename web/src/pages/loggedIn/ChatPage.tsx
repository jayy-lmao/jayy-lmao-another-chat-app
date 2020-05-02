import { h } from "preact";
import Chat from "../../components/Chat";

interface ChatProps {
  chatId: number;
}

export default function ChatPage({ chatId }: ChatProps) {
  return (
    <div className="page--empty">
      <Chat chatId={chatId} />
    </div>
  );
}
