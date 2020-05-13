import { h, JSX } from "preact";
import { useState } from "preact/compat";
import "../scss/message.scss";

interface MessageBoxProps {
  chatId: string;
}

type InputEvent = JSX.TargetedEvent<HTMLInputElement, Event>;
type ClickEvent = JSX.TargetedEvent<HTMLButtonElement, Event>;

function MessageBox({ chatId }: MessageBoxProps) {
  const [message, setMessage] = useState("");
  const handleChange = ({ currentTarget }: InputEvent) => {
    setMessage(currentTarget.value);
  };
  const handleClick = (e: ClickEvent) => {
    e.preventDefault();
    console.log({ message, chatId });
    setMessage("");
  };
  return (
    <div className="chatbox">
      <input value={message} onChange={handleChange} />
        <button type="submit" onClick={handleClick}>Send</button>
    </div>
  );
}

export default MessageBox;
