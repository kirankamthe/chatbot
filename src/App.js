import "./App.css";
import React, { useState } from "react";
import ChatBot from "./components/ChatBot";
import CloseIcon from "./assets/close.svg";
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
      <button className="chat-bot" onClick={handleBotClick}>
        <img
          alt="chat-bot"
          src={chatOpen ? CloseIcon : OpenIcon}
          className={chatOpen ? "closed" : "opened"}
        />
      </button>
      <ChatBot chatOpen={chatOpen} />
    </div>
  );
};

export default App;
