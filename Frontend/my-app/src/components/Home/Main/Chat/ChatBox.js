import React, { useState, useEffect } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import './Chatbox.css';
import axios from 'axios';
import io from "socket.io-client";

const socket = io('http://localhost:5000');

const ChatBox = ({ user, onClose }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const token = localStorage.getItem('tokenurl');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:5000/message/${user.chatId}`, config);
        setChatMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    if (user) {
      fetchChatMessages();
    }

    // Socket.io event listeners
    socket.on('message', (message) => {
      setChatMessages((prevChatMessages) => [...prevChatMessages, message]);
    });

    return () => {
      // Cleanup socket connection on component unmount
      socket.off('message');
    };
  }, [user]);


  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('tokenurl');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const chatResponse = await axios.post(
        'http://localhost:5000/chat/',
        {
          userId: user._id,
        },
        config
      );

      const messageResponse = await axios.post(
        'http://localhost:5000/message/',
        {
          content: newMessage,
          chatId: chatResponse.data._id,
        },
        config
      );

      // Emit the message to the server
      socket.emit('message', messageResponse.data);

      setNewMessage('');
      setChatMessages((prevChatMessages) => [...prevChatMessages, messageResponse.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="chat-box">
      <button className="btn btn-back" onClick={onClose}>
        <BsArrowLeft size={20} />
      </button>
      <span className="chat-header">Chat with {user.username}</span>
      <br />
      <br />

      {chatMessages && (
  <div className="chat-messages">
    {chatMessages.map((msg, index) => {

      return (
        <div key={index} className={msg.sender._id === 'You' ? 'sent' : 'received'}>
          <strong>{msg.sender.name}:</strong> {msg.content}
        </div>
      );
    })}
  </div>
)}

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={typingHandler}
        />
        <button className="btn btn-send btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
