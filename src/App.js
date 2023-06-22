import "./App.css";
import React, { useState } from "react";
import ChatBot from "./components/chatBot/index";
import OpenIcon from "./assets/chat-bot.svg";

const App = () => {
  const [chatOpen, setChatOpen] = useState("");

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
      {!chatOpen && (
        <button className="chat-bot" onClick={handleBotClick}>
          <img alt="chat-bot" src={OpenIcon} className="opened" />
        </button>
      )}
      <ChatBot chatOpen={chatOpen} handleBotClick={handleBotClick} />
    </div>
  );
};

export default App;
