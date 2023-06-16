import React, { useState, useEffect, useRef } from "react";
import { lexRuntime } from "./../awsConfig";
import { ReactComponent as PaperPlan } from "./../assets/paper-plan.svg";
import BotHeader from "./header";
import "./Chatbot.css";

const ChatBot = ({ chatOpen }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "bot" },
    ]);
  };

  const addUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
  };

  const handleUserInput = async () => {
    const params = {
      botAlias: "YOUR_BOT_ALIAS",
      botName: "YOUR_BOT_NAME",
      inputText,
      userId: "UNIQUE_USER_ID",
    };

    dummyCall();

    try {
      // const lexResponse =
      await lexRuntime.postText(params).promise();
      // setResponse(lexResponse.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dummyCall = () => {
    if (inputText.trim() !== "") {
      setInputText("");
      addUserMessage(inputText);
      setTimeout(() => {
        addBotMessage(`You said: ${inputText}`);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chatbot-container" data-attribute={chatOpen}>
      <BotHeader />
      <div className="chatbot-messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              message.sender === "bot" ? "bot" : "user"
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          value={inputText}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <PaperPlan className="paper-icon" onClick={handleUserInput} />
      </div>
    </div>
  );
};

export default ChatBot;
