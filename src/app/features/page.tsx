"use client";

import { Transition, TransitionChild } from "@headlessui/react";
import {
  FaComments,
  FaEdit,
  FaLock,
  FaMoon,
  FaPhone,
  FaPhotoVideo,
  FaSearch,
  FaSmile,
  FaStar,
  FaUserFriends,
  FaVideo
} from "react-icons/fa";

import { motion } from "framer-motion";
import { useState } from "react";
import { IconType } from "react-icons/lib";
import { InView } from "react-intersection-observer";

type Feature = {
  icon: IconType;
  heading: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: FaPhotoVideo,
    heading: "Media Sharing",
    description:
      "Share photos and documents effortlessly. Keep your conversations lively with multimedia content.",
  },
  {
    icon: FaLock,
    heading: "Secure Messaging",
    description:
      "End-to-end encryption for your messages to keep your conversations private and secure.",
  },
  {
    icon: FaVideo,
    heading: "Video Calls",
    description: "High-quality video calls to connect face-to-face.",
  },
  {
    icon: FaPhone,
    heading: "Audio Calls",
    description: "Crystal-clear audio calls for seamless voice communication.",
  },
  {
    icon: FaSmile,
    heading: "Custom Emojis",
    description: "Express yourself with custom emojis.",
  },
  {
    icon: FaMoon,
    heading: "Dark Mode",
    description: "A night-time mode to reduce eye strain.",
  },
  {
    icon: FaUserFriends,
    heading: "Group Chats",
    description: "Create group chats to stay connected with multiple friends.",
  },
  {
    icon: FaSearch,
    heading: "Search",
    description: "Easily find messages and media with advanced search functionality.",
  },
  {
    icon: FaStar,
    heading: "Message Reactions",
    description: "React to messages with a variety of emojis.",
  },
  {
    icon: FaEdit,
    heading: "Message Manipulation",
    description: "Edit or delete messages to correct mistakes or remove unwanted content.",
  },
];

const Page = () => {
  const [lastCardInView, setLastCardInView] = useState<boolean>(false);

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  }


  const textContainerVariant = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 }
    }
  }

  return (
    <section id="features" className="py-10">
      <motion.div className="container mx-auto px-6" variants={textContainerVariant} initial="hidden" animate="visible">
        <div className="text-center">
          <motion.h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-10 text-white border-b-4 inline-block py-2" variants={textVariants}>
            Everything you need for effortless conversations
          </motion.h2>
        </div>

        <motion.div className="mt-5" variants={textVariants}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-5 text-indigo-600">
            Current Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="opactiy-100 translate-y-0">
                <div className="flex gap-4 p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 glow-effect">
                  <FaComments className="h-24 w-24 text-indigo-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Text Messaging
                    </h3>
                    <p className="text-gray-600">
                      Enjoy seamless and reliable text messaging with friends
                      and family.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-10" variants={textVariants}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-7 text-gray-500">
            Features that may come
          </h3>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 sm:gap-12">
            {features.map((feature, index) => (
              <InView
                key={index}
                triggerOnce
                onChange={(inView) => {
                  if (index == features.length - 1 && inView) {
                    // Only update lastCardInView state if the last card is in view to prevent premature state updates
                    if (index === features.length - 1 && inView) {
                      setLastCardInView(true);
                    }
                  }
                }}
                className="z-[1]"
              >
                {({ inView, ref }) => (
                  <div ref={ref}>
                    <Transition show={inView}>
                      <TransitionChild
                        as="div"
                        enter="ease-in duration-[1000ms] transition-all sm:transition-none"
                        enterFrom="opacity-0 translate-y-48 sm:translate-y-0 sm:opacity-100"
                        enterTo="opacity-100 translate-y-0"
                        // className="w-full "
                      >
                        <div className="flex items-center justify-center gap-4 p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 glow-effect">
                          <feature.icon className="h-24 w-24 text-gray-500 mr-4" />
                          <div>
                            <h3 className="text-xl font-semibold mb-2">
                              {feature.heading}
                            </h3>
                            <p className="text-gray-600">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </TransitionChild>
                    </Transition>
                  </div>
                )}
              </InView>
            ))}
          </motion.div>
          <div className="mt-20 text-center text-white text-sm">
            <p>
              Some features listed are for design purposes and may not be
              available at launch. Stay tuned for updates!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Page;
