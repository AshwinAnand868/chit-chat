"use client";

import { Transition, TransitionChild } from "@headlessui/react";
import {
  FaComments,
  FaLock,
  FaMoon,
  FaPhotoVideo,
  FaSmile,
  FaVideo,
} from "react-icons/fa";

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
    icon: FaSmile,
    heading: "Custom Emojis",
    description: "Express yourself with custom emojis.",
  },
  {
    icon: FaMoon,
    heading: "Dark Mode",
    description: "A night-time mode to reduce eye strain.",
  },
];

const Page = () => {
  const [lastCardInView, setLastCardInView] = useState<boolean>(false);

  return (
    <section id="features" className="py-10">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-10 text-white border-b-4 inline-block py-2">
            Everything you need for effortless conversations
          </h2>
        </div>

        <div className="mt-5">
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
        </div>

        <div className="mt-10">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-7 text-gray-500">
            Features that may come
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 sm:gap-12">
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
          </div>
          <div className="mt-20 text-center text-white text-sm">
            <p>
              Some features listed are for design purposes and may not be
              available at launch. Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
