import { useState } from "react";

export default function InputBar({ onSend, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || loading) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 bg-white flex items-center gap-3 shadow-inner">
      <input
        type="text"
        placeholder={loading ? "Processing..." : "Ask anything..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        disabled={loading}
        className={`flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      />

      {/* Mic button */}
      <button
        className={`p-3 rounded-full bg-gray-200 hover:bg-gray-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <img src="/mic.svg" alt="mic" className="w-6 h-6" />
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-white ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
