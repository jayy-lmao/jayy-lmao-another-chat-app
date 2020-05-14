import { h } from "preact";
import {useContext} from "preact/hooks"
import "../scss/message.scss";
import { useChatState } from "../context/chatContext";
import Loader from "./loader";
import Messages from "./Messages";
import MessageBox from "./MessageBox";
import { AuthContext } from "../context/authContext"

interface ChatProps {
  chatId: string;
}

interface Sender {
  displayname: string;
  username: string;
}

interface Message {
  content: string;
  sender: Sender;
}
interface Chat {
  id: string;
  messages?: Message[];
}

function Chat({ chatId }: ChatProps) {
  const { auth } = useContext(AuthContext);
  const getChatById = useChatState();
  const { messages }: Chat = getChatById(chatId);
  if (!messages) {
    return <Loader />;
  }
  // Reverses so that we're able to use limits
  return (
    <div className="chatbox">
      <Messages messages={messages.reverse()} username={auth.username}/>
      <MessageBox chatId={chatId} />
    </div>
  );
}

export default Chat;
