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
    <section className="faq-section-modern" id="faq">
      <div className="faq-container">
        <h2 className="faq-title-modern">Frequently Asked Questions</h2>
        <div className="faq-list-modern">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item-modern ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-header-modern">
                <span className="faq-question-modern">{faq.question}</span>
                <span className="faq-toggle-icon">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer-modern">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
