import { useState, useEffect, useRef } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearChat } from "../app/features/chatSlice";
import { format } from "date-fns";

import { dummyChats } from "../assets/assets";

const ChatBox = () => {
  const { listing } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  // Dummy logged-in user
  const user = { id: "user_2" };

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);

  // Load dummy chat
 useEffect(() => {
    const data = dummyChats[0];

    if (data) {
        setChat(data);
        setMessages(data.messages || []);
    }

    setIsLoading(false);
}, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    setIsSending(true);

    const newMsg = {
      id: Date.now(),
      sender_id: user.id,
      message: newMessage,
      createdAt: new Date(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");
      setIsSending(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 sm:p-4">
      <div className="bg-white w-full max-w-2xl h-screen sm:h-[600px] flex flex-col sm:rounded-lg shadow-2xl">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 flex justify-between items-center sm:rounded-t-lg">
          <div>
            <h3 className="font-semibold text-lg">
              {listing?.title || "Chat"}
            </h3>
            <p className="text-sm text-indigo-100">
              {user.id === listing?.ownerId
                ? `Chatting with buyer (${chat?.chatUser?.name || "..."})`
                : `Chatting with seller (${chat?.ownerUser?.name || "..."})`}
            </p>
          </div>

          <button
            onClick={() => dispatch(clearChat())}
            className="p-2 hover:bg-white/20 rounded-lg"
          >
            <X />
          </button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin text-indigo-600" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500">
              No messages yet
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender_id === user.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender_id === user.id
                      ? "bg-indigo-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-[10px] mt-1 opacity-70">
                    {format(new Date(msg.createdAt), "MMM dd, h:mm a")}
                  </p>
                </div>
              </div>
            ))
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        {chat?.listing?.status === "active" ? (
          <form
            onSubmit={handleSend}
            className="p-4 border-t flex gap-2"
          >
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type message..."
              className="flex-1 border rounded-lg px-3 py-2 resize-none focus:outline-indigo-500"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />

            <button
              type="submit"
              disabled={!newMessage.trim() || isSending}
              className="bg-indigo-600 text-white px-4 rounded-lg disabled:opacity-50"
            >
              {isSending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send />
              )}
            </button>
          </form>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Listing is {chat?.listing?.status}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;