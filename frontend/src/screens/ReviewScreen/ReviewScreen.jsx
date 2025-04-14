import React, { useContext, useEffect, useState } from "react";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Verified as VerifiedIcon,
  ChevronLeft,
  ChevronRight,
  FilterAlt as FilterIcon,
  SentimentVerySatisfied,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
  ThumbUp,
  Comment,
  Share,
} from "@mui/icons-material";
import "./ReviewScreen.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Rating, TextField } from "@mui/material";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";
import { ADD_REVIEWS_URL, GET_REVIEWS_URL } from "../../config/api";
import Swal from "sweetalert2";
import Ratings from "../../components/Rating/Rating";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ReviewScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const [statCounts, setStatsCount] = useState({
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      let url = GET_REVIEWS_URL;
      if (currentReview !== null) {
        url += `?rating=${currentReview}`;
      }
      const res = await axios.get(url);
      if (res && res.data && res.data.ratings) {
        setReviews(res.data.ratings);
        setStatsCount(res.data.stats);
        setAvg(res.data.avg);
      }
    };
    fetchReviews();
  }, [currentReview]);

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(activeTab));

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const getSentimentIcon = (rating) => {
    switch (rating) {
      case 5:
        return <SentimentVerySatisfied className="sentiment-icon excellent" />;
      case 4:
        return <SentimentSatisfied className="sentiment-icon good" />;
      case 3:
        return <SentimentNeutral className="sentiment-icon average" />;
      case 2:
        return <SentimentDissatisfied className="sentiment-icon poor" />;
      case 1:
        return <SentimentVeryDissatisfied className="sentiment-icon bad" />;
      default:
        return <SentimentNeutral className="sentiment-icon" />;
    }
  };

  const handleSubmit = async (e) => {
    if (user) {
      setLoading(true);
      e.preventDefault();
      let userRating = {
        userId: user._id,
        rating,
        reviewText,
      };
      const res = await axios.post(ADD_REVIEWS_URL, userRating);
      setLoading(false);
      if (res && res.status == 200) {
        handleClose();
        Swal.fire("Thank you for your Rating!");
      }

      // onSubmit({ rating, reviewText });
      setRating(0);
      setReviewText("");
    }
  };

  return (
    <div className="review-screen">
      <div className="review-header">
        <h1>
          Customer <span className="highlight">Reviews</span>
        </h1>
        <p>See what our community says about their WheelzLoop experience</p>
      </div>

      <div className="review-stats-container">
        <div className="average-rating-card glow-effect">
          <div className="rating-display">
            <span className="rating-value">{avg}</span>
            <div className="stars">
              {/* <Rating
                value={4.6}
                precision={0.1}
                readOnly
                icon={<StarIcon className="star-icon filled" />}
                emptyIcon={<StarBorderIcon className="star-icon" />}
              /> */}
            </div>
            <span className="rating-count">{reviews.length} reviews</span>
          </div>
          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100;

              return (
                <div key={rating} className="rating-bar">
                  <span className="rating-label">{rating} Star</span>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="review-filter-tabs">
        <button className="sell-btn" onClick={handleOpen}>
          Add Review
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <>
              {!user ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    padding: "24px",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    maxWidth: "400px",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#333",
                    }}
                  >
                    You need to create account to add review
                  </span>
                  <button
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#30bfa1",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "background-color 0.2s",
                      ":hover": {
                        backgroundColor: "#30bfa1",
                      },
                    }}
                    onClick={() => (window.location.href = "/signin")}
                  >
                    Go to login
                  </button>
                </div>
              ) : (
                <>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Add Your Review
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                      <Rating
                        name="review-rating"
                        value={rating}
                        onChange={(e, newValue) => setRating(newValue)}
                        size="large"
                      />
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Write your review here..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={!rating || !reviewText || loading}
                      style={{ backgroundColor: "#30bfa1" }}
                    >
                      {loading ? <>Please wait....</> : <>Submit Review</>}
                    </Button>
                  </form>
                </>
              )}
            </>
          </Box>
        </Modal>
        <button
          className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("all");
            setCurrentPage(1);
          }}
        >
          <FilterIcon className="tab-icon" />
          All Reviews
        </button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            className={`filter-tab ${
              activeTab === rating.toString() ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab(rating.toString());
              setCurrentPage(1);
            }}
          >
            {getSentimentIcon(rating)}
            {rating} Star
          </button>
        ))}
      </div>

      <div className="review-list">
        {paginatedReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-card-header">
              <div className="reviewer-info">
                <div
                  className="avatar"
                  style={{
                    backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  }}
                >
                  {review.name.charAt(0)}
                </div>
                <div className="reviewer-details">
                  <h3>{review.name}</h3>
                  <p>{review.date}</p>
                </div>
              </div>
              {review.verified && (
                <div className="verified-badge">
                  <VerifiedIcon className="verified-icon" />
                  Verified Purchase
                </div>
              )}
            </div>

            <div className="review-content">
              <div className="rating-display">
                {getSentimentIcon(review.rating)}
                <div className="stars">
                  <Ratings rating={review.rating} />
                </div>
                <span className="car-model">{review.car}</span>
              </div>

              <p className="review-text">{review.reviewText}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="pagination-icon" />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`pagination-button ${
              currentPage === i + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="pagination-button"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="pagination-icon" />
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;
