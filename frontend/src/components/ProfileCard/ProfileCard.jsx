import React from "react";
import "./ProfileCard.css";
import { DEFAULT_AVATAR } from "../../constants/urls";
import { formatDate } from "../../utils/utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
          className="avatar-2"
        />
      </div>
      <div className="name">{user?.first_name + " " + user?.last_name}</div>
      <div className="date">
        <CalendarMonthIcon />
        Joined: {formatDate(user?.created_at, "MMMM dd, yyyy")}
      </div>
      <div className="location">
        <LocationOnIcon />
        {user?.location ?? "_"}
      </div>
      <div className="button-container">
        {editable && (
          <button className="button-transparent" onClick={handleEditProfile}>
            Edit profile
          </button>
        )}
        <button className="medium">Share Profile</button>
      </div>
    </div>
  );
}

export default ProfileCard;
