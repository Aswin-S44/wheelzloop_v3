import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import "./ChatHeader.css";
import { DEFAULT_AVATAR } from "../../constants/urls";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <div className="chat-header-avatar">
          <img
            src={selectedUser.profilePic || `${DEFAULT_AVATAR}`}
            alt={selectedUser.username}
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="online-indicator" />
          )}
        </div>
        <div className="chat-header-info">
          <h3 className="user-name">{selectedUser.username}</h3>
          <p className="user-status">
            {onlineUsers.includes(selectedUser._id) ? (
              <span className="online">Online</span>
            ) : (
              <span className="offline">Offline</span>
            )}
          </p>
        </div>
      </div>
      <button
        className="chat-header-close"
        onClick={() => setSelectedUser(null)}
        aria-label="Close chat"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
