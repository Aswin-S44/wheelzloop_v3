import React, { useEffect, useState } from "react";
import "./ExploreCarsScreen.css";

// import CarCard from "../../Components/CarCard/CarCard";
import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useSearchParams } from "react-router-dom";
// import useMobileView from "../../hooks/isMobile";
import CloseIcon from "@mui/icons-material/Close";
import { Search, AccountCircle } from "@mui/icons-material";
import Filter from "../../components/Filter/Filter";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import MobileFilter from "../../components/Filter/MobileFilter";
import EmptyState from "../../components/EmptyState/EmptyState";

function ExploreCarsScreen() {
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ pageSize: 10, lastDoc: null });
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const updateScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileSearch, setMobileSearch] = useState(true);
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    try {
      // const results = await searchCars(searchTerm);
      // setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const fetchCars = async (filters = {}) => {
    try {
      // setLoading(true);
      // if (brand) {
      //   filters.brands = [brand];
      //   //filters.brand = brand;
      // }
      // const res = await getAllCars(filters, pagination);
      // setLoading(false);
      // if (res && res.length > 0) {
      //   setCars(res);
      //   setFilteredCars(res);
      // } else {
      //   setCars([]);
      //   setFilteredCars([]);
      // }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    fetchCars(newFilters);
  };

  useEffect(() => {
    fetchCars(filters);
  }, [pagination, brand]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setOrder(value);
    const sortedCars = [...filteredCars].sort((a, b) => {
      if (value === "asc") return a.rate - b.rate; // Sort by price (low to high)
      if (value === "desc") return b.rate - a.rate; // Sort by price (high to low)
      if (value === "latest") {
        const timeA = a.createdAt?.seconds || 0; // Use optional chaining and default value
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA; // Sort by latest
      }
      if (value === "oldest") {
        const timeA = a.createdAt?.seconds || 0; // Use optional chaining and default value
        const timeB = b.createdAt?.seconds || 0;
        return timeA - timeB; // Sort by oldest
      }
      return 0;
    });
    setFilteredCars(sortedCars);
  };
  return (
    <div className="explore-cars-screen">
      <div className="container-fluid">
        <div className="row">
          {isMobile && (
            <div
              className={`search-container ${
                mobileSearch ? "visible-mobile" : "visible-laptop"
              }`}
              style={{ position: "relative" }}
            >
              <InputBase
                placeholder="Search by name, brand..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch();
                }}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <IconButton onClick={handleSearch}>
                {searchTerm.trim() != "" ? (
                  <CloseIcon
                    className="search-icon"
                    style={{ fontSize: "25px" }}
                    onClick={() => setSearchTerm("")}
                  />
                ) : (
                  <Search
                    className="search-icon"
                    style={{ fontSize: "25px" }}
                  />
                )}
              </IconButton>

              <div className="search-results">
                {searchResults.length == 0 && searchTerm.trim() != "" ? (
                  <div className="search-item">
                    <a style={{ color: "#111" }}>No Item found</a>
                  </div>
                ) : (
                  searchResults.length > 0 &&
                  searchTerm.trim() != "" && (
                    <>
                      {searchResults.map((car) => (
                        <div key={car.id} className="search-item">
                          <a href={`/car/${car.id}`}>
                            <img
                              src={car?.images[0]}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                              loading="lazy"
                            />
                            {car.name} - {car.brand}
                          </a>
                        </div>
                      ))}
                    </>
                  )
                )}
              </div>
            </div>
          )}
          <div className="col-md-2 mt-5">
            <div className="container">
              {isMobile ? (
                <MobileFilter onFilterChange={applyFilters} />
              ) : (
                <Filter onFilterChange={applyFilters} />
              )}
            </div>
          </div>
          <div
            className="col-md-9"
            style={{ backgroundColor: "#fcfcfc", position: "relative" }}
          >
            {/* <Carousel /> */}
            <div className="col-md-3 mt-4">
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ fontSize: "15px" }}
                >
                  Sort by
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={order}
                  label="Sort"
                  onChange={handleSortChange}
                  style={{ fontSize: "15px" }}
                >
                  <MenuItem value="asc" style={{ fontSize: "15px" }}>
                    Price: Low to High
                  </MenuItem>
                  <MenuItem value="desc" style={{ fontSize: "15px" }}>
                    Price: High to Low
                  </MenuItem>
                  <MenuItem value="latest" style={{ fontSize: "15px" }}>
                    Latest
                  </MenuItem>
                  <MenuItem value="oldest" style={{ fontSize: "15px" }}>
                    Oldest
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="cards-container">
              {/* {loading ? (
                <div>
                  <Loader />
                </div>
              ) : error ? (
                <>Error: {error}</>
              ) : filteredCars.length === 0 && !loading ? (
                <>
                  <EmptyState />
                </>
              ) : (
                filteredCars.map((car) => (
                  <div
                    onClick={() => (window.location.href = `/car/${car.id}`)}
                    key={car.id}
                  >
                    <Card />
                  </div>
                ))
              )} */}
              <Card />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreCarsScreen;
