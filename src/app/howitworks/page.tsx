"use client";

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Step = {
  id: number;
  content: string;
};

const steps: Step[] = [
  { id: 1, content: "Step 1 Content" },
  { id: 2, content: "Step 2 Content" },
  { id: 3, content: "Step 3 Content" },
];

const Carousel = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="h-[85vh] flex items-center justify-center">
<div className="relative w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full ${
            currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <FaArrowLeft className="text-gray-500" />
        </button>
        <h3 className="text-[16px] sm:text-lg font-bold">{steps[currentStep - 1].content}</h3>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length}
          className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full ${
            currentStep === steps.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <FaArrowRight className="text-gray-500" />
        </button>
      </div>

      <div className="mt-4 flex justify-center">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`h-2 w-2 mx-1 rounded-full cursor-pointer ${
              step.id === currentStep ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => (
                setCurrentStep(step.id)
            )}
          ></div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Carousel;
