import { h } from "preact";
import "../scss/message.scss";

interface Sender {
  displayname: string;
  username: string;
}

interface Message {
  content: string;
  sender: Sender;
}
interface MessagesProps {
  messages: Message[];
  username: string;
}

function senderIsUser(message: Message, username: string) {
  return message.sender.username === username;
}

function renderContents(message: Message) {
  return (
    <div className="message">
      <div className="message-content">{message.content}</div>
      <div className="message-sender">{message.sender.displayname}</div>
    </div>
  );
}

function renderMessage(message: Message, username: string) {
  return senderIsUser(message, username) ? (
    <div className="message-row--self">{renderContents(message)}</div>
  ) : (
    <div className="message-row">{renderContents(message)}</div>
  );
}

function renderMessages(messages: Message[], username: string) {
  return messages.map((message) => ( renderMessage(message, username)));
}

function Messages({ messages, username }: MessagesProps) {
  return <div>{renderMessages(messages, username)}</div>;
}

export default Messages;
