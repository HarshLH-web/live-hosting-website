import { useState } from 'react';

const FaqAccordion = ({ faqs = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null); // Tracks the active FAQ index

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };


  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-4">
      <div className="">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-300 overflow-hidden last:border-b-0"
          >
            {/* Question Button */}
            <button
              className={`w-full text-left px-4 py-3 hover:bg-gray-200 flex justify-between items-center transition-all duration-300 ${activeIndex === index ? 'bg-gray-200' : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-base md:text-lg font-semibold">{faq.question}</span>
              {/* Arrow Icon */}
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 min-w-5 ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Answer Section */}
            <div
              className={`px-4 overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-[500px] py-4' : 'max-h-0'
              }`}
              style={{ transitionTimingFunction: 'ease-in-out' }}
            >
              <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
