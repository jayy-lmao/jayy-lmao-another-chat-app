import { h, JSX } from "preact";
import { useState, useContext, createContext } from "preact/compat";
import { useSubscription } from "graphql-hooks";

const ChatListContext = createContext([]);
const ChatContext = createContext((chatId: string) => ({ id: chatId }));

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
  children: JSX.Element;
}

function ChatProvider({ children }: ProviderProps) {
  const [newMessages, setNewMessages] = useState([]);
  useSubscription({ query: CHAT_SUBSCRIPTION }, ({ data, error }) => {
    if (error) {
      return;
    }
    setNewMessages(data.chats);
  });
  function getChatById(chatId: string) {
    console.log({ newMessages, foo: "bar" });
    const chat = newMessages.find(({ id }) => id == chatId);
    if (!chat) {
      return { id: chatId };
    }
    return chat;
  }

  return (
    <ChatListContext.Provider value={newMessages}>
      <ChatContext.Provider value={getChatById}>
        {children}
      </ChatContext.Provider>
    </ChatListContext.Provider>
  );
}

function useChatState() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatState must be used within ChatProvider");
  }
  return context;
}

function useChatListState() {
  const context = useContext(ChatListContext);
  if (context === undefined) {
    throw new Error("useChatListState must be used within ChatListProvider");
  }
  return context;
}

export { ChatProvider, useChatState, useChatListState };
