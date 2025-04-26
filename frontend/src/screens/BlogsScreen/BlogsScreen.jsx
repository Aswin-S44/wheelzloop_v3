import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./BlogsScreen.css";
import Swal from "sweetalert2";
import {
  FaCalendarAlt,
  FaShareAlt,
  FaBookmark,
  FaChevronRight,
} from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { ADD_SUBSCRIPTION_URL } from "../../config/api";

function BlogsScreen() {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const articles = [
    "used-car-tips",
    "best-price",
    "maintainance-checklist",
    "latest-trends",
  ];

  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (email) {
        const res = await axios.post(ADD_SUBSCRIPTION_URL, { email });
        setLoading(false);
        if (res && res.status == 200) {
          Swal.fire({
            title: "Subsciption added!",
            text: "Thankyou for subscribe with us!",
            icon: "success",
          });
        }
        setEmail("");
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        const index = articles.indexOf(hash);
        if (index !== -1) {
          setCurrentArticleIndex(index);
        }
      }
    }
  }, []);

  const handlePrevClick = () => {
    if (currentArticleIndex > 0) {
      const prevIndex = currentArticleIndex - 1;
      setCurrentArticleIndex(prevIndex);
      const prevArticleId = articles[prevIndex];
      window.location.hash = prevArticleId;
      document
        .getElementById(prevArticleId)
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNextClick = () => {
    if (currentArticleIndex < articles.length - 1) {
      const nextIndex = currentArticleIndex + 1;
      setCurrentArticleIndex(nextIndex);
      const nextArticleId = articles[nextIndex];
      window.location.hash = nextArticleId;
      document
        .getElementById(nextArticleId)
        .scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="blogs-container">
      <div className="blog-hero">
        <div className="hero-content">
          <h1>Car Buying Resources & Guides</h1>
          <p>
            Expert advice to help you make informed decisions about buying,
            selling, and maintaining your vehicle
          </p>
        </div>
      </div>

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

      <div className="blog-content">
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
            <img
              src="/images/blog1.webp"
              alt="Used car"
              loading="lazy"
              title="car buying guide"
            />
          </div>

          <div className="article-body mt-4">
            <section className="content-section">
              <h3>1. Set Your Budget</h3>
              <p>
                Before you start browsing, make sure you have a clear idea of
                how much you're willing to spend. Consider not just the cost of
                the car, but also maintenance, insurance, and taxes.
              </p>
            </section>
            <section className="content-section">
              <h3>2. Research the Car Model</h3>
              <p>
                Know what you're looking for. Check reviews, reliability, fuel
                efficiency, and resale value of different models before
                deciding.
              </p>
            </section>

            <section className="content-section">
              <h3>3. Check the Vehicle History</h3>
              <p>
                Always ask for the history report. Look for any accidents,
                service records, previous ownership, and title status.
              </p>
            </section>

            <section className="content-section">
              <h3>4. Inspect the Car Thoroughly</h3>
              <p>
                Don't judge a car by its looks alone. Check tires, brakes,
                lights, engine, and underbody for any signs of damage or wear.
              </p>
            </section>

            <section className="content-section">
              <h3>5. Take a Test Drive</h3>
              <p>
                Get a feel for the car. Test drive in different conditions to
                check brakes, acceleration, steering, and comfort.
              </p>
            </section>

            <section className="content-section">
              <h3>6. Get a Mechanic's Opinion</h3>
              <p>
                Have a trusted mechanic inspect the car. They can spot hidden
                problems that could cost you later.
              </p>
            </section>

            <section className="content-section">
              <h3>7. Verify All Documents</h3>
              <p>
                Ensure everything is legal and clear. Check registration,
                insurance papers, pollution certificate, and loan clearance.
              </p>
            </section>

            <section className="content-section">
              <h3>8. Negotiate Smartly</h3>
              <p>
                Don't accept the first price. Use your research and any issues
                found to negotiate a better deal.
              </p>
            </section>

            <section className="content-section">
              <h3>9. Beware of Scams</h3>
              <p>
                Be cautious of too-good-to-be-true deals. Avoid paying in
                advance or dealing with unverified sellers.
              </p>
            </section>

            <section className="content-section">
              <h3>10. Trust Your Instincts</h3>
              <p>
                If something feels off, walk away. Never rush a decision—there
                are always more cars out there.
              </p>
            </section>
          </div>

          <div className="article-footer">
            <div className="author-info">
              <div className="author-avatar">JD</div>
              <div>
                <h4>Aswin</h4>
                <p>Auto Expert</p>
              </div>
            </div>
            <div className="article-nav">
              <button className="nav-btn prev-btn" onClick={handlePrevClick}>
                <BsArrowLeft /> Previous: How to Sell Your Car
              </button>
              <button className="nav-btn next-btn" onClick={handleNextClick}>
                Next: Maintenance Checklist <BsArrowRight />
              </button>
            </div>
          </div>
        </article>

        <article className="blog-article" id="best-price">
          <div className="article-header">
            <div className="article-meta">
              <span className="article-category">Best Price</span>
              <span className="article-date">
                <FaCalendarAlt /> December 6, 2024
              </span>
            </div>
            <h2 className="article-title">
              How to Get the Best Price When Buying a Used Car
            </h2>
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
            <img
              src="/images/blog1.webp"
              alt="Used car"
              loading="lazy"
              title="how go get best price when buying a used car"
            />
          </div>

          <div className="article-body mt-4">
            <section className="content-section">
              <h3>1. Do Your Market Research</h3>
              <p>
                Know the average price for the car you want. Use online
                platforms to compare listings and understand fair market value.
              </p>
            </section>

            <section className="content-section">
              <h3>2. Compare Prices Across Multiple Platforms</h3>
              <p>
                Don't settle for the first listing. Check prices on different
                websites, dealerships, and private sellers to spot the best
                deal.
              </p>
            </section>

            <section className="content-section">
              <h3>3. Buy at the Right Time</h3>
              <p>
                Timing can affect price. End of the month, year-end, or during
                off-seasons are great times to get better discounts.
              </p>
            </section>
            <section className="content-section">
              <h3>4. Negotiate with Confidence</h3>
              <p>
                Sellers expect negotiation. Be polite but firm—point out flaws
                or maintenance needs as leverage for price reduction.
              </p>
            </section>
            <section className="content-section">
              <h3>5. Consider Certified Pre-Owned Vehicles</h3>
              <p>
                Get value with peace of mind. These cars may cost slightly more
                but often include warranties and thorough inspections.
              </p>
            </section>
            <section className="content-section">
              <h3>6. Check for Hidden Costs</h3>
              <p>
                Look beyond the sticker price. Include registration fees,
                insurance, and repair costs before finalizing your budget.
              </p>
            </section>
            <section className="content-section">
              <h3>7. Use a Pre-Purchase Inspection as a Bargaining Tool</h3>
              <p>
                Let a mechanic find what you can't see. Use the inspection
                report to negotiate a lower price if any issues are found.
              </p>
            </section>
            <section className="content-section">
              <h3>8. Be Ready to Walk Away</h3>
              <p>
                Don't fall in love with one car. If the price isn't right, don't
                hesitate to leave—there are plenty of good options out there.
              </p>
            </section>
            <section className="content-section">
              <h3>9. Ask for Extra Perks</h3>
              <p>
                If price won't drop, ask for add-ons. Free service, accessories,
                or extended warranty can add value without affecting the cost.
              </p>
            </section>
            <section className="content-section">
              <h3>10. Buy from Motivated Sellers</h3>
              <p>
                Look for urgency. Sellers who are relocating or upgrading often
                price their cars lower for quick sales.
              </p>
            </section>
          </div>

          <div className="article-footer">
            <div className="author-info">
              <div className="author-avatar">JD</div>
              <div>
                <h4>Aswin</h4>
                <p>Auto Expert</p>
              </div>
            </div>
            <div className="article-nav">
              <button className="nav-btn prev-btn" onClick={handlePrevClick}>
                <BsArrowLeft /> Previous: Buying Guide
              </button>
              <button className="nav-btn next-btn" onClick={handleNextClick}>
                Next: Maintenance Guide <BsArrowRight />
              </button>
            </div>
          </div>
        </article>

        <article className="blog-article" id="maintainance-checklist">
          <div className="article-header">
            <div className="article-meta">
              <span className="article-category">Maintainance guide</span>
              <span className="article-date">
                <FaCalendarAlt /> December 6, 2024
              </span>
            </div>
            <h2 className="article-title">Top Tips for Car Maintenance</h2>
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
            <img
              src="/images/blog1.webp"
              alt="Used car"
              loading="lazy"
              title="Top tips for car maintainance"
            />
          </div>

          <div className="article-body mt-4">
            <section className="content-section">
              <h3>1. Check Engine Oil</h3>
              <p>
                Keep your engine running smoothly. Check the oil level regularly
                and change it as recommended by your car's manual.
              </p>
            </section>

            <section className="content-section">
              <h3>2. Inspect Tire Pressure and Tread</h3>
              <p>
                Stay safe and save fuel. Maintain the correct tire pressure and
                check for worn-out tread to avoid blowouts and improve mileage.
              </p>
            </section>
            <section className="content-section">
              <h3>3. Test the Battery</h3>
              <p>
                Avoid unexpected breakdowns. Check for corrosion, secure
                connections, and battery charge—especially before long trips or
                seasonal changes.
              </p>
            </section>
            <section className="content-section">
              <h3>4. Top Up Fluids</h3>
              <p>
                Keep everything flowing. Check and refill coolant, brake fluid,
                windshield washer, and transmission fluid regularly.
              </p>
            </section>
            <section className="content-section">
              <h3>5. Replace Air Filters</h3>
              <p>
                Breathe clean and drive better. Dirty air filters affect engine
                performance and cabin air quality—replace them every
                10,000–15,000 km.
              </p>
            </section>
            <section className="content-section">
              <h3>6. Inspect Brakes</h3>
              <p>
                Don't compromise on safety. Listen for squealing or grinding,
                and have your brake pads, rotors, and fluid checked
                periodically.
              </p>
            </section>
            <section className="content-section">
              <h3>7. Examine Belts and Hoses</h3>
              <p>
                Prevent overheating and breakdowns. Look for cracks, leaks, or
                wear and tear in the engine belts and radiator hoses.
              </p>
            </section>
            <section className="content-section">
              <h3>8. Keep the Lights Working</h3>
              <p>
                Be seen and stay legal. Check headlights, brake lights,
                indicators, and interior lights regularly and replace bulbs as
                needed.
              </p>
            </section>
            <section className="content-section">
              <h3>9. Rotate and Align Tires</h3>
              <p>
                Extend tire life and improve handling. Rotate tires every
                5,000–8,000 km and get wheel alignment checked annually or if
                the car pulls to one side.
              </p>
            </section>
            <section className="content-section">
              <h3>10. Regular Washing and Waxing</h3>
              <p>
                Protect your car's paint and finish. Clean off dirt, salt, and
                bird droppings, and apply wax every few months to keep your car
                looking new.
              </p>
            </section>

            <section className="content-section">
              <h3>11. Follow the Service Schedule</h3>
              <p>
                Stay on track with maintenance. Refer to your owner's manual for
                service intervals and stick to the recommended schedule.
              </p>
            </section>
          </div>

          <div className="article-footer">
            <div className="author-info">
              <div className="author-avatar">JD</div>
              <div>
                <h4>Aswin</h4>
                <p>Auto Expert</p>
              </div>
            </div>
            <div className="article-nav">
              <button className="nav-btn prev-btn" onClick={handlePrevClick}>
                <BsArrowLeft /> Previous: Selling Guide
              </button>
              <button className="nav-btn next-btn" onClick={handleNextClick}>
                Next: Market Trends <BsArrowRight />
              </button>
            </div>
          </div>
        </article>

        <article className="blog-article" id="latest-trends">
          <div className="article-header">
            <div className="article-meta">
              <span className="article-category">Market Trends</span>
              <span className="article-date">
                <FaCalendarAlt /> December 6, 2024
              </span>
            </div>
            <h2 className="article-title">
              Latest Trends in the Used Car Market
            </h2>
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
            <img
              src="/images/blog1.webp"
              alt="Used car"
              loading="lazy"
              title="Latest Trends in the Used Car Market"
            />
          </div>

          <div className="article-body mt-4">
            <section className="content-section">
              <h3>1. Rising Demand for SUVs</h3>
              <p>
                SUVs continue to dominate the market with increased preference
                for higher seating positions and spacious interiors.
              </p>
            </section>

            <section className="content-section">
              <h3>2. Electric Vehicle Popularity Growth</h3>
              <p>
                More buyers are considering EVs due to lower running costs and
                improved charging infrastructure.
              </p>
            </section>

            <section className="content-section">
              <h3>3. Certified Pre-Owned Programs Expansion</h3>
              <p>
                Manufacturers are expanding certified programs to boost consumer
                confidence in used vehicles.
              </p>
            </section>

            <section className="content-section">
              <h3>4. Online Purchases Increase</h3>
              <p>
                The pandemic accelerated digital car buying trends that continue
                to grow with virtual tours and online paperwork.
              </p>
            </section>

            <section className="content-section">
              <h3>5. Shortage of New Cars Affecting Used Market</h3>
              <p>
                Semiconductor shortages have reduced new car inventory, driving
                more buyers to used options and increasing prices.
              </p>
            </section>

            <section className="content-section">
              <h3>6. Longer Ownership Periods</h3>
              <p>
                Improved vehicle reliability means people are keeping cars
                longer before selling, reducing quality used car inventory.
              </p>
            </section>

            <section className="content-section">
              <h3>7. Focus on Safety Features</h3>
              <p>
                Buyers increasingly prioritize advanced safety tech like
                automatic emergency braking and blind spot monitoring.
              </p>
            </section>

            <section className="content-section">
              <h3>8. Seasonal Price Fluctuations</h3>
              <p>
                Convertibles command higher prices in summer, while 4WD vehicles
                are more valuable in winter—timing matters.
              </p>
            </section>

            <section className="content-section">
              <h3>9. Regional Variations in Popular Models</h3>
              <p>
                Truck demand remains strong in rural areas, while urban centers
                see more interest in compact and hybrid vehicles.
              </p>
            </section>

            <section className="content-section">
              <h3>10. Increased Scrutiny of Vehicle History</h3>
              <p>
                Buyers are becoming more diligent about checking vehicle history
                reports before purchase decisions.
              </p>
            </section>
          </div>

          <div className="article-footer">
            <div className="author-info">
              <div className="author-avatar">JD</div>
              <div>
                <h4>Aswin</h4>
                <p>Auto Expert</p>
              </div>
            </div>
            <div className="article-nav">
              <button className="nav-btn prev-btn" onClick={handlePrevClick}>
                <BsArrowLeft /> Previous: Maintenance Guide
              </button>
              <button className="nav-btn next-btn" onClick={handleNextClick}>
                Next: Buying Guide <BsArrowRight />
              </button>
            </div>
          </div>
        </article>
      </div>

      <div className="newsletter-cta">
        <div className="cta-content">
          <h3>Get More Car Buying Tips</h3>
          <p>
            Subscribe to our newsletter for the latest advice and market trends
          </p>
          <form className="subscribe-form">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" onClick={handleSubscribe} disabled={loading}>
              {loading ? (
                <>Please wait....</>
              ) : (
                <>
                  {" "}
                  Subscribe <FaChevronRight />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="related-articles">
        <h3>More Helpful Guides</h3>
        <div className="article-grid">
          <div className="related-card">
            <img
              src="/images/blog2.webp"
              alt="Related article"
              title="How to Get the Best Price for Your Car"
            />
            <div className="card-content">
              <span className="card-category">Selling Guide</span>
              <h4>How to Get the Best Price for Your Car</h4>
              <p>Learn strategies to maximize your car's selling price</p>
              <a href="#best-price">Read More</a>
            </div>
          </div>

          <div className="related-card">
            <img
              src="/images/blog4.jpg"
              alt="Related article"
              title="Essential maintenance tasks to keep your car running smoothly"
            />
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
            <img
              src="/images/blog3.jpg"
              alt="Related article"
              title="Latest Trends in the Used Car Market"
            />
            <div className="card-content">
              <span className="card-category">Market Trends</span>
              <h4>Latest Trends in the Used Car Market</h4>
              <p>Stay informed about current market conditions</p>
              <a href="#latest-trends">Read More</a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BlogsScreen;
