import React, { useEffect, useState } from "react";
import "./ExploreCarsScreen.css";
import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { Search, Close } from "@mui/icons-material";
import Filter from "../../components/Filter/Filter";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import MobileFilter from "../../components/Filter/MobileFilter";
import EmptyState from "../../components/EmptyState/EmptyState";
import axios from "axios";
import { GET_ALL_CARS } from "../../config/api";
import Carousel from "../../components/Carousel/Carousel";

function ExploreCarsScreen() {
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const [pagination, setPagination] = useState({ pageSize: 10, lastDoc: null });
  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const fetchCars = async (filters = {}) => {
    try {
      setLoading(true);
      // const res = await axios.get(`${GET_ALL_CARS}`);
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axios.get(`${GET_ALL_CARS}?${queryParams}`);
      if (res?.data?.data?.length > 0) {
        setCars(res.data.data);
        setFilteredCars(res.data.data);
      } else {
        setCars([]);
        setFilteredCars([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(filters);
  }, [brand]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setOrder(value);
    const sortedCars = [...filteredCars].sort((a, b) => {
      if (value === "asc") return a.rate - b.rate;
      if (value === "desc") return b.rate - a.rate;
      if (value === "latest")
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
      if (value === "oldest")
        return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
      return 0;
    });
    setFilteredCars(sortedCars);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    fetchCars(newFilters);
  };

  useEffect(() => {
    fetchCars(filters);
  }, [pagination, brand]);

  return (
    <div className="explore-cars-screen">
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-md-3">
            <div className="filter-section">
              {isMobile ? (
                <MobileFilter onFilterChange={applyFilters} />
              ) : (
                <Filter onFilterChange={applyFilters} />
              )}
              {/* <Filter onFilterChange={applyFilters} /> */}
            </div>
          </div>
          <div className="col-md-9">
            <Carousel />
            <div className="content-wrapper" style={{ padding: "20px" }}>
              <div
                className="cars-section"
                style={{ maxWidth: "1400px", margin: "0 auto" }}
              >
                <div
                  className="sort-bar"
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "0 15px",
                  }}
                >
                  <FormControl style={{ minWidth: "200px" }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select value={order} onChange={handleSortChange}>
                      <MenuItem value="asc">Price: Low to High</MenuItem>
                      <MenuItem value="desc">Price: High to Low</MenuItem>
                      <MenuItem value="latest">Latest</MenuItem>
                      <MenuItem value="oldest">Oldest</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div
                  className="cards-container"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "20px",
                    padding: "0 15px",
                  }}
                >
                  {loading ? (
                    <div
                      style={{
                        gridColumn: "1 / -1",
                        display: "flex",
                        justifyContent: "center",
                        padding: "40px 0",
                      }}
                    >
                      <Loader />
                    </div>
                  ) : error ? (
                    <div
                      className="error"
                      style={{
                        gridColumn: "1 / -1",
                        textAlign: "center",
                        padding: "40px 0",
                        color: "red",
                      }}
                    >
                      {error}
                    </div>
                  ) : filteredCars.length === 0 ? (
                    <div style={{ gridColumn: "1 / -1" }}>
                      <EmptyState />
                    </div>
                  ) : (
                    filteredCars.map((car) => (
                      <div
                        key={car.id}
                        className="car-card"
                        style={{
                          transition: "transform 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                        }}
                        onClick={() =>
                          (window.location.href = `/car/${car._id}`)
                        }
                      >
                        <Card car={car} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isMobile && (
          <div className="search-container">
            <InputBase
              placeholder="Search cars..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" &&
                fetchCars({ ...filters, search: searchTerm })
              }
            />
            <IconButton onClick={() => setSearchTerm("")}>
              {searchTerm ? <Close /> : <Search />}
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreCarsScreen;
