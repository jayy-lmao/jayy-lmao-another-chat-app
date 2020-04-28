import { h } from "preact";
// import { AuthContext } from "../context/authContext";
import { Link } from "wouter/preact";
import Loader from "./loader";
import "../scss/card.scss";
import { useQuery } from "graphql-hooks";

const CHAT_QUERY = `
query {
  chats {
    name
    id
    messages {
      content
      sender{
        username
        displayname
      }
    }
  }
}
`;

interface User {
  username: string;
  displayname: string;
}

interface Message {
  content: string;
  sender: User;
}

interface Chat {
  id: number;
  name: string;
  messages: Message[];
}

function ChatItem({ id, name, messages }: Chat) {
  return (
    <li key={id}>
      <Link to={`/chats/${id}`}>
        <div className="chatlist-chat-name">{name}</div>
        <div className="chatlist-chat-lastMessage">
          {messages.length && messages[0].content}
        </div>
        <div className="chatlist-chat-lastMessageFrom">
          {messages.length && messages[0].sender.displayname}
        </div>
      </Link>
    </li>
  );
}

export default function ChatList() {
  const { loading, error, data } = useQuery(CHAT_QUERY);
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>"Darn!"</div>;
  const chatItems: Chat[] = data.chats.map((chat: Chat) => ChatItem(chat));
  return <div>{chatItems}</div>;
}
