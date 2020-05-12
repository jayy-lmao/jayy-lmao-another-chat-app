import { h } from "preact";
import { useState } from "preact/hooks";
// import { AuthContext } from "../context/authContext";
// import Loader from "./loader";
import "../scss/card.scss";
import { useSubscription } from "graphql-hooks";

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

interface ChatProps {
  chatId: number;
}

function Chat({ chatId }: ChatProps) {
  const [newMessages, setNewMessages] = useState([]);
  useSubscription({query: CHAT_SUBSCRIPTION}, ({data, error}) => {
    if (error){
      return
    }

    const chat= data.chats.find(({id}) => id == chatId)

    setNewMessages(chat.messages)
  })
  return <div>{JSON.stringify(newMessages)}</div>;
}

export default Chat;
