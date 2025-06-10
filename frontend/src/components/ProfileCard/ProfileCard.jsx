import React from "react";
import "./ProfileCard.css";
import { DEFAULT_AVATAR } from "../../constants/urls";
import { formatDate } from "../../utils/utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import VerifiedIcon from "@mui/icons-material/Verified";
import { ToastContainer, toast } from "react-toastify";

function ProfileCard({ user, editable = false }) {
  const handleEditProfile = () => {
    window.location.href = "/profile/edit";
  };

  const handleShareProfile = async () => {
    if (user) {
      const currentUrl = window.location.href + "/" + user._id;
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy link.");
        });
    }
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <h2 className="name">{user?.first_name + " " + user?.last_name}</h2>
          {user && user?.subscribed && (
            <div className="tooltip-container">
              <VerifiedIcon className="verified-icon" />
              <span className="tooltip-text">Verified</span>
            </div>
          )}
        </div>

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
          <button className="share-button" onClick={handleShareProfile}>
            <ShareIcon fontSize="small" />
            Share
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfileCard;
