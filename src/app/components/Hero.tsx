import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mt-8 sm:mt-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center h-[85vh]">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-xl md:text-2xl xl:text-4xl font-bold mb-6">
            Effortless Conversations, Anytime, Anywhere
          </h1>
          <p className="text-[16px] md:text-lg text-gray-500 mb-10">
            Experience the future of messaging with our intuitive and secure
            chat app. Stay connected with your friends and family effortlessly.
          </p>
          <Link
            href="/login"
            className="bg-black text-white py-3 px-6 rounded-full text-lg hover:bg-gray-100 hover:text-black transition-all inline-flex items-center"
          >
            Get Started Now!
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-red-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>

        <div className="flex-1 mt-10 md:mt-0 flex items-center justify-center bg-cover">
          <Image
            src={"/heroimage.jpg"}
            alt="A girl chatting on her mobile"
            className="w-full h-[300px] md:w-[400px] md:h-[400px] xl:w-[500px] xl:h-[450px] 2xl:h-[500px]"
            width={100}
            height={50}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
