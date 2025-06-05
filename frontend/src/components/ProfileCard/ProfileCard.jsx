import React from "react";
import "./ProfileCard.css";
import { DEFAULT_AVATAR } from "../../constants/urls";
import { formatDate } from "../../utils/utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";

function ProfileCard({ user, editable = false }) {
  const handleEditProfile = () => {
    window.location.href = "/profile/edit";
  };

  return (
    <div className="profile-card">
      <div className="avatar-container">
        <img
          src={user?.profile_picture || DEFAULT_AVATAR}
          alt="User Avatar"
          className="image-md"
        />
      </div>
      <div className="profile-content">
        <h2 className="name">{user?.first_name + " " + user?.last_name}</h2>
        <div className="profile-details">
          <div className="detail-item">
            <CalendarMonthIcon className="detail-icon" />
            <span>Joined: {formatDate(user?.created_at, "MMMM dd, yyyy")}</span>
          </div>
          <div className="detail-item">
            <LocationOnIcon className="detail-icon" />
            <span>{user?.location ?? "Not specified"}</span>
          </div>
        </div>
        <div className="button-container">
          {editable && (
            <button className="edit-button" onClick={handleEditProfile}>
              <EditIcon fontSize="small" />
              Edit profile
            </button>
          )}
          <button className="share-button">
            <ShareIcon fontSize="small" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
