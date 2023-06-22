import React, { useState, useEffect, useRef } from "react";
import { lexRuntime } from "../../awsConfig";
import { ReactComponent as PaperPlan } from "../../assets/paper-plan.svg";
import BotHeader from "./../header";
import "./styles.css";

const ChatBot = ({ chatOpen, handleBotClick }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [typing, setTyping] = useState(false);
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
      botAlias: "TestBotAlias",
      botName: "test-chat",
      inputText,
      userId: "9YYCSYO9NZ",
    };

    dummyCall();

    try {
      const lexResponse = await lexRuntime.postText(params).promise();
      console.log("lexResponse.message", lexResponse.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getRandomNumber = () => {
    var min = 1000;
    var max = 10000;
    var randomNumber =
      Math.floor((Math.random() * (max - min + 1)) / 100) * 100 + min;
    return randomNumber;
  };

  const dummyCall = () => {
    if (inputText.trim() !== "") {
      setInputText("");
      addUserMessage(inputText);
      setTyping(true);
      setTimeout(() => {
        addBotMessage(`You said: ${inputText}`);
        setTyping(false);
      }, 2000 + getRandomNumber());
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const Typing = () => {
    return (
      <div className="typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  };

  return (
    <div className="chatbot-container" data-attribute={chatOpen}>
      <BotHeader handleBotClick={handleBotClick} />
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
        {typing && messages[messages.length - 1].sender === "user" && (
          <Typing />
        )}
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
