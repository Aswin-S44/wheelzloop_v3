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
  const { navigation } = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  console.log("user---------", user);
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
        console.log("Error while fetching car : ", error);
      }
    };
    fetchCar();
  }, []);

  const handleAddCar = () => {
    window.location.href = "/car/add";
  };
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-4">
          <ProfileCard user={user} />
        </div>
        <div className="col-md-8">
          <Tabs>
            <TabList>
              <Tab>Dashboard</Tab>
              <Tab>My Cars</Tab>
            </TabList>

            <TabPanel>
              <Dashboard />
            </TabPanel>
            <TabPanel>
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
                {loading ? (
                  <>
                    <Loader />
                  </>
                ) : cars.length == 0 ? (
                  <>No cars available</>
                ) : (
                  cars?.map((car, index) => <Card car={car} editable={true} />)
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
