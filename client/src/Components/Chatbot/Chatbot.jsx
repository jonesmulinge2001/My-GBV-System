import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Load chat history from local storage
    const storedMessages = localStorage.getItem("chatHistory");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([{ text: "Hello! How can I assist you regarding GBV?", sender: "bot" }]);
    }
  }, []);

  useEffect(() => {
    // Save chat history to local storage
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Fetch AI response from OpenAI API or any other source
    setTimeout(async () => {
      const botResponse = await fetchAIResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  const fetchAIResponse = async (question) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`, // Replace with your API key
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: question }],
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content || "I'm not sure, but you can visit our Help section for more details.";
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I'm unable to fetch a response right now.";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={toggleChat}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white w-80 h-96 rounded-lg shadow-lg flex flex-col"
        >
          {/* Chat Header */}
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">GBV Chatbot</h2>
            <button onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-gray-200 self-start text-gray-700"
                    : "bg-blue-500 text-white self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 p-2 border rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-3 py-2 ml-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
