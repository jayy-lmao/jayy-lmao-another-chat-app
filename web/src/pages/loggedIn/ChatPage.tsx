import { h } from "preact";
import Chat from "../../components/Chat";
import MessageBox from "../../components/MessageBox";

interface ChatProps {
  chatId: string;
}

export default function ChatPage({ chatId }: ChatProps) {
  return (
    <div className="page--empty">
      <Chat chatId={chatId} />
      <br />
      <MessageBox chatId={chatId} />
    </div>
  );
}
