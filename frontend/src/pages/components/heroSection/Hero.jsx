import React, { useState } from "react";
const Hero = () => {
  const [title, setTitle] = useState("We are always here to serve you.");

  return (
    <div className="min-h-screen relative flex flex-col bg-[url('https://www.tailwindtap.com/assets/components/hero/food-delivery/banner.jpg')] bg-no-repeat w-full bg-cover bg-left-bottom sm:bg-center">
      <div className="bg-black/60 h-full w-full absolute"></div>
      <div className="flex justify-between sm:justify-end gap-3.5 items-center pt-5 sm:pt-5 z-30">
      </div>

      <div className="min-h-[calc(100vh-69px)] sm:min-h-[calc(100vh-63px)] flex items-center justify-center px-1 z-10">
        <div className="flex flex-col gap-2.5 pb-3 sm:min-w-[448px] max-w-md">
          <h1 className="text-3xl sm:text-4xl text-orange-600 text-center font-semibold tracking-wider">
            Flavors Of Nepal
          </h1>
          <h1 className="text-xl sm:text-2xl text-white text-center w-fit mx-auto transition-all ease-in-out duration-500 mt-1">
            {title}
          </h1>
          <div className="flex justify-center mt-2 flex-col gap-5 sm:gap-7 items-center">
            <div className="flex items-center gap-4 justify-center w-fit">
              <div
                className="rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-md hover:shadow-orange-600 cursor-pointer group pt-2"
                onMouseEnter={() =>
                  setTitle("Bringing Your Favorite Food to You")
                }
                onMouseLeave={() => setTitle("We are always here to serve you.")}
              >
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 125"
                  width="40"
                  height="40"
                >
                  <path d="m44.3 5.8c0.6 0 1.1 0.4 1.1 1v27.5c0 2.1-0.9 3.9-2.2 5.2-1.4 1.4-2.2 3.4-2.2 5.4v46.5c0 1.6-1.3 2.8-2.9 2.8-1.5 0-2.8-1.2-2.8-2.8v-46.8c0-1.9-0.7-3.6-2-4.9l-0.3-0.2c-1.3-1.3-2.1-3.1-2.1-5.2v-27.5c0-0.6 0.5-1.1 1.1-1.1 0.6 0 1 0.5 1 1v27.5c0 1 0.4 1.9 1.1 2.5 0.7 0.7 1.3 1.7 1.3 3v46.5c0 1.6 1.3 2.8 2.9 2.8 1.5 0 2.8-1.2 2.8-2.8v-46.5c0-1.2 0.6-2.3 1.3-3 0.7-0.7 1.1-1.5 1.1-2.5v-27.5c0-0.5 0.4-1 1-1z" />
                </svg>
              </div>
              <div
                className="rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-md hover:shadow-orange-600 cursor-pointer group pt-2"
                onMouseEnter={() => setTitle("Our Food Is Always Fresh & Healthy")}
                onMouseLeave={() => setTitle("We are always here to serve you.")}
              >
                <svg
                  className="text-orange-600 min-w-[20px] min-h-[20px] fill-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <div
                className="rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-md hover:shadow-orange-600 cursor-pointer group pt-2"
                onMouseEnter={() => setTitle("Fast Delivery At Your Doorstep")}
                onMouseLeave={() => setTitle("We are always here to serve you.")}
              >
                <svg
                  version="1.2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 125"
                  width="40"
                  height="40"
                >
                  <path d="m33.6 36.3h-8.4v-8.4c0-3 2.5-5.5 5.5-5.5h37.8c3 0 5.5 2.5 5.5 5.5v16.4h-8.4c-5.7 0-10.2 4.5-10.2 10.2s4.5 10.2 10.2 10.2h8.4v1.3c0 5.1-4.1 9.2-9.2 9.2s-9.2-4.1-9.2-9.2v-6.8h-5.5v6.8c0 7.6 6.2 13.7 13.7 13.7s13.7-6.2 13.7-13.7v-1.3h2.6c3.7 0 6.7-3 6.7-6.7v-23.8c0-3.7-3-6.7-6.7-6.7h-40.7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
