import React from "react";
import "./ProfileScreen.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Card from "../../components/Card/Card";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useNavigate } from "react-router-dom";

function ProfileScreen() {
  const { navigation } = useNavigate();

  const handleAddCar = () => {
    window.location.href = "/car/add";
  };
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-4">
          <ProfileCard />
        </div>
        <div className="col-md-8">
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="mt-3"
          >
            {" "}
            <h2>Profile</h2>
            <button className="medium" onClick={handleAddCar}>
              <ControlPointIcon />
              Add Car
            </button>
          </div>
          <hr />
          <div className="row mb-4 mt-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
