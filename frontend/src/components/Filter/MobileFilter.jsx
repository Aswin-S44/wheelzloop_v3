import React, { useEffect, useRef, useState } from "react";
import "./MobileFilter.css";
import { brands } from "../../dummyData/brands";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { years } from "../../dummyData/year";
import { fuelTypes } from "../../dummyData/fuelTypes";
import { ownerShip } from "../../dummyData/ownerShip";
import { carFeatures } from "../../dummyData/carFeatures";
import { carBodyTypes } from "../../dummyData/bodyTypes";
import { transmissionTypes } from "../../dummyData/transmissionTypes";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

function MobileFilter({ onFilterChange }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const [search, setSearch] = useState("");
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedOwnership, setSelectedOwnership] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    []
  );
  const [activeIndex, setActiveIndex] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    // Get the height of your app's header
    const appHeader = document.querySelector(".header"); // Replace with your app's header class or ID
    if (appHeader) {
      setHeaderHeight(appHeader.offsetHeight);
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (selectedArray, setSelectedArray, value) => {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter((item) => item !== value));
    } else {
      setSelectedArray([...selectedArray, value]);
    }
  };

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const applyFilters = () => {
    const filters = {
      brands: selectedCars.map((item) => item.brand),
      year: selectedYear ? `${selectedYear} & ${selectedYear}` : null,
      fuelTypes: selectedFuelTypes.length > 0 ? selectedFuelTypes : null,
      ownership: selectedOwnership.length > 0 ? selectedOwnership : null,
      bodyTypes: selectedBodyTypes.length > 0 ? selectedBodyTypes : null,
      transmissionTypes:
        selectedTransmissionTypes.length > 0 ? selectedTransmissionTypes : null,
    };

    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null)
    );

    onFilterChange(validFilters);
    setIsFilterVisible(false);
  };

  const clearFilters = () => {
    setSelectedCars([]);
    setSelectedYear(null);
    setSelectedFuelTypes([]);
    setSelectedOwnership([]);
    setSelectedFeatures([]);
    setSelectedBodyTypes([]);
    setSelectedTransmissionTypes([]);
    onFilterChange({});
  };

  const filteredBrands = brands.filter((brand) => {
    return (
      brand.brand.toLowerCase().includes(search.toLowerCase()) ||
      brand.cars.some((car) => car.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div>
      <button
        className="mobile-filter-toggle"
        onClick={() => setIsFilterVisible(true)}
        aria-label="Search for used cars"
      >
        Filters
        <TuneIcon />
      </button>

      {isFilterVisible && (
        <div
          className="mobile-filter-overlay"
          style={{ top: `${headerHeight}px` }}
        >
          <div className="mobile-filter-container">
            <div className="mobile-filter-header">
              <h2>Filters</h2>
              <button
                onClick={() => setIsFilterVisible(false)}
                aria-label="Search for used cars"
              >
                <CloseIcon style={{ fontSize: "21px" }} />
              </button>
            </div>

            <div className="mobile-filter-content">
              <input
                type="text"
                placeholder="Search brand or car"
                value={search}
                onChange={handleSearch}
                className="search-box"
              />

              <div className="mobile-filter-section">
                <h4>Top brands</h4>
                <div className="scrollable-brands">
                  {filteredBrands.map((brandItem, index) => (
                    <div key={index} className="accordion">
                      <div
                        className="accordion-header"
                        onClick={() => handleAccordionToggle(index)}
                      >
                        <h3>{brandItem.brand}</h3>
                        <span>
                          {activeIndex === index ? (
                            <RemoveCircleOutlineIcon
                              style={{ fontSize: "28px" }}
                            />
                          ) : (
                            <KeyboardArrowDownIcon
                              style={{ fontSize: "28px" }}
                            />
                          )}
                        </span>
                      </div>
                      {activeIndex === index && (
                        <div className="accordion-body">
                          {brandItem.cars.map((car, idx) => (
                            <div key={idx} className="checkbox-container">
                              <input
                                type="checkbox"
                                id={`${brandItem.brand}-${car}`}
                                checked={selectedCars.some(
                                  (item) =>
                                    item.brand === brandItem.brand &&
                                    item.car === car
                                )}
                                onChange={() =>
                                  handleCheckboxChange(
                                    selectedCars,
                                    setSelectedCars,
                                    {
                                      brand: brandItem.brand,
                                      car,
                                    }
                                  )
                                }
                              />
                              <label htmlFor={`${brandItem.brand}-${car}`}>
                                {car}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mobile-filter-section">
                <h4>Years</h4>
                {years.map((year, index) => (
                  <div key={index} className="checkbox-container">
                    <input
                      type="radio"
                      name="year"
                      checked={selectedYear === year.text}
                      onChange={() => setSelectedYear(year.text)}
                    />
                    <label>{year.text}</label>
                  </div>
                ))}
              </div>

              <div className="mobile-filter-section">
                <h4>Fuel Types</h4>
                {fuelTypes.map((fuel, index) => (
                  <div key={index} className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedFuelTypes.includes(fuel.text)}
                      onChange={() =>
                        handleCheckboxChange(
                          selectedFuelTypes,
                          setSelectedFuelTypes,
                          fuel.text
                        )
                      }
                    />
                    <label>{fuel.text}</label>
                  </div>
                ))}
              </div>

              <div className="mobile-filter-section">
                <h4>Ownership</h4>
                {ownerShip.map((ownership, index) => (
                  <div key={index} className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedOwnership.includes(ownership.text)}
                      onChange={() =>
                        handleCheckboxChange(
                          selectedOwnership,
                          setSelectedOwnership,
                          ownership.text
                        )
                      }
                    />
                    <label>{ownership.text}</label>
                  </div>
                ))}
              </div>

              <div className="mobile-filter-section">
                <h4>Features</h4>
                {carFeatures.map((feature, index) => (
                  <div key={index} className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature.text)}
                      onChange={() =>
                        handleCheckboxChange(
                          selectedFeatures,
                          setSelectedFeatures,
                          feature.text
                        )
                      }
                    />
                    <label>{feature.text}</label>
                  </div>
                ))}
              </div>

              <div className="mobile-filter-section">
                <h4>Body Types</h4>
                {carBodyTypes.map((bodyType, index) => (
                  <div key={index} className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={selectedBodyTypes.includes(bodyType.text)}
                      onChange={() =>
                        handleCheckboxChange(
                          selectedBodyTypes,
                          setSelectedBodyTypes,
                          bodyType.text
                        )
                      }
                    />
                    <label>{bodyType.text}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mobile-filter-footer">
              <button
                className="clear-filter-btn"
                onClick={clearFilters}
                aria-label="Search for used cars"
              >
                Clear
              </button>
              <button
                className="apply-filter-btn"
                onClick={applyFilters}
                aria-label="Search for used cars"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileFilter;
