import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000";

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("message", (msg: string) => {
      setMessages((messages) => [...messages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const socket = io(SOCKET_SERVER_URL);
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={submitMessage}>
        <input
          id="m"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Chat;
