import { h } from "preact";
import "../scss/message.scss";
import { useChatState } from "../context/chatContext";
import Loader from './loader';

interface ChatProps {
  chatId: string;
}

interface Sender {
  displayname: string;
}

interface Message {
  content: string;
  sender: Sender;
}
interface Chat {
  id: string;
  messages?: Message[];
}

function renderMessage(message: Message) {
  return (
    <div className="message">
      <div className="message-content">{message.content}</div>
      <div className="message-sender">{message.sender.displayname}</div>
    </div>
  );
}

function renderMessages(messages: Message[]) {
  return messages.map(message => renderMessage(message));
}

function Chat({ chatId }: ChatProps) {
  const getChatById = useChatState();
  const { messages }: Chat = getChatById(chatId);
  if (!messages){
    return <Loader />
  }
  // Reverses so that we're able to use limits
  return <div>{renderMessages(messages.reverse())}</div>;
}

export default Chat;
