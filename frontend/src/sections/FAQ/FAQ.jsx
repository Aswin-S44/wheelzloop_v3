import React, { useState } from "react";
import "./FAQ.css";

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button on the homepage and filling out the required details.",
    },
    {
      question: "How can I post my car for sale?",
      answer:
        "Once logged in, go to your profile, and click on post a car, provide the details of your car, and submit the form.",
    },
    {
      question: "What fees does Wheelzloop charge?",
      answer:
        "Posting a car is free, but we charge a small fee for premium features like highlighting your listing.",
    },
    {
      question: "How do I contact potential buyers?",
      answer:
        "Buyers will contact you via the details you provide in your listing or through our secure messaging system.",
    },
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Find answers to common questions about our platform
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question-container">
                <div className="faq-icon">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      strokeWidth="1.5"
                    />
                    <path
                      className="faq-icon-minus"
                      d="M8 12H16"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      className="faq-icon-plus"
                      d="M12 16V8M8 12H16"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="faq-question">{faq.question}</h3>
                <div className="faq-arrow">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M6 9L12 15L18 9"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="faq-answer-container">
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
