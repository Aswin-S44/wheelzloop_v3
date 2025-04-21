import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import "./ChatHeader.css";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <div className="chat-header-avatar">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
          />
        </div>
        <div className="chat-header-info">
          <h3>{selectedUser.fullName}</h3>
          <p>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
        </div>
      </div>
      <button
        className="chat-header-close"
        onClick={() => setSelectedUser(null)}
      >
        <X />
      </button>
    </div>
  );
};

export default ChatHeader;
