import React from "react";
import { MessageSquare } from "lucide-react";

const ChatAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Chat Analysis</h1>
          <p className="text-gray-600">
            Analyze and visualize chat data for your client here.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Search messages or users..."
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-400"
              aria-label="Search messages or users"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                iconColor: "text-blue-500",
                label: "Total Messages",
                value: "1,245",
              },
              {
                iconColor: "text-green-500",
                label: "Active Users",
                value: "87",
              },
              {
                iconColor: "text-purple-500",
                label: "Average Response Time",
                value: "3.2s",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center text-center"
              >
                <MessageSquare className={`h-10 w-10 ${item.iconColor}`} />
                <h2 className="text-xl font-semibold mt-2">{item.label}</h2>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Recent Chats</h2>
          {[
            {
              user: "John Doe",
              message: "Can we schedule a call for tomorrow?",
              time: "2 hours ago",
            },
            {
              user: "Jane Smith",
              message: "Thank you for your quick response!",
              time: "5 hours ago",
            },
          ].map((chat, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold">User: {chat.user}</p>
                <p className="text-sm text-gray-600">"{chat.message}"</p>
              </div>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatAnalysisPage;
