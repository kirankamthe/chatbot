import "./styles.css";
import Avtar from "./../../assets/avtar.svg";

const BotHeader = () => {
  return (
    <div className="chatbot-header">
      <div className="avatars-wrapper">
        <img alt="avtar" className="header-ava" src={Avtar} />
      </div>
      <h2 className="oneline">
        <span>Hi there!</span>
        <img
          src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/72x72/1f44b.png"
          alt="👋"
          className="emoji"
        />
      </h2>
      <div className="offline-message">
        <span className="online">
          <span>We are online</span>
        </span>
      </div>
    </div>
  );
};

export default BotHeader;
