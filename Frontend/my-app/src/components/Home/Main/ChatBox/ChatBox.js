import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import './Chatbox.css';


const ChatBox = ({ user, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSendMessage = () => {
    //  logic for sending messages
    setChatMessages([...chatMessages, { sender: 'You', text: message }]);
    setMessage('');
  };

  return (
    <div className="chat-box">
      <button className="btn btn-back" onClick={onClose}>
        <BsArrowLeft size={20} />
      </button>
      <span className='chat-header'>Chat with {user}</span>
      <br/>
      <br/>
      
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <div key={index} className={msg.sender === 'You' ? 'sent' : 'received'}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-send" onClick={handleSendMessage}>
          {/* Send */}
          <i className="uil uil-message"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;