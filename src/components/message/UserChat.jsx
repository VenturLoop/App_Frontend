import React, { useState } from "react";

const UserChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, what's up how are you?",
      sender: "other",
      time: "11:45am",
    },
    { id: 2, text: "I'm Fine WBU?", sender: "me", time: "11:45am" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now(),
        text: input,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Chat Window */}
      <div className="flex flex-col flex-grow overflow-auto space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs p-3 rounded-lg ${
              msg.sender === "me"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            <p>{msg.text}</p>
            <span className="block text-xs text-gray-200 text-right mt-1">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center mt-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;
