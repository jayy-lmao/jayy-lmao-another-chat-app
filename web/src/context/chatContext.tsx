import { h, JSX } from "preact";
import { useState, createContext } from "preact/compat";
import { useSubscription } from "graphql-hooks";

const ChatContext = createContext([]);

const CHAT_SUBSCRIPTION = `
subscription chatSub{
  chats {
    name
    id
    messages(limit: 20, order_by: {created_at: desc}) {
      content
      sender{
        username
        displayname
      }
    }
  }
}
`;

interface ProviderProps {
  children: JSX.Element[];
}

function ChatProvider({ children }: ProviderProps) {
  const [newMessages, setNewMessages] = useState([]);
  useSubscription({ query: CHAT_SUBSCRIPTION }, ({ data, error }) => {
    if (error) {
      return;
    }
    setNewMessages(data.chats);
  });
  return (
    <ChatContext.Provider value={newMessages}>{children}</ChatContext.Provider>
  );
}

export default ChatProvider;
