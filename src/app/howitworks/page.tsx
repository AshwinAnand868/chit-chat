"use client";

import { motion } from "framer-motion";
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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [transitionDirection, setTransitionDirection] =
    useState<string>("next");

  const handlePrevious = () => {
    setTransitionDirection("previous");
    setCurrentStep((currentStep) =>
      currentStep === 0 ? currentStep : currentStep - 1
    );
  };

  const handleNext = () => {
    setTransitionDirection("next");
    setCurrentStep((currentStep) =>
      currentStep === 2 ? currentStep : currentStep + 1
    );
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: transitionDirection === "next" ? 100 : -100,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const textContainerVariant = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="bg-[#333] flex justify-center w-[100vw] h-[100vh] md:h-[87.6vh] mt-0 overflow-hidden sm:overflow-auto">
      <div className="w-[100vw] lg:w-[75vw] grid grid-cols-1 md:grid-cols-2 sm:items-center justify-between py-10 sm:py-0 px-[5vw] lg:px-10 rounded-xl md:my-8">
        {/* CONTENT CONTAINER */}
        <motion.div
          className="h-auto"
          variants={textContainerVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="py-0 pr-0 pl-[2rem]">
            <motion.h1
              className="text-white text-[20px] sm:text-[1.2rem] lg:text-[2rem] mb-2 sm:mb-5"
              variants={textVariants}
            >
              Simplified chatting experience
            </motion.h1>
            <motion.ul
              className="list-disc ml-6 space-y-1 lg:space-y-5"
              variants={textContainerVariant}
            >
              <motion.li
                className="text-[#cbcbcb] text-[16px] lg:text-[1.25rem] leading-[1.875rem] mb-2"
                variants={textVariants}
              >
                Create your account
              </motion.li>
              <motion.li
                className="text-[#cbcbcb] text-[16px] lg:text-[1.25rem] leading-[1.875rem] mb-2"
                variants={textVariants}
              >
                Add your friend or loved one
              </motion.li>
              <motion.li
                className="text-[#cbcbcb] text-[16px] lg:text-[1.25rem] leading-[1.875rem] mb-2"
                variants={textVariants}
              >
                Chat with them
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* IMAGES CONTAINER */}
        <div className="flex flex-row-reverse items-center justify-start relative h-[7rem] md:h-[15rem] w-auto" >
          <motion.div className="z-[2] w-clamp absolute" 
            animate={{
              opacity: 
                currentStep === 0 ? 1 : currentStep === 1 ? 0 : 0,
              x:
                currentStep === 0
                  ? "0px"
                  : currentStep == 1 ? "96px" : "96px",
              scale:
                currentStep === 0
                ? 1
                : currentStep == 0 ? 1.2 : 1.2,
            }}
            transition={{
              duration: 0.5,
              delay: 0,
              ease: "easeInOut"
            }}
          >
            <Image
              alt="first image"
              src={"/image-one.png"}
              className="rounded-[1.56rem] border-[5px] border-[#eb575b] md:w-clamp h-[270px] w-[200px] md:h-[320px]" // h-[350px] w-[250px] md:h-[320px]
              width={100}
              height={100}
            />
          </motion.div>

          <motion.div className="z-[1] w-clamp absolute"
           animate={{
            opacity: 
              currentStep === 0 ? 0.66 : currentStep === 1 ? 1 : 0,
            x:
              currentStep === 0
                ? "-96px"
                : currentStep == 1 ? "0px" : "96px",
            scale:
              currentStep === 0
              ? 0.8
              : currentStep == 1 ? 1 : 1.2,
          }}
          transition={{
            duration: 0.5,
            delay: 0,
            ease: "easeInOut"
          }}
          >
            <Image
              alt="first image"
              src={"/image-two.png"}
              className="rounded-[1.56rem] border-[5px] border-[#eb575b] md:w-clamp h-[270px] w-[200px] md:h-[320px]"
              width={100}
              height={100}
            />
          </motion.div>

          <motion.div className="z-0 w-clamp absolute"
            animate={{
              opacity: 
                currentStep === 0 ? 0.33 : currentStep === 1 ? 0.66 : 1,
              x:
                currentStep === 0
                  ? "-192px"
                  : currentStep == 1 ? "-96px" : "0px",
              scale:
                currentStep === 0
                ? 0.6
                : currentStep == 1 ? 0.8 : 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0,
              ease: "easeInOut"
            }}
          >
            <Image
              alt="first image"
              src={"/image-three.png"}
              className="rounded-[1.56rem] border-[5px] border-[#eb575b] md:w-clamp h-[270px] w-[200px] md:h-[320px]"
              width={100}
              height={100}
            />
          </motion.div>

          {/* controls */}

          <div className="flex justify-between items-center absolute left-10 top-[11rem] sm:top-[15rem] bottom-0 w-[7.5rem] sm:w-[9rem] z-[3] transform translate-y-[5rem] pb-[4rem]">
            <button
              onClick={handlePrevious}
              className={
                currentStep === 0
                  ? `disabled h-[3.5rem] w-[3.5rem] md:h-[4rem] md:w-[4rem]`
                  : `py-[0.8rem] px-[0.8rem] rounded-full flex items-center justify-center border-2 border-transparent bg-transparent transition duration-300 ease-in-out h-[3.5rem] w-[3.5rem] md:h-[4rem] md:w-[4rem] hover:border-[#eb5757]`
              }
            >
              <Image
                alt="button 1"
                src={
                  currentStep === 0
                    ? "/previous-disabled.svg"
                    : "/previous-enabled.svg"
                }
                width={50}
                height={50}
              />
            </button>

            <button
              onClick={handleNext}
              className={
                currentStep === 2
                  ? "disabled h-[3.5rem] w-[3.5rem] md:h-[4rem] md:w-[4rem]"
                  : "py-[0.8rem] px-[0.8rem] rounded-full flex items-center justify-center border-2 border-transparent bg-transparent transition duration-300 ease-in-out h-[3.5rem] w-[3.5rem] md:h-[4rem] md:w-[4rem] hover:border-[#eb5757]"
              }
            >
              <Image
                alt="button 2"
                src={
                  currentStep === 2 ? "/next-disabled.svg" : "/next-enabled.svg"
                }
                width={50}
                height={50}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
