import React, { useState, useEffect } from "react";
import "./ChatBox.css";
import { Ollama } from "langchain/llms/ollama";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [aiBotResponse, setAiBotResponse] = useState("");
  const [clientInput, setClientInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) {
        return;
    }
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
      <ChatMessages
        clientInput={clientInput}
        aiBotResponse={aiBotResponse}
        isLoading={isLoading}
      />
      <ChatInput
        message={message}
        textareaHeight={textareaHeight}
        onTextareaChange={handleTextareaChange}
        onSubmit={handleSubmit}
      />
    </section>
    </>
  );
};

export default ChatBox;
