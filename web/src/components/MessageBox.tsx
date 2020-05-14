import { h, JSX } from "preact";
import { useState } from "preact/compat";
import { useMutation } from "graphql-hooks";
import "../scss/message.scss";

const SEND_MESSAGE_MUTATION = `
mutation sendMessage($chatId:Int!,$content: String!) {
  insert_message(objects:{
    chat_id: $chatId
    content: $content
  }){
    returning{
      id
      content
      sender {
        displayname
      }
    }
  }
}
`

interface MessageBoxProps {
  chatId: string;
}

type InputEvent = JSX.TargetedEvent<HTMLInputElement, Event>;
type ClickEvent = JSX.TargetedEvent<HTMLButtonElement, Event>;

function MessageBox({ chatId }: MessageBoxProps) {
  const [message, setMessage] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION)
  const handleChange = ({ currentTarget }: InputEvent) => {
    setMessage(currentTarget.value);
  };
  const handleClick = (e: ClickEvent) => {
    e.preventDefault();
    sendMessage({variables: {
      chatId: parseInt(chatId),
      content: message
    }})
    setMessage("");
  };
  return (
    <div className="messagebox">
      <input value={message} onChange={handleChange} />
        <button type="submit" onClick={handleClick}>Send</button>
    </div>
  );
}

export default MessageBox;
