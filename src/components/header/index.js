import "./styles.css";
import Avtar from "./../../assets/avtar.svg";
import CloseIcon from "./../../assets/close.svg";

const BotHeader = ({ handleBotClick }) => {
  return (
    <div className="chatbot-header">
      <div className="avatars-wrapper">
        <img alt="avtar" className="header-ava" src={Avtar} />
      </div>
      <h2>CBSI Chat</h2>
      <button className="chat-bot-close" onClick={handleBotClick}>
        <img alt="chat-bot" src={CloseIcon} />
      </button>
    </div>
  );
};

export default BotHeader;
