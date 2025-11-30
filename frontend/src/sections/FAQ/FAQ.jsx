import React, { useState } from "react";
import "./FAQ.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Creating an account is instant. Click the 'Sign Up' button on the top right, enter your email and password, or continue with Google/Facebook for one-click access.",
    },
    {
      question: "How can I post my car for sale?",
      answer:
        "Navigate to 'Sell Car' in your dashboard. Upload clear photos, fill in the specs (Year, Make, Model), set your price, and hit publish. Our AI will help optimize your listing.",
    },
    {
      question: "What fees does CarAuras charge?",
      answer:
        "Basic listings are 100% free! We only charge a small success fee when a transaction is completed through our secure payment gateway, or if you opt for Premium Visibility.",
    },
    {
      question: "How do I contact potential buyers?",
      answer:
        "We prioritize privacy. All communication happens via our secure in-app chat. You will be notified via email/SMS instantly when a buyer sends a message or offer.",
    },
  ];
 
  return (
    <section className="faq-modern-section" id="faq">
      <div className="faq-bg-blur"></div>

      <div className="faq-container-modern">
        <div className="faq-header-modern">
          <div className="icon-badge">
            <HelpOutlineIcon />
          </div>
          <h2 className="faq-title-modern">
            Frequently Asked <span className="faq-highlight">Questions</span>
          </h2>
          <p className="faq-desc-modern">
            Everything you need to know about buying and selling on our
            platform.
          </p>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-card ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-card-header">
                <h3 className="faq-question-text">{faq.question}</h3>
                <div className="faq-toggle-btn">
                  {activeIndex === index ? <RemoveIcon /> : <AddIcon />}
                </div>
              </div>
              <div
                className="faq-card-body"
                style={{
                  maxHeight: activeIndex === index ? "200px" : "0",
                  opacity: activeIndex === index ? 1 : 0,
                }}
              >
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
