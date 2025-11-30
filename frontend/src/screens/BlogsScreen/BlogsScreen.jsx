import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogsScreen.css";
import Swal from "sweetalert2";
import {
  FaShareAlt,
  FaChevronRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { ADD_SUBSCRIPTION_URL } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchEntries } from "../../contentfull/contentfulClient";
import { convertContentfullResponse } from "../../utils/utils";
import Loader from "../../components/Loader/Loader";

function BlogScreen() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [blogIndex, setBlogIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);
      const res = await fetchEntries();
      setPageLoading(false);

      if (res) {
        let formatedData = await convertContentfullResponse(res);
        setBlogs(formatedData);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      const index = slug ? blogs.findIndex((blog) => blog.slug === slug) : 0;
      if (index !== -1) {
        setBlogIndex(index);
        setCurrentBlog(blogs[index]);
      }
    }
  }, [slug, blogs]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await axios.post(ADD_SUBSCRIPTION_URL, { email });
      setLoading(false);
      if (res && res.status === 200) {
        Swal.fire({
          title: "Welcome Aboard!",
          text: "You've successfully subscribed to our newsletter.",
          icon: "success",
          confirmButtonColor: "#2563EB",
        });
      } else {
        toast.info("You are already subscribed.");
      }
      setEmail("");
    } catch (error) {
      toast.info("You are already subscribed.");
      setLoading(false);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevClick = () => {
    if (blogIndex > 0) {
      navigate(`/blogs/${blogs[blogIndex - 1].slug}`);
      scrollToTop();
    }
  };

  const handleNextClick = () => {
    if (blogIndex < blogs.length - 1) {
      navigate(`/blogs/${blogs[blogIndex + 1].slug}`);
      scrollToTop();
    }
  };

  const handleRelatedBlogClick = (index) => {
    navigate(`/blogs/${blogs[index].slug}`);
    scrollToTop();
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
  };

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (pageLoading) {
    return <Loader />;
  }

  if (!currentBlog && !pageLoading && slug) {
    return (
      <div className="error-container">
        <h2>Blog post not found</h2>
        <button onClick={() => navigate("/")} className="back-home-btn">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="blog-page-wrapper">
      <div className="main-content-grid">
        <main className="blog-main mt-5">
          {currentBlog && (
            <article className="article-container">
              <header className="article-header">
                <div className="article-badges">
                  <span className="category-badge">
                    {currentBlog?.category || "Automotive"}
                  </span>
                  <span className="read-time">
                    <FaClock /> {calculateReadingTime(currentBlog?.description)}
                  </span>
                </div>

                <h1 className="article-title">{currentBlog?.title}</h1>

                <div className="article-meta-row">
                  <div className="author-block">
                    <div className="author-icon">
                      <FaUser />
                    </div>
                    <div className="author-details">
                      <span className="author-name">Aswin</span>
                      <span className="author-role">Auto Expert</span>
                    </div>
                  </div>
                  <div className="share-actions">
                    <button onClick={handleShare} className="share-circle">
                      <FaShareAlt />
                    </button>
                    <button onClick={handleShare} className="share-circle">
                      <FaFacebookF />
                    </button>
                    <button onClick={handleShare} className="share-circle">
                      <FaTwitter />
                    </button>
                    <button onClick={handleShare} className="share-circle">
                      <FaLinkedinIn />
                    </button>
                  </div>
                </div>
              </header>

              <div className="article-featured-image">
                <img
                  src={currentBlog?.image}
                  alt={currentBlog?.alt || "Blog Cover"}
                  loading="lazy"
                />
              </div>

              <div className="article-body-content">
                <p>{currentBlog?.description}</p>
              </div>

              <div className="article-navigation">
                <button
                  className={`nav-control prev ${
                    blogIndex === 0 ? "disabled" : ""
                  }`}
                  onClick={handlePrevClick}
                  disabled={blogIndex === 0}
                >
                  <BsArrowLeft />
                  <div className="nav-text">
                    <span>Previous Article</span>
                  </div>
                </button>
                <div className="nav-divider"></div>
                <button
                  className={`nav-control next ${
                    blogIndex === blogs.length - 1 ? "disabled" : ""
                  }`}
                  onClick={handleNextClick}
                  disabled={blogIndex === blogs.length - 1}
                >
                  <div className="nav-text">
                    <span>Next Article</span>
                  </div>
                  <BsArrowRight />
                </button>
              </div>
            </article>
          )}
        </main>
      </div>

      <section className="related-section">
        <div className="related-container">
          <h3>You Might Also Like</h3>
          <div className="related-grid">
            {blogs
              .filter((_, idx) => idx !== blogIndex)
              .slice(0, 3)
              .map((blog) => {
                const originalIndex = blogs.findIndex((b) => b.id === blog.id);
                return (
                  <div
                    key={blog.id}
                    className="related-card"
                    onClick={() => handleRelatedBlogClick(originalIndex)}
                  >
                    <div className="card-image-wrapper">
                      <img src={blog.image} alt={blog.alt} />
                      <span className="card-cat-overlay">
                        {blog.category || "Guide"}
                      </span>
                    </div>
                    <div className="card-info">
                      <h4>{blog.title}</h4>
                      <p>{blog.description?.substring(0, 80)}...</p>
                      <span className="read-more">
                        Read Article <BsArrowRight />
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default BlogScreen;
