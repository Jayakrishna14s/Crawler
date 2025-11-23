import ChatWindow from "./components/ChatWindow";

export default function Chat() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="p-4 shadow bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Crawler - Chat</h1>
      </div>

      <ChatWindow />
    </div>
  );
}
