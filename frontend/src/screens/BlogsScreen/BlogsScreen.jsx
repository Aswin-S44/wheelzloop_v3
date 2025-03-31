import React, { useEffect } from "react";
import "./BlogsScreen.css";
import {
  FaCalendarAlt,
  FaShareAlt,
  FaBookmark,
  FaChevronRight,
} from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

function BlogsScreen() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="blogs-container">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-content">
          <h1>Car Buying Resources & Guides</h1>
          <p>
            Expert advice to help you make informed decisions about buying,
            selling, and maintaining your vehicle
          </p>
        </div>
      </div>

      {/* Blog Navigation */}
      <div className="blog-navigation">
        <a href="#used-car-tips" className="nav-link active">
          Buying Guide
        </a>
        <a href="#best-price" className="nav-link">
          Selling Guide
        </a>
        <a href="#maintainance-checklist" className="nav-link">
          Maintenance
        </a>
        <a href="#latest-trends" className="nav-link">
          Market Trends
        </a>
      </div>

      {/* Main Content - Keeping all your existing articles */}
      <div className="blog-content">
        {/* Article 1 - Buying Tips */}
        <article className="blog-article" id="used-car-tips">
          <div className="article-header">
            <div className="article-meta">
              <span className="article-category">Buying Guide</span>
              <span className="article-date">
                <FaCalendarAlt /> December 6, 2024
              </span>
            </div>
            <h2 className="article-title">Top Tips for Buying a Used Car</h2>
            <div className="article-actions">
              <button className="action-btn save-btn">
                <FaBookmark /> Save
              </button>
              <button className="action-btn share-btn">
                <FaShareAlt /> Share
              </button>
            </div>
          </div>

          <div className="article-image">
            <img src="/images/blog1.webp" alt="Used car" loading="lazy" />
          </div>

          <div className="article-body">
            {/* Keep all your existing content sections */}
            <section className="content-section">
              <h3>1. Set Your Budget</h3>
              <p>
                Before you start browsing, make sure you have a clear idea of
                how much you're willing to spend. Consider not just the cost of
                the car, but also maintenance, insurance, and taxes.
              </p>
            </section>

            {/* All other sections remain exactly the same */}
            {/* ... */}
          </div>

          <div className="article-footer">
            <div className="author-info">
              <div className="author-avatar">JD</div>
              <div>
                <h4>John Doe</h4>
                <p>Auto Expert</p>
              </div>
            </div>
            <div className="article-nav">
              <button className="nav-btn prev-btn">
                <BsArrowLeft /> Previous: How to Sell Your Car
              </button>
              <button className="nav-btn next-btn">
                Next: Maintenance Checklist <BsArrowRight />
              </button>
            </div>
          </div>
        </article>

        {/* Article 2 - Selling Guide */}
        <article className="blog-article" id="best-price">
          {/* Same structure as above */}
          {/* Keep all existing content */}
        </article>

        {/* Article 3 - Maintenance */}
        <article className="blog-article" id="maintainance-checklist">
          {/* Same structure as above */}
          {/* Keep all existing content */}
        </article>

        {/* Article 4 - Market Trends */}
        <article className="blog-article" id="latest-trends">
          {/* Same structure as above */}
          {/* Keep all existing content */}
        </article>
      </div>

      {/* Newsletter CTA */}
      <div className="newsletter-cta">
        <div className="cta-content">
          <h3>Get More Car Buying Tips</h3>
          <p>
            Subscribe to our newsletter for the latest advice and market trends
          </p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">
              Subscribe <FaChevronRight />
            </button>
          </form>
        </div>
      </div>

      {/* Related Articles */}
      <div className="related-articles">
        <h3>More Helpful Guides</h3>
        <div className="article-grid">
          <div className="related-card">
            <img src="/images/blog2.webp" alt="Related article" />
            <div className="card-content">
              <span className="card-category">Selling Guide</span>
              <h4>How to Get the Best Price for Your Car</h4>
              <p>Learn strategies to maximize your car's selling price</p>
              <a href="#best-price">Read More</a>
            </div>
          </div>

          <div className="related-card">
            <img src="/images/blog4.jpg" alt="Related article" />
            <div className="card-content">
              <span className="card-category">Maintenance</span>
              <h4>Car Maintenance Checklist</h4>
              <p>
                Essential maintenance tasks to keep your car running smoothly
              </p>
              <a href="#maintainance-checklist">Read More</a>
            </div>
          </div>

          <div className="related-card">
            <img src="/images/blog3.jpg" alt="Related article" />
            <div className="card-content">
              <span className="card-category">Market Trends</span>
              <h4>Latest Trends in the Used Car Market</h4>
              <p>Stay informed about current market conditions</p>
              <a href="#latest-trends">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsScreen;
