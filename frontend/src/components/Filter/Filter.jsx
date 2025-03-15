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
      brands: selectedCars.map((item) => item.brand), // Array of brand names
      year: selectedYear ? `${selectedYear} & ${selectedYear}` : null, // Year range
      fuelTypes: selectedFuelTypes.length > 0 ? selectedFuelTypes : null, // Array of fuel types
      ownership: selectedOwnership.length > 0 ? selectedOwnership : null, // Array of ownership types
      bodyTypes: selectedBodyTypes.length > 0 ? selectedBodyTypes : null, // Array of body types
      transmissionTypes:
        selectedTransmissionTypes.length > 0 ? selectedTransmissionTypes : null, // Array of transmission types
    };

    // Remove null or invalid filters
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== null)
    );

    console.log("Applied Filters:", validFilters); // Debugging
    onFilterChange(validFilters); // Pass valid filters to parent component
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
    <div className="filter-container scrollable-div">
      <h2 className="font-sm">Apply Filters</h2>

      <button
        className="apply-filter-btn medium"
        onClick={applyFilters}
        aria-label="Search for used cars"
      >
        Apply Filters
      </button>
      <button
        className="clear-filter-btn button-transparent m-2"
        onClick={clearFilters}
        aria-label="Search for used cars"
      >
        Clear Filters
      </button>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search brand or car"
          value={search}
          onChange={handleSearch}
          className="search-box"
        />
        <h4 className="font-sm" style={{ color: "#4e4949" }}>
          Top brands
        </h4>
        <div className="scrollable-brands mt-4">
          {filteredBrands.map((brandItem, index) => (
            <div key={index} className="accordion">
              <div
                className="accordion-header"
                onClick={() => handleAccordionToggle(index)}
              >
                <h3 style={{ color: "#161638" }} className="font-sm-sm">
                  {brandItem.brand}
                </h3>
                <span>
                  {activeIndex === index ? (
                    <RemoveCircleOutlineIcon style={{ fontSize: "28px" }} />
                  ) : (
                    <KeyboardArrowDownIcon style={{ fontSize: "28px" }} />
                  )}
                </span>
              </div>
              <hr />
              {activeIndex === index && (
                <div className="accordion-body">
                  {brandItem.cars.map((car, idx) => (
                    <div key={idx} className="checkbox-container">
                      <input
                        type="checkbox"
                        id={`${brandItem.brand}-${car}`}
                        checked={selectedCars.some(
                          (item) =>
                            item.brand === brandItem.brand && item.car === car
                        )}
                        onChange={() =>
                          handleCheckboxChange(selectedCars, setSelectedCars, {
                            brand: brandItem.brand,
                            car,
                          })
                        }
                      />
                      <label
                        htmlFor={`${brandItem.brand}-${car}`}
                        className="font-sm-sm"
                      >
                        {car}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <hr />
        <div className="scrollable-brands">
          <h4 className="font-sm" style={{ color: "#4e4949" }}>
            Years
          </h4>
          {years.map((year, index) => (
            <div key={index} style={{ padding: "10px" }}>
              <input
                type="radio"
                name="year"
                checked={selectedYear === year.text}
                onChange={() => setSelectedYear(year.text)}
              />
              <span style={{ marginLeft: "6px" }} className="font-sm-sm">
                {year.text}
              </span>
            </div>
          ))}
        </div>

        <hr />
        <div>
          <h4 className="font-sm" style={{ color: "#4e4949" }}>
            Fuel Types
          </h4>
          {fuelTypes.map((fuel, index) => (
            <div key={index} style={{ padding: "10px" }}>
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
              <span style={{ marginLeft: "6px" }} className="font-sm-sm">
                {fuel.text}
              </span>
            </div>
          ))}
        </div>

        <hr />
        <div>
          <h4 className="font-sm" style={{ color: "#4e4949" }}>
            Ownership
          </h4>
          {ownerShip.map((ownership, index) => (
            <div key={index} style={{ padding: "10px" }}>
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
              <span style={{ marginLeft: "6px" }} className="font-sm-sm">
                {ownership.text}
              </span>
            </div>
          ))}
        </div>

        <hr />
        <div className="scrollable-brands">
          <h4 className="font-sm" style={{ color: "#4e4949" }}>
            Features
          </h4>
          {carFeatures.map((feature, index) => (
            <div key={index} style={{ padding: "10px" }}>
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
              <span style={{ marginLeft: "6px" }} className="font-sm-sm">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        <hr />
        <div className="scrollable-brands">
          <h4 className="font-sm" style={{ color: "#4e4949" }}>
            Body Types
          </h4>
          {carBodyTypes.map((bodyType, index) => (
            <div key={index} style={{ padding: "10px" }}>
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
              <span style={{ marginLeft: "6px" }} className="font-sm-sm">
                {bodyType.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
