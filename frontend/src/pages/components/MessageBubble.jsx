import { useEffect, useState } from "react";

export default function MessageBubble({ msg }) {
  const isUser = msg.sender === "user";

  // Show full text immediately
  const [displayedText, setDisplayedText] = useState(msg.text);

  // Media reveal
  const [showMedia, setShowMedia] = useState(false);

  useEffect(() => {
    setDisplayedText(msg.text);

    // fade-in media if present
    if (msg.media) {
      setTimeout(() => setShowMedia(true), 200);
    } else {
      setShowMedia(false);
    }
  }, [msg.text, msg.media]);

  return (
    <div
      className={`max-w-xl px-4 py-3 rounded-xl shadow ${
        isUser
          ? "ml-auto bg-blue-600 text-white"
          : "mr-auto bg-white text-gray-800"
      }`}
    >
      <p className="whitespace-pre-wrap">{displayedText}</p>

      {msg.media && showMedia && (
        <a
          href={msg.media}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 underline text-blue-600 transition-opacity duration-500 opacity-100"
        >
          📄 View Report
        </a>
      )}
    </div>
  );
}
