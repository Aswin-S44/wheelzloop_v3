import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import "./ProfileCard.css";
import { DEFAULT_AVATAR } from "../../constants/urls";

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="avatar-container">
        <img src={DEFAULT_AVATAR} alt="User Avatar" className="avatar" />
      </div>
      <div className="name">John Doe</div>
      <div className="date">Joined: January 1, 2023</div>
      <div className="location">New York, USA</div>
      <div className="button-container">
        <button className="button-transparent">Edit profile</button>
        <button className="medium">Share Profile</button>
      </div>
    </div>
  );
}

export default ProfileCard;
