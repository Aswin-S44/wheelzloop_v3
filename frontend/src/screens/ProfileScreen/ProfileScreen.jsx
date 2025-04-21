import React, { useContext, useEffect, useState } from "react";
import "./ProfileScreen.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Card from "../../components/Card/Card";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GET_DEALER_CAR_URL } from "../../config/api";
import Loader from "../../components/Loader/Loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import { UserContext } from "../../hooks/UserContext";

function ProfileScreen() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await axios.get(GET_DEALER_CAR_URL, {
          withCredentials: true,
        });
        setLoading(false);
        if (res && res.data) {
          setCars(res.data);
        }
      } catch (error) {
        return error;
      }
    };
    fetchCar();
  }, []);

  const handleAddCar = () => {
    navigate("/car/add");
  };

  return (
    <div className="profile-screen-container">
      <div className="profile-layout">
        <div className="profile-sidebar">
          <ProfileCard user={user} editable={true} />
        </div>
        <div className="profile-content">
          <Tabs>
            <TabList>
              <Tab>Dashboard</Tab>
              <Tab>My Cars</Tab>
            </TabList>

            <TabPanel>
              <Dashboard />
            </TabPanel>
            <TabPanel>
              <div className="cars-header">
                <h2>My Vehicles</h2>
                <button className="add-car-btn" onClick={handleAddCar}>
                  <ControlPointIcon />
                  Add Car
                </button>
              </div>
              <div className="cars-grid">
                {loading ? (
                  <Loader />
                ) : cars.length === 0 ? (
                  <div className="no-cars">No cars available</div>
                ) : (
                  cars?.map((car, index) => (
                    <Card
                      key={index}
                      car={car}
                      editable={true}
                      category={"Latest"}
                    />
                  ))
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
