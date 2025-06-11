import React from "react";
import "./NewsAndResources.css";

const articles = [
  {
    id: 1,
    title: "Top Tips for Buying a Used Car",
    category: "Buying Guide",
    description: "Learn essential tips for making a safe and smart purchase.",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/two-people-reaching-an-agreement-about-a-car-sale-royalty-free-image-1665671206.jpg",
    link: "used-car-tips",
  },
  {
    id: 2,
    title: "How to Get the Best Price for Your Car",
    category: "Selling Guide",
    description: "Maximize the value of your car when selling it online.",
    image:
      "https://img.vehicleservicepros.com/files/base/cygnus/vspc/image/2022/09/16x9/Untitled___2022_09_01T113849.327.6310d29075f42.png?auto=format,compress&fit=max&q=45&w=640&width=640",
    link: "best-price",
  },
  {
    id: 3,
    title: "Car Maintenance Checklist",
    category: "Maintenance",
    description:
      "Keep your car in top condition with this comprehensive checklist.",
    image: "https://anyline.com/app/uploads/2023/12/automotive_10.jpg",
    link: "maintainance-checklist",
  },
  {
    id: 4,
    title: "Latest Trends in the Used Car Market",
    category: "Market Insights",
    description: "Understand what’s driving the market in 2024.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkrnorDh_f9CldF2UOXMKxHIo7-XeqYh6OHQ&s",
    link: "latest-trends",
  },
];

const NewsAndResources = () => {
  const handleCardClick = (link) => {
    window.location.href = `/blogs#${link}`;
    setTimeout(() => {
      const element = document.getElementById(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <section className="news-container">
      <h3 className="text-center fw-bold">
        <span className="quality-text">
          NEWS AND RESOURCES
          <svg
            width="120"
            height="12"
            viewBox="0 0 120 12"
            className="curved-line"
          >
            <path
              d="M0,6 Q60,12 120,6"
              stroke="#FFD700"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </span>{" "}
      </h3>
      <div className="news-header">
        <p>
          Discover the latest tips, guides, and insights to make smarter car
          decisions.
        </p>
      </div>
      <div className="news-grid">
        {articles.map((article) => (
          <article
            key={article.id}
            className="news-card"
            onClick={() => handleCardClick(article.link)}
          >
            <div className="news-image-container">
              <img
                src={article.image}
                alt={article.title}
                className="news-image"
                loading="lazy"
                title="blogs image"
              />
              <div className="news-overlay"></div>
              <span className="news-category">{article.category}</span>
            </div>
            <div className="news-content">
              <h3 className="news-card-title">{article.title}</h3>
              <p className="news-text">{article.description}</p>
              <button
                className="news-link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(article.link);
                }}
              >
                View More
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="view-all-container">
        <a href="/blogs"><button className="view-all-button">View All Articles</button></a>
        
      </div>
    </section>
  );
};

export default NewsAndResources;
