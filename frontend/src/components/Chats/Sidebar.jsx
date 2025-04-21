import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import './Sidebar.css'

const Sidebar = ({ onClose }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="header-content">
          <Users className="icon" />
          <span className="title">Contacts</span>
          <button onClick={onClose} className="mobile-close-btn">
            ✕
          </button>
        </div>
        <div className="online-filter">
          <label className="filter-label">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="filter-checkbox"
            />
            <span>Show online only</span>
          </label>
          <span className="online-count">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="user-list">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`user-item ${
              selectedUser?._id === user._id ? "active" : ""
            }`}
          >
            <div className="avatar-container">
              <img
                src={user.profileImage || "/avatar.png"}
                alt={user.name}
                className="avatar"
              />
              {onlineUsers.includes(user._id) && (
                <span className="online-badge" />
              )}
            </div>
            <div className="user-info">
              <div className="user-name">{user.fullName}</div>
              <div className="user-status">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="empty-state">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
