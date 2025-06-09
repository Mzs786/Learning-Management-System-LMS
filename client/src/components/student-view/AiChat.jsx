import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) return;

    const userMessage = { role: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input }),
      });
      const data = await response.json();
      setMessages([...messages, userMessage, { role: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto h-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-semibold text-center mb-6">Learning AI</h1>
    <div className="chat-history space-y-4 mb-4 h-96 overflow-y-auto border-b border-gray-200 pb-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`text-sm wd-50 p-3 rounded-lg ${
            msg.role === 'user'
              ? 'bg-blue-500 w-auto text-white self-end'
              : 'bg-gray-200 text-black self-start w-auto'
          }`}
          dangerouslySetInnerHTML={{
            __html: msg.text.replace(/\n/g, '<br />'),
          }} // Adds line breaks from \n
        />
      ))}
    </div>
    {loading && <div className="text-center text-gray-500">Loading...</div>}
    <form onSubmit={sendMessage} className="flex items-center space-x-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your message"
        className="flex-1 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mb-0"
      >
        Send
      </button>
    </form>
  </div>
  
  );
}

export default Chatbot;