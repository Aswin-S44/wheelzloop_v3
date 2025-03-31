import React, { useState } from "react";
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

const ReviewScreen = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      date: "2023-10-15",
      comment:
        "Found my dream car at WheelzLoop! The process was smooth and transparent. The team went above and beyond to help me find exactly what I wanted. Highly recommend this service to anyone looking for quality used vehicles!",
      verified: true,
      car: "2020 Tesla Model 3",
      likes: 24,
      replies: 5,
    },
    {
      id: 2,
      name: "Sarah Miller",
      rating: 4,
      date: "2023-09-28",
      comment:
        "Great selection of vehicles. The team was helpful throughout the buying process. The only reason I'm not giving 5 stars is because the financing options could be better. Overall very satisfied with my purchase!",
      verified: true,
      car: "2018 Honda Accord",
      likes: 18,
      replies: 3,
    },
    {
      id: 3,
      name: "David Chen",
      rating: 5,
      date: "2023-09-10",
      comment:
        "Sold my car quickly and got a fair price. Excellent service! The online valuation tool was accurate and the whole process took less than a week. Will definitely use WheelzLoop again when I'm ready for my next car.",
      verified: false,
      car: "2016 Ford Mustang",
      likes: 32,
      replies: 7,
    },
    {
      id: 4,
      name: "Maria Garcia",
      rating: 5,
      date: "2023-08-22",
      comment:
        "The inspection reports were thorough and accurate. Made buying used feel safe. I appreciated the 360-degree view of each vehicle and the complete service history. The delivery was right on time too!",
      verified: true,
      car: "2019 Toyota RAV4",
      likes: 29,
      replies: 4,
    },
    {
      id: 5,
      name: "James Wilson",
      rating: 3,
      date: "2023-08-15",
      comment:
        "Good experience overall, but delivery took longer than expected. The car itself is in great condition, but communication about the delay could have been better. Still, I got a good deal on a quality vehicle.",
      verified: true,
      car: "2017 BMW 3 Series",
      likes: 8,
      replies: 2,
    },
  ];

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
            <span className="rating-value">4.6</span>
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
                  {/* <Rating
                    value={review.rating}
                    readOnly
                    icon={<StarIcon className="star-icon filled" />}
                    emptyIcon={<StarBorderIcon className="star-icon" />}
                  /> */}
                </div>
                <span className="car-model">{review.car}</span>
              </div>

              <p className="review-text">{review.comment}</p>

              <div className="review-actions">
                <button className="action-button">
                  <ThumbUp className="action-icon" />
                  <span>{review.likes}</span>
                </button>
                <button className="action-button">
                  <Comment className="action-icon" />
                  <span>{review.replies}</span>
                </button>
                <button className="action-button">
                  <Share className="action-icon" />
                  Share
                </button>
              </div>
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
