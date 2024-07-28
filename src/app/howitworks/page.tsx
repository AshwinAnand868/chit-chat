"use client";

import Image from "next/image";
import { useState } from "react";

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
    <section className="flex justify-center items-center h-[100vh] max-h-[100vh] md:h-[70vh] mt-0 md:mt-16">
      <div className="bg-[#333] w-[90vw] h-[100vh] max-h-[100vh] md:w-[70%] md:h-[85vh] grid grid-cols-1 md:grid-cols-2 sm:items-center justify-between py-10 sm:py-0 px-[5vw] lg:px-10 rounded-xl mt-10 md:my-8">
        {/* CONTENT CONTAINER */}
        <div className="h-auto">
          <div className="py-0 pr-0 pl-[2rem]">
            <h1 className="text-white text-[20px] sm:text-[1.2rem] lg:text-[2rem] mb-2 sm:mb-5">
              Simplified chatting experience
            </h1>
            <ul className="list-disc ml-6 space-y-1 lg:space-y-5">
              <li className="text-[#cbcbcb] text-[16px] lg:text-[1.25rem] leading-[1.875rem] mb-2">
                Create your account
              </li>
              <li className="text-[#cbcbcb] text-[16px] lg:text-[1.25rem] leading-[1.875rem] mb-2">
                Add your friend or loved one
              </li>
              <li className="text-[#cbcbcb] text-[16px] lg:text-[1.25rem] leading-[1.875rem] mb-2">
                Chat with them
              </li>
            </ul>
          </div>
          {/* <div className="py-0 pr-0 pl-[2rem]">
            <h1 className="text-white text-[3rem] md:text-[4rem] font-normal">
              this is a heading
            </h1>
          </div>
          <div className="py-0 pr-0 pl-[2rem]">
            <p className="text-[#cbcbcb] text-[1rem] leading-[1.875rem]">
              this is a paragraph
            </p>
          </div>

          <div className="py-0 pr-0 pl-[2rem]">
            <button className="flex py-[0.9375rem] px-[1.875rem] rounded-full border-[1px] border-[#eb5757] bg-transparent text-[#eb5757] text-center text-[1rem] uppercase cursor-pointer transition-colors hover:bg-[#eb5757] hover:text-white hover:transition-colors">
              this is a button
            </button>
          </div> */}
        </div>

        {/* IMAGES CONTAINER */}
        <div className="flex flex-row-reverse items-center justify-start relative h-[7rem] md:h-[15rem]">
          <div className="z-[2] w-clamp absolute">
            <Image
              alt="first image"
              src={"/image-one.png"}
              className="rounded-[1.56rem] border-[5px] border-[#eb575b] md:w-clamp h-[350px] w-[250px] md:h-[320px]"
              width={100}
              height={100}
            />
          </div>

          <div className="z-[1] w-clamp h-auto absolute">
            <Image
              alt="first image"
              src={"/image-two.png"}
              className="rounded-[1.56rem] border-[5px] border-[#eb575b] md:w-clamp h-[270px] w-[200px] md:h-[320px]"
              width={100}
              height={100}
            />
          </div>

          <div className="z-0 w-clamp h-auto absolute">
            <Image
              alt="first image"
              src={"/image-three.png"}
              className="rounded-[1.56rem] border-[5px] border-[#eb575b] md:w-clamp h-[270px] w-[200px] md:h-[320px]"
              width={100}
              height={100}
            />
          </div>

          {/* controls */}

          <div className="flex justify-between absolute left-10 top-[11rem] sm:top-[15rem] bottom-0 w-[7.5rem] z-[3] transform translate-y-[5rem]">
            <button className="py-[0.8rem] px-[0.8rem] rounded-full flex items-center justify-center border-2 border-transparent bg-transparent transition duration-300 ease-in-out h-[3.5rem] w-[3.5rem] md:h-[4rem] md:w-[4rem] hover:border-[#eb5757]">
              <Image
                alt="button 1"
                src={"/previous-disabled.svg"}
                width={50}
                height={50}
              />
            </button>

            <button className="py-[0.8rem] px-[0.8rem] rounded-full flex items-center justify-center border-2 border-transparent bg-transparent transition duration-300 ease-in-out h-[3.5rem] w-[3.5rem] md:h-[4rem] md:w-[4rem] hover:border-[#eb5757]">
              <Image
                alt="button 1"
                src={"/next-enabled.svg"}
                width={50}
                height={50}
              />
            </button>
          </div>
        </div>
      </div>
    </section>

    //     <div className="h-[85vh] flex items-center justify-center">
    // <div className="relative w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    //       <div className="flex items-center justify-between mb-4">
    //         <button
    //           onClick={handlePrevious}
    //           disabled={currentStep === 1}
    //           className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full ${
    //             currentStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
    //           }`}
    //         >
    //           <FaArrowLeft className="text-gray-500" />
    //         </button>
    //         <h3 className="text-[16px] sm:text-lg font-bold">{steps[currentStep - 1].content}</h3>
    //         <button
    //           onClick={handleNext}
    //           disabled={currentStep === steps.length}
    //           className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full ${
    //             currentStep === steps.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
    //           }`}
    //         >
    //           <FaArrowRight className="text-gray-500" />
    //         </button>
    //       </div>

    //       <div className="mt-4 flex justify-center">
    //         {steps.map((step) => (
    //           <div
    //             key={step.id}
    //             className={`h-2 w-2 mx-1 rounded-full cursor-pointer ${
    //               step.id === currentStep ? 'bg-blue-500' : 'bg-gray-300'
    //             }`}
    //             onClick={() => (
    //                 setCurrentStep(step.id)
    //             )}
    //           ></div>
    //         ))}
    //       </div>
    //     </div>
    //     </div>
  );
};

export default Carousel;
