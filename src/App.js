import axios from "axios";
import { default as React, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import OpenIcon from "./assets/chat-bot.svg";
import PaperPlan from "./assets/paper-plan.svg";
import Avtar from "./assets/avtar.svg";
import CloseIcon from "./assets/close.svg";
import RefreshIcon from "./assets/refresh.svg";
import LogoIcon from "./assets/logo.svg";

const App = () => {
  const [chatOpen, setChatOpen] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [userId, setUserId] = useState("");
  const [inputText, setInputText] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    handleRefresh();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRefresh = () => {
    const id = uuidv4();
    setUserId(id);
    setMessages([
      { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);
  };

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
    if (inputText.trim() === "") return;
    const params = {
      inputText,
      userId: userId,
    };
    setInputText("");
    addUserMessage(inputText);
    setTyping(true);
    try {
      const response = await axios.post("https://api.example.com/data", params);
      const message = response?.mesages?.[0]?.contentText ?? "Try again";
      addBotMessage(message);
      setTyping(false);
    } catch (e) {
      addBotMessage(`Something went wrong, please try after some time.`);
      setTyping(false);
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

  const handleBotClick = (e) => {
    var container = document.querySelector(".chatbot-container");
    const keys = chatOpen
      ? ["slide-up", "slide-down"]
      : ["slide-down", "slide-up"];
    container.classList.remove(keys[0]);
    container.classList.add(keys[1]);
    setChatOpen(!chatOpen);
  };

  return (
    <div className="app-container">
      <img alt="logo" src={LogoIcon} />
      {!chatOpen && (
        <button className="chat-bot" onClick={handleBotClick}>
          <img alt="chat-bot" src={OpenIcon} className="opened" />
        </button>
      )}
      <div className="chatbot-container" data-attribute={chatOpen}>
        <div className="chatbot-header">
          <div className="avatars-wrapper">
            <img alt="avtar" className="header-ava" src={Avtar} />
          </div>
          <h2>CBSI Chat</h2>
          <div className="btn-container">
            <button className="chat-bot-btn me-1" onClick={handleRefresh}>
              <img alt="refresh" src={RefreshIcon} />
            </button>
            <button className="chat-bot-btn" onClick={handleBotClick}>
              <img alt="chat-bot" src={CloseIcon} />
            </button>
          </div>
        </div>
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
            <div className="typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            value={inputText}
            disabled={typing}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button
            disabled={typing}
            className="paper-btn"
            onClick={handleUserInput}
          >
            <img alt="paper-plan" src={PaperPlan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
