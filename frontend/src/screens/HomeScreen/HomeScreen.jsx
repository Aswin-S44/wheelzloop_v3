import React, { useEffect, useRef, useState } from "react";
import "./HomeScreen.css";
import TitleHeader from "../../components/TitleHeader/TitleHeader";
import Card from "../../components/Card/Card";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import HowItWorks from "../../sections/HowItWorks/HowItWorks";
import NewsAndResources from "../../sections/NewsAndResources/NewsAndResources";
import FAQSection from "../../sections/FAQ/FAQ";
import Counter from "../../components/Counter/Counter";
import FeaturesSection from "../../sections/FeaturesSection/FeaturesSection";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";
import { GET_ALL_CARS } from "../../config/api";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import Banner from "../../components/Banner/Banner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { carBodyTypes } from "../../dummyData/bodyTypes";
import CategoryCars from "../../components/CategoryCars/CategoryCars";

const images = [
  "https://t3.ftcdn.net/jpg/07/48/59/38/360_F_748593837_mWVU6MyzgP9yeAdDJW6UkReK7GGGTSbH.jpg",
  "https://i.pinimg.com/736x/be/83/60/be83607be6a98648c47b8563b8b7edca.jpg",
];

const tabs = {
  SEDAN: "sedan",
  SUV: "suv",
  HATCHBACK: "hatchback",
};

function HomeScreen() {
  const sliderRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentTab = carBodyTypes.find((tab) => tab.index == 2);
  const [selectedTab, setSelectedTab] = useState(currentTab);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${GET_ALL_CARS}`);
        if (res && res.data?.data?.length > 0) {
          setCars(res.data.data);
        }
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="screens">
      <div className="">
        {/* <Carousel images={images} /> */}
        <Banner />
      </div>
      <div className="container">
        <TitleHeader
          title1={"Why Choose"}
          title2={"Us"}
          showOption={true}
          option={null}
        />
        <FeaturesSection />
      </div>

      <div className="container-fluid mw-90">
        <div className="mt-4">
          <TitleHeader
            title1={"Latest"}
            title2={"Cars"}
            option={"View all"}
            optionLink={`/used-cars?.category=latest`}
          />
          <div className="slider-container">
            <IconButton
              className="arrow-button left"
              onClick={scrollLeft}
              aria-label="left-scroll-btn"
            >
              <ChevronLeft />
            </IconButton>
            <div className="card-slider" ref={sliderRef}>
              <div className="card-container">
                {loading ? (
                  <Loader />
                ) : cars.length == 0 ? (
                  <EmptyState />
                ) : (
                  cars?.map((car, index) => (
                    <Card
                      car={car}
                      editable={false}
                      key={index}
                      category={"Latest"}
                    />
                  ))
                )}
              </div>
            </div>
            <IconButton
              className="arrow-button right"
              onClick={scrollRight}
              aria-label="right-scroll-btn"
            >
              <ChevronRight />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="container-fluid mw-90 mt-5">
        <div className="profile-content">
          <TitleHeader
            title1={"Cars by "}
            title2={"Category"}
            option={"View all"}
            optionLink={`/used-cars?.category=sedan`}
          />

          <Tabs>
            <div>
              <TabList>
                {carBodyTypes?.slice(0, 4).map((type, index) => (
                  <Tab key={index}>{type.text}</Tab>
                ))}
              </TabList>
            </div>

            {carBodyTypes?.slice(0, 4).map((type, index) => (
              <TabPanel key={index}>
                <CategoryCars category={type.value} />
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
      <div className="mt-0">
        <HowItWorks />
        <div className="mt-0">
          <NewsAndResources />
        </div>
        <div className="mt-0">
          <Counter />
        </div>
        <div className="mt-0">
          <FAQSection />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
