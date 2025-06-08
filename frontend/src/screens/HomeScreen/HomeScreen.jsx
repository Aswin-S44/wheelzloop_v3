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
// import Banner from "../../components/Banner/Banner";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { carBodyTypes } from "../../dummyData/bodyTypes";
import CategoryCars from "../../components/CategoryCars/CategoryCars";
import Banner2 from "../../components/Banner2/Banner2";

import CarCategoriesSection from "../../components/CarCategoriesSection/CarCategoriesSection";
import AdvSection from "../../sections/AdvSection/AdvSection";

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

  const tabListRef = useRef(null);

  const scrollTabs = (direction) => {
    if (tabListRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      tabListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
        {/* <Banner /> */}
        <Banner2 />
      </div>
      <div className="mt-5">
        <h3 className="text-center fw-bold">
          <span className="quality-text">
            Choose by Category
            <svg
              width="120"
              height="12"
              viewBox="0 0 120 12"
              className="curved-line"
            >
              <path
                d="M0,6 Q60,12 120,6"
                stroke="#FFD700"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>{" "}
        </h3>
        <CarCategoriesSection />
      </div>
      <div className="container">
        {/* <TitleHeader
          title1={"Why Choose"}
          title2={"Us"}
          showOption={true}
          option={null}
        /> */}
        <FeaturesSection />
      </div>

      <div>
        <div className="mt-4">
          <div>
            <div className="">
              <h3 className="text-center fw-bold">
                <span className="quality-text">
                  Latest Cars
                  <svg
                    width="120"
                    height="12"
                    viewBox="0 0 120 12"
                    className="curved-line"
                  >
                    <path
                      d="M0,6 Q60,12 120,6"
                      stroke="#FFD700"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>{" "}
              </h3>
              <div className="mt-4">
                {loading ? (
                  <Loader />
                ) : cars.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="cards-grid">
                    {cars?.slice(0, 8).map((car, index) => (
                      <Card
                        car={car}
                        editable={false}
                        key={index}
                        category={"Latest"}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">{/* <AdvSection /> */}</div>
      <div className="container mt-5">
        <div className="profile-content">
          <TitleHeader
            title1={"Cars by "}
            title2={"Category"}
            option={"View all"}
            optionLink={`/used-cars?.category=sedan`}
          />

          {/* <Tabs>
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
          </Tabs> */}
          <div className="tabs-container">
            <Tabs>
              <div className="tab-scroll-wrapper">
                <button
                  className="tab-scroll-button left"
                  onClick={() => scrollTabs("left")}
                  aria-label="Scroll tabs left"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <TabList ref={tabListRef}>
                  {carBodyTypes?.slice(0, 3).map((type, index) => (
                    <Tab key={index}>{type.text}</Tab>
                  ))}
                </TabList>

                <button
                  className="tab-scroll-button right"
                  onClick={() => scrollTabs("right")}
                  aria-label="Scroll tabs right"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {carBodyTypes?.slice(0, 4).map((type, index) => (
                <TabPanel key={index}>
                  <CategoryCars category={type.value} />
                </TabPanel>
              ))}
            </Tabs>
          </div>
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
