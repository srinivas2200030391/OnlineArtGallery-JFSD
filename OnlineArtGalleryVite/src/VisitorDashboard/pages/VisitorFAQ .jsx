import React, { useState } from "react";

const faqs = [
  {
    question: "What is the Online Art Gallery?",
    answer:
      "The Online Art Gallery is a platform for artists, curators, and visitors to explore and showcase artworks, buy and sell art, and connect with art enthusiasts worldwide.",
  },
  {
    question: "How can I view artworks?",
    answer:
      "You can view artworks by navigating to the Artwork Gallery section of the dashboard. Use filters to explore specific categories or artists.",
  },
  {
    question: "Can I purchase artworks directly?",
    answer:
      "Yes, you can purchase artworks directly through the platform by clicking on the 'Buy Now' button on the artwork details page.",
  },
  {
    question: "How do I contact an artist?",
    answer:
      "You can contact an artist by visiting their profile and using the provided contact information or message form.",
  },
  {
    question: "Is there a subscription fee for visitors?",
    answer:
      "No, visitors can explore the gallery for free. However, premium features may require a subscription.",
  },
];

const VisitorFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-gray-100 rounded-t-lg flex justify-between items-center">
              <span className="font-medium">{faq.question}</span>
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 bg-white rounded-b-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorFAQ;
