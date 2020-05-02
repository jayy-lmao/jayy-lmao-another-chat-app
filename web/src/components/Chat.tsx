import { h } from "preact";
// import { AuthContext } from "../context/authContext";
import Loader from "./loader";
import "../scss/card.scss";
import { useQuery } from "graphql-hooks";

const CHAT_QUERY = `
query getChat($chatId: Int!) {
  chats_by_pk(id: $chatId){
    messages {
      content
    }
  }
}
`;

interface ChatProps {
  chatId: number;
}

export default function Chat({ chatId }: ChatProps) {
  const { loading, error, data } = useQuery(CHAT_QUERY, {
    variables: { chatId },
  });
  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>"Darn!"</div>;
  return <div>{JSON.stringify(data)}</div>;
}
