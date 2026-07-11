import { FaTrash } from "react-icons/fa";
import { useState } from "react";
function ChatWindow({ selectedUser, sendMessage, deleteMessage }) {
  const [message, setMessage] = useState("");
  function handleSend() {
    sendMessage(message);
    setMessage("");
  }
  return (
    <div className="flex-1 flex flex-col border-l">
      <div className="p-4 border-b">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-semibold">{selectedUser.name}</h2>

            <p
              className={`text-sm ${
                selectedUser.online ? "text-green-600" : "text-gray-500"
              }`}
            >
              {selectedUser.status}
            </p>
          </>
        ) : (
          <h2 className="text-xl font-semibold">Select a User</h2>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 w-full">
          {selectedUser ? (
            selectedUser.messages.map((message) => (
              <div key={message.id} className="mb-3">
                <div
                  className={
                    message.sender === "Me"
                      ? "flex justify-end items-center gap-2"
                      : "flex justify-start items-center gap-2"
                  }
                >
                  {message.sender === "Me" && (
  <button
    onClick={() => {
      if (window.confirm("Delete this message?")) {
        deleteMessage(message.id);
      }
    }}
    className="ml-2 text-gray-500 hover:text-red-500 transition"
  >
    <FaTrash />
  </button>
  
)}
                  <div
                    className={`inline-block max-w-xs break-words px-4 py-2 rounded-lg ${
                      message.sender === "Me"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <p>{message.text}</p>

                    <p className="text-xs mt-1 opacity-70 text-right">
                      {message.time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              Select a user to start chatting.
            </p>
          )}
        </div>
      </div>

      <div className="p-4 border-t flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Send a message..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
