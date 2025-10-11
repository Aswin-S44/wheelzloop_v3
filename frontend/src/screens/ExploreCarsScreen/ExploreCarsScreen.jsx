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
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
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
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== undefined && value !== null
        )
      );
      const queryParams = new URLSearchParams({
        ...cleanFilters,
        page: pagination.page,
        limit: pagination.pageSize,
        sortBy,
        order,
      }).toString();
      const res = await axios.get(`${GET_ALL_CARS}?${queryParams}`);
      if (res?.data?.success) {
        setCars(res.data.data);
        setPagination((prev) => ({
          ...prev,
          total: res.data.pagination.total,
          pages: res.data.pagination.pages,
        }));
      } else {
        setCars([]);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(filters);
  }, [brand, pagination.page, sortBy, order, filters]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setOrder(value.includes("desc") ? "desc" : "asc");

    switch (value) {
      case "price_asc":
        setSortBy("price");
        setOrder("asc");
        break;
      case "price_desc":
        setSortBy("price");
        setOrder("desc");
        break;
      case "latest":
        setSortBy("created_at");
        setOrder("desc");
        break;
      case "oldest":
        setSortBy("created_at");
        setOrder("asc");
        break;
      default:
        setSortBy("created_at");
        setOrder("desc");
    }
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
                <FormControl style={{ minWidth: "200px" }} className="sort-select-container">
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={`${sortBy}_${order}`}
                    onChange={handleSortChange}
                  >
                    <MenuItem value="price_asc">Price: Low to High</MenuItem>
                    <MenuItem value="price_desc">Price: High to Low</MenuItem>
                    <MenuItem value="created_at_desc">Latest</MenuItem>
                    <MenuItem value="created_at_asc">Oldest</MenuItem>
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
                ) : cars.length === 0 ? (
                  <div className="empty-state">
                    <EmptyState />
                  </div>
                ) : (
                  cars.map((car) => (
                    <div key={car.id} className="car-card">
                      <Card car={car} />
                    </div>
                  ))
                )}
              </div>
              {cars.length > 0 && (
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
    </div>
  );
}

export default ExploreCarsScreen;
