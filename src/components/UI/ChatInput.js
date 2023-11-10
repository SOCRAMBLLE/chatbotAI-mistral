import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import "./ChatInput.css"

const ChatInput = ({
  message,
  textareaHeight,
  onTextareaChange,
  onSubmit,
}) => {
  return (
    <div className="chat-input">
      <form onSubmit={onSubmit}>
        <textarea
          id="prompt-input"
          style={{ height: textareaHeight }}
          rows="1"
          cols="50"
          name="input-msg"
          value={message}
          onChange={onTextareaChange}
        ></textarea>
        <button type="submit">
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
