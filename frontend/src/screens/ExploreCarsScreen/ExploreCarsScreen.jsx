import React, { useEffect, useState } from "react";
import "./ExploreCarsScreen.css";
import {
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
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
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
  });

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const fetchCars = async (filters = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        ...filters,
        page: pagination.page,
        limit: pagination.pageSize,
      }).toString();
      const res = await axios.get(`${GET_ALL_CARS}?${queryParams}`);
      if (res?.data?.data?.length > 0) {
        setCars(res.data.data);
        setFilteredCars(res.data.data);
        setPagination((prev) => ({
          ...prev,
          total: res.data.pagination.total,
          pages: res.data.pagination.pages,
        }));
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
  }, [brand, pagination.page]);

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
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
  };

  return (
    <div className="explore-cars-screen">
      <div className="layout-container">
        <div className="filter-column">
          <div className="filter-section">
            {isMobile ? (
              <MobileFilter onFilterChange={applyFilters} />
            ) : (
              <Filter onFilterChange={applyFilters} />
            )}
          </div>
        </div>
        <div className="content-column">
          <Carousel />
          <div className="content-wrapper">
            <div className="cars-section">
              <div className="sort-bar">
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

              <div className="cards-grid">
                {loading ? (
                  <div className="loader-container">
                    <Loader />
                  </div>
                ) : error ? (
                  <div className="error-message">{error}</div>
                ) : filteredCars.length === 0 ? (
                  <div className="empty-state">
                    <EmptyState />
                  </div>
                ) : (
                  filteredCars.map((car) => (
                    <div key={car.id} className="car-card">
                      <Card car={car} />
                    </div>
                  ))
                )}
              </div>
              {filteredCars.length > 0 && (
                <div className="pagination-container">
                  <Pagination
                    count={pagination.pages}
                    page={pagination.page}
                    onChange={handlePageChange}
                    sx={{
                      "& .MuiPaginationItem-root.Mui-selected": {
                        background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                        color: "#fff", // Ensures text is visible
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {isMobile && (
        <div className="mobile-search-container">
          <InputBase
            placeholder="Search cars..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && fetchCars({ ...filters, search: searchTerm })
            }
          />
          <IconButton onClick={() => setSearchTerm("")}>
            {searchTerm ? <Close /> : <Search />}
          </IconButton>
        </div>
      )} */}
    </div>
  );
}

export default ExploreCarsScreen;
