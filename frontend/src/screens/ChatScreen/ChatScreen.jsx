import React from "react";
import "./ChatScreen.css";
import { useChatStore } from "../../store/useChatStore";
import Sidebar from "../../components/Chats/Sidebar";
import NoChatSelected from "../../components/Chats/NoChatSelected";
import ChatContainer from "../../components/Chats/ChatContainer";

function ChatScreen() {
  const { selectedUser } = useChatStore();

  return (
    <div className="chat-screen mt-3">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="chat-content">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
}

export default ChatScreen;
