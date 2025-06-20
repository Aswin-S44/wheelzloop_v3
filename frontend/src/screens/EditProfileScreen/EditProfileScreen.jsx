import React, { useContext, useEffect, useState } from "react";
import "./EditProfileScreen.css";
import { UserContext } from "../../hooks/UserContext";
import { DEFAULT_AVATAR } from "../../constants/urls";
import Button from "antd/es/button";
import Upload from "antd/es/upload";
import { UploadOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "../../config/api";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

function EditProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    business_name: "",
    location: "",
    address: "",
    has_physical_store: false,
    profile_picture: DEFAULT_AVATAR,
    role: "",
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUserData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async ({ fileList }) => {
    if (fileList.length === 0) return;
    const base64Image = await convertToBase64(fileList[fileList.length - 1]);
    setUserData((prev) => {
      const updatedData = { ...prev, profile_picture: base64Image };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleRemoveImage = () => {
    setUserData((prev) => {
      const updatedData = { ...prev, profile_picture: DEFAULT_AVATAR };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => {
      const updatedData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      setIsEdited(JSON.stringify(updatedData) !== JSON.stringify(user));
      return updatedData;
    });
  };

  const handleDiscardChanges = async () => {
    Swal.fire({
      title: "Do you want to discard your changes?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUserData(user);
        setIsEdited(false);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        setLoading(true);
        await axios.patch(`${UPDATE_PROFILE_URL}/${user._id}`, userData);
        Swal.fire({
          title: "Success!",
          text: "Profile updated",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-edit-container">
      <LoadingOverlay loading={loading} />
      <div className="profile-card">
        <div className="profile-header">
          <h1>Account Settings</h1>
          <p>Manage your profile information</p>
        </div>

        <div className="profile-content">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img
                src={userData.profile_picture}
                alt="Profile"
                className="avatar"
                title="dealer profile image"
              />
              <div className="avatar-actions">
                <Upload
                  listType="picture"
                  multiple={false}
                  beforeUpload={() => false}
                  onChange={handleImageUpload}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} className="upload-btn">
                    Change Photo
                  </Button>
                </Upload>
                <button className="remove-btn" onClick={handleRemoveImage}>
                  Remove
                </button>
              </div>
            </div>
            <div className="avatar-info">
              <h3>
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="account-type">
                {userData.role === "company"
                  ? "Business Account"
                  : "Personal Account"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h2 className="section-title">Personal Details</h2>
              <div className="form-grid">
                <div className="input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Business Information</h2>
              <div className="form-grid">
                <div className="input-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    name="business_name"
                    value={userData.business_name}
                    onChange={handleChange}
                    placeholder="Enter business name"
                  />
                </div>
                <div className="input-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={userData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                  />
                </div>
                <div className="input-group full-width">
                  <label>Business Address</label>
                  <textarea
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    rows="3"
                  />
                </div>
                <div className="input-group checkbox-container">
                  <input
                    type="checkbox"
                    id="has_physical_store"
                    name="has_physical_store"
                    checked={userData.has_physical_store}
                    onChange={handleChange}
                  />
                  <label htmlFor="has_physical_store">
                    We have a physical store
                  </label>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="discard-btn"
                onClick={handleDiscardChanges}
                disabled={!isEdited}
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="save-btn"
                disabled={loading || !isEdited}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfileScreen;
