import React, { useState } from "react";
import "./Filter.css";
import { brands } from "../../dummyData/brands";
import { years } from "../../dummyData/year";
import { fuelTypes } from "../../dummyData/fuelTypes";
import { ownerShip } from "../../dummyData/ownerShip";
import { carFeatures } from "../../dummyData/carFeatures";
import { carBodyTypes } from "../../dummyData/bodyTypes";
import { transmissionTypes } from "../../dummyData/transmissionTypes";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

function Filter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSearch = (e) => setSearch(e.target.value);

  const toggleFilter = () => setIsOpen(!isOpen);

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
      brands:
        selectedCars.length > 0
          ? selectedCars.map((item) => item.brand)
          : undefined,
      car_name:
        selectedCars.length > 0
          ? selectedCars.map((item) => item.car)
          : undefined,
      year: selectedYear ? String(selectedYear) : undefined,
      fuel_type: selectedFuelTypes.length > 0 ? selectedFuelTypes : undefined,
      ownership: selectedOwnership.length > 0 ? selectedOwnership : undefined,
      body_type: selectedBodyTypes.length > 0 ? selectedBodyTypes : undefined,
      transmission:
        selectedTransmissionTypes.length > 0
          ? selectedTransmissionTypes
          : undefined,
      features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
    };

    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined)
    );
    onFilterChange(validFilters);
    setIsOpen(false);
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
    <>
      <button className="mobile-filter-trigger" onClick={toggleFilter}>
        <TuneIcon style={{ marginRight: 8 }} />
        Filters
      </button>

      <div
        className={`filter-overlay ${isOpen ? "open" : ""}`}
        onClick={toggleFilter}
      ></div>

      <div className={`filter-container ${isOpen ? "open" : ""}`}>
        <div className="filter-header-mobile">
          <h2>Filters</h2>
          <button className="close-btn" onClick={toggleFilter}>
            <CloseIcon />
          </button>
        </div>

        <div className="filter-header-desktop">
          <p className="filter-title">Filters</p>
          <div className="filter-actions">
            <button className="clear-btn" onClick={clearFilters}>
              Clear All
            </button>
            <button className="apply-btn" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>

        <div className="filter-scroll-content">
          <div className="search-section">
            <div className="search-input-container">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                placeholder="Search brand or car..."
                value={search}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
          </div>

          <div className="filter-sections">
            <div className="filter-section">
              <p className="section-title">Top Brands</p>
              <div className="brands-list">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brandItem, index) => (
                    <div key={index} className="brand-accordion">
                      <div
                        className="brand-header"
                        onClick={() => handleAccordionToggle(index)}
                      >
                        <span>{brandItem.brand}</span>
                        {activeIndex === index ? (
                          <RemoveCircleOutlineIcon className="accordion-icon" />
                        ) : (
                          <KeyboardArrowDownIcon className="accordion-icon" />
                        )}
                      </div>
                      {activeIndex === index && (
                        <div className="brand-models">
                          {brandItem.cars.map((car, idx) => (
                            <label key={idx} className="model-checkbox">
                              <input
                                type="checkbox"
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
                              <span className="checkmark"></span>
                              {car}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <span className="spec-item">No brands available</span>
                )}
              </div>
            </div>

            <div className="filter-section">
              <p className="section-title">Body Type</p>
              <div className="options-grid">
                {carBodyTypes.map((bodyType, index) => (
                  <label key={index} className="checkbox-option">
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
                    <span className="checkbox-text">{bodyType.text}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <p className="section-title">Year</p>
              <div className="options-grid">
                {years.map((year, index) => (
                  <label key={index} className="radio-option">
                    <input
                      type="radio"
                      name="year"
                      checked={selectedYear === year.value}
                      onChange={() => setSelectedYear(year.value)}
                    />
                    <span className="radiomark"></span>
                    <span className="radio-text">{year.text}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <p className="section-title">Fuel Type</p>
              <div className="options-grid">
                {fuelTypes.map((fuel, index) => (
                  <label key={index} className="checkbox-option">
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
                    <span className="checkbox-text">{fuel.text}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <p className="section-title">Ownership</p>
              <div className="options-grid">
                {ownerShip.map((ownership, index) => (
                  <label key={index} className="checkbox-option">
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
                    <span className="checkbox-text">{ownership.text}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <p className="section-title">Transmission</p>
              <div className="options-grid">
                {transmissionTypes.map((transmission, index) => (
                  <label key={index} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={selectedTransmissionTypes.includes(
                        transmission.text
                      )}
                      onChange={() =>
                        handleCheckboxChange(
                          selectedTransmissionTypes,
                          setSelectedTransmissionTypes,
                          transmission.text
                        )
                      }
                    />
                    <span className="checkbox-text">{transmission.text}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <p className="section-title">Features</p>
              <div className="options-grid">
                {carFeatures.map((feature, index) => (
                  <label key={index} className="checkbox-option">
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
                    <span className="checkbox-text">{feature.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="filter-footer-mobile">
          <button className="clear-btn" onClick={clearFilters}>
            Clear All
          </button>
          <button className="apply-btn" onClick={applyFilters}>
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
