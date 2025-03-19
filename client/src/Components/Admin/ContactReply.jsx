import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ContactReply = () => {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [responseText, setResponseText] = useState("");

  // Fetch messages from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/contact/messages")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  // Handle Reply Submission
  const handleReply = (id) => {
    if (!responseText.trim()) return;
    axios
      .post(`http://localhost:5000/contact/respond/${id}`, { response: responseText })
      .then(() => {
        setMessages(messages.map(msg => 
          msg.id === id ? { ...msg, response: responseText } : msg
        ));
        setReplyingTo(null);
        setResponseText("");
      })
      .catch((err) => console.error("Error sending response:", err));
  };

  // Handle Message Deletion
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    axios
      .delete(`http://localhost:5000/contact/delete/${id}`)
      .then(() => {
        setMessages(messages.filter(msg => msg.id !== id));
      })
      .catch((err) => console.error("Error deleting message:", err));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-7xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User contact messages</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition overflow-hidden flex flex-col"
              style={{ height: "250px" }} // Ensuring consistent height
            >
              <h3 className="text-md font-semibold text-gray-800 truncate">{msg.fullName}</h3>
              <p className="text-xs text-gray-500 truncate">{msg.email}</p>

              <div className="mt-2 flex-grow overflow-y-auto max-h-[80px]">
                <p className="text-gray-700 text-sm break-words">{msg.message}</p>
              </div>

              {msg.response && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-green-600 font-medium text-sm truncate mt-2"
                >
                  Response: {msg.response}
                </motion.p>
              )}

              {replyingTo === msg.id && (
                <motion.textarea
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full p-1 border rounded-lg focus:ring focus:ring-blue-300 text-sm mt-3"
                  rows="2"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Write a reply..."
                ></motion.textarea>
              )}

              <div className="mt-auto flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setReplyingTo(msg.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-xs"
                >
                  Reply
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(msg.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-xs"
                >
                  Delete
                </motion.button>

                {replyingTo === msg.id && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReply(msg.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-xs"
                  >
                    Send
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactReply;
