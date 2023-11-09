import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { AiOutlineSend, AiFillRobot, AiFillMeh } from "react-icons/ai";
import { Ollama } from "langchain/llms/ollama";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [aiBotResponse, setAiBotResponse] = useState("");
  const [clientInput, setClientInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setClientInput(message);
    setMessage("");
    setTextareaHeight("auto");
  };

  const handleTextareaChange = (event) => {
    setMessage(event.target.value);
    const currentHeight = event.target.style.height;
    const scrollHeight = event.target.scrollHeight + "px";
    if (scrollHeight !== currentHeight) {
      if (currentHeight >= "200px") {
        setTextareaHeight(scrollHeight);
      } else {
        setTextareaHeight("150px");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (clientInput) {
        setIsLoading(true);
        const ollama = new Ollama({
          baseUrl: "http://localhost:11434/",
          model: "mistral",
        });

        const response = await ollama.call(clientInput);
        
        setIsLoading(false);
        let currentResponse = "";
        for (let i = 0; i < response.length; i++) {
          currentResponse += response.charAt(i);
          setAiBotResponse(currentResponse);
          await new Promise((resolve) => setTimeout(resolve, 25));
        }

        
       
      }
    };

    fetchData();
  }, [clientInput]);

  

  return (
    <>
      <section className="chat-window">
        <div className="chat-messages">
          <div className="client-inputmsg">
            <strong><AiFillMeh /></strong>
            <p>{clientInput}</p>
          </div>
          <div className="bot-response">
            <strong><AiFillRobot /></strong>
            <p>{isLoading ? (<div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>) : aiBotResponse}</p>
          </div>
        </div>
        <div className="chat-input">
          <form onSubmit={handleSubmit}>
            <textarea
              id="prompt-input"
              style={{ height: textareaHeight }}
              rows="1"
              cols="50"
              name="input-msg"
              value={message}
              onChange={handleTextareaChange}
            ></textarea>
            <button type="submit">
              <AiOutlineSend />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ChatBox;
