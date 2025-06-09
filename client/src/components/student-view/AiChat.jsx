import React, { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll chat to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg flex flex-col h-[500px]">
      <h1 className="text-3xl font-semibold text-center mb-6">Learning AI</h1>
      <div className="chat-history flex-grow overflow-y-auto space-y-4 mb-4 border-b border-gray-200 pb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm p-3 rounded-lg max-w-[70%] ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-black self-start'
            }`}
            dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {loading && <div className="text-center text-gray-500 mb-2">Loading...</div>}
      <form onSubmit={sendMessage} className="flex items-center space-x-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message"
          className="flex-1 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-blue-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
