import React, { useState } from "react";
import "../components/AIChatBox.css"
import axios from "axios";

function AIChatBox({ tasks }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = {
    type: "user",
    text: input,
  };

  setMessages((prev) => [...prev, userMessage]);

  try {
    const res = await axios.post("http://localhost:5000/api/ai/chat", {
      message: input,
      tasks: tasks
    });

    const data = res.data.reply;

    const aiMessage = {
      type: "ai",
      text: data,
    };

    setMessages((prev) => [...prev, aiMessage]);
    console.log("AI received tasks:", tasks);

  } catch (error) {
    console.log(error);
  }

  setInput("");
};

  return (
    
<div className="container">
  <h3>AI Assistant</h3>

  <div className="chatBox">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`message ${msg.type === "user" ? "user" : "ai"}`}
      >
        {msg.text}
      </div>
    ))}
  </div>

  <div className="inputContainer">  
    <input
      type="text"
      placeholder="Ask AI to manage your tasks..."
      value={input}
        onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()} 
      className="input"
    />
    <button onClick={handleSend} className="button">
      Send
    </button>
  </div>
</div>
  );
}


export default AIChatBox;

