import React, { useState } from "react";
import "./Filter.css";
import { brands } from "../../dummyData/brands";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { years } from "../../dummyData/year";
import { fuelTypes } from "../../dummyData/fuelTypes";
import { ownerShip } from "../../dummyData/ownerShip";
import { carFeatures } from "../../dummyData/carFeatures";
import { carBodyTypes } from "../../dummyData/bodyTypes";
import { transmissionTypes } from "../../dummyData/transmissionTypes";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SearchIcon from "@mui/icons-material/Search";

function Filter({ onFilterChange }) {
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
      car_name: selectedCars.map((item) => item.car),
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
    <div className="filter-container">
      <div className="filter-header">
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

      <div className="search-section">
        <div className="search-input-container">
          {/* <SearchIcon className="search-icon" /> */}
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
            {filteredBrands.map((brandItem, index) => (
              <div key={index} className="brand-accordion ">
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
                              item.brand === brandItem.brand && item.car === car
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

                        {car}
                      </label>
                    ))}
                  </div>
                )}
              </div>
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
                {year.text}
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <p className="section-title">Fuel Type</p>
          <div className="options-grid">
            {fuelTypes.map((fuel, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedFuelTypes.includes(fuel.text)}
                  onChange={() =>
                    handleCheckboxChange(
                      selectedFuelTypes,
                      setSelectedFuelTypes,
                      fuel.text
                    )
                  }
                />

                <span
                  style={{
                    marginLeft: "10px",
                    color: "#555",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  {fuel.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <p className="section-title">Ownership</p>
          <div className="options-grid">
            {ownerShip.map((ownership, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedOwnership.includes(ownership.text)}
                  onChange={() =>
                    handleCheckboxChange(
                      selectedOwnership,
                      setSelectedOwnership,
                      ownership.text
                    )
                  }
                />

                <span
                  style={{
                    marginLeft: "10px",
                    color: "#555",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  {ownership.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <p className="section-title">Features2323</p>
          <div className="options-grid scrollable-div scroll-container">
            {carFeatures.map((feature, index) => (
              <label key={index} className="">
                <input
                  className="checkbox"
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
                {/* <span className="checkmark"></span> */}
                <span
                  style={{
                    marginLeft: "10px",
                    color: "#555",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  {feature.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <p className="section-title">Body Type</p>
          <div className="options-grid">
            {carBodyTypes.map((bodyType, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedBodyTypes.includes(bodyType.text)}
                  onChange={() =>
                    handleCheckboxChange(
                      selectedBodyTypes,
                      setSelectedBodyTypes,
                      bodyType.text
                    )
                  }
                />

                <span
                  style={{
                    marginLeft: "10px",
                    color: "#555",
                    fontSize: "14px",
                  }}
                >
                  {" "}
                  {bodyType.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
