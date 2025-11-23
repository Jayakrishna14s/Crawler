import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";
import LoadingDots from "./LoadingDots";
import { sendMessage } from "../../../services/api";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto scroll when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // const handleSend = async (text) => {
  //   const userMsg = { sender: "user", text };
  //   setMessages((prev) => [...prev, userMsg]);

  //   setLoading(true);

  //   try {
  //     const res = await sendMessage(text);

  //     const botMsg = {
  //       sender: "bot",
  //       text: res.data.reply,
  //       media: res.data.media, // For PDFs, reports, links
  //       mediaType: res.data.type, // "pdf", "url", etc.
  //     };

  //     // const botMsg = {
  //     //   sender: "bot",
  //     //   text: "Yo Jayakrishna, Hii",
  //     //   media: "/test.pdf",
  //     // };

  //     setMessages((prev) => [...prev, botMsg]);
  //   } catch (e) {
  //     console.error(e);

  //     const errorMsg = {
  //       sender: "bot",
  //       text: "⚠️ Something went wrong while processing your request.\nPlease try again.",
  //     };

  //     setMessages((prev) => [...prev, errorMsg]);
  //   }

  //   setLoading(false);
  // };

  const handleSend = async (text) => {
    const userMsg = { sender: "user", text };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Convert React messages → LLM format
      const historyPayload = updatedMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "bot",
        content: m.text,
      }));

      const res = await sendMessage(text, historyPayload);

      const botMsg = {
        sender: "bot",
        text: res.data.reply,
        media: res.data.media || null,
      };

      setMessages([...updatedMessages, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Chat scroll area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} msg={msg} />
        ))}

        {loading && <LoadingDots />}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <InputBar onSend={handleSend} loading={loading} />
    </div>
  );
}
