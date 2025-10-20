import React, { useState } from "react";
import { useSelector } from "react-redux";

const Hero = () => {
  const [title, setTitle] = useState("We are always here to serve you.");
  const [showMenu, setShowMenu] = useState(false);
  const [toggle, setToggle] = useState(false);
  const productItems = useSelector((state) => state.cart);
  console.log(productItems.length);

  const toggleClass = () => {
    setShowMenu(!showMenu);
    const closeAfterClick = document.querySelector("#nav-icon4");
    closeAfterClick?.classList?.toggle("open");
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[url('https://www.tailwindtap.com/assets/components/hero/food-delivery/banner.jpg')] bg-no-repeat w-full bg-cover bg-left-bottom sm:bg-center">
      <div className="bg-black/60 h-full w-full absolute"></div>
      <div className="flex justify-between sm:justify-end gap-3.5 items-center pt-5 sm:pt-5 z-30">
        <div className="flex justify-between sm:justify-end sm:gap-5 items-center w-full px-8">
          <button
            className="w-12 h-12 relative focus:outline-none sm:hidden overscroll-none top-2.5"
            onClick={() => {
              toggleClass();
              setToggle(!toggle);
            }}
            aria-label="Toggle Menu"
          >
            <div className="block w-5 absolute left-5 top-1/3 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <span
                className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-300 ease-in-out ${
                  toggle ? "rotate-45" : "-translate-y-2"
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-300 ease-in-out ${
                  toggle && "opacity-0"
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-7 text-white bg-current transform transition duration-300 ease-in-out ${
                  toggle ? "-rotate-45" : "translate-y-2"
                }`}
              ></span>
            </div>
          </button>

          <div
            className={`border-[2px] z-30 border-orange-600 bg-[#050C24] rounded-xl absolute top-[70px] left-5 block sm:hidden p-0.5 ${
              toggle ? "visible" : "invisible"
            }`}
          >
            <div className="p-3 rounded-xl min-w-[180px] text-center">
              <div className="text-white z-50 text-2xl font-normal font-hindVadodara leading-6 tracking-[0.01] cursor-pointer hover:text-orange-600">
                Home
              </div>
              <div className="mt-4 text-white z-50 text-2xl font-normal font-hindVadodara leading-6 tracking-[0.04] cursor-pointer hover:text-orange-600">
                Menu
              </div>
              <div className="mt-4 text-white z-[100] text-2xl font-normal font-hindVadodara leading-6 tracking-[0.01] cursor-pointer hover:text-orange-600">
                Pricing
              </div>
            </div>
          </div>

          <div className="sm:flex gap-5 items-center hidden">
            <div className="capitalize text-white text-lg font-semibold hover:text-orange-600 cursor-pointer">
              Home
            </div>
            <div className="capitalize cursor-pointer text-lg font-semibold text-white hover:text-orange-600">
              Menu
            </div>
            <div className="capitalize cursor-pointer text-lg font-semibold text-white hover:text-orange-600">
              Pricing
            </div>
            <button className="bg-transparent border text-lg font-semibold border-orange-600 py-1.5 px-5 rounded-md h-max text-white hover:bg-orange-600">
              Login
            </button>
          </div>

   <div className="relative">
  <svg
    className="w-8 h-8 text-white"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
    {productItems.length}
  </span>
</div>



          <button className="block sm:hidden bg-transparent border border-orange-600 py-1.5 px-5 rounded-md h-max text-white hover:bg-orange-600">
            Login
          </button>
        </div>

        {/* <div
          className={`transition-all ease-in-out z-50 ${
            showMenu
              ? "flex flex-col min-h-screen h-max w-full left-0 top-0 fixed bg-[#2D4263]"
              : "flex flex-col h-screen w-full top-0 left-full fixed bg-[#2D4263]"
          }`}
        >
          <div
            className="flex pt-5 items-center justify-end text-xl font-bold px-[10%] w-full gap-6"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              src={"/assets/nft/infytoken/close.svg"}
              alt="close"
              className="h-7 cursor-pointer"
            />
            <h1 className="text-amber-50 select-none">
              Cart Items: {productItems.length}
            </h1>
          </div>

          <div className="flex flex-col w-full items-center justify-center h-screen gap-[30px] sm:gap-[50px] sm:text-lg text-[20px] leading-[29px] font-normal md:gap-[60px]">
            <div className="text-white text-2xl font-normal font-hindVadodara leading-6 tracking-[0.01] cursor-pointer hover:text-orange-600">
              Home
            </div>
            <div className="text-white text-2xl font-normal font-hindVadodara leading-6 tracking-[0.01] cursor-pointer hover:text-orange-600">
              Menu
            </div>
            <div className="text-white text-2xl font-normal font-hindVadodara leading-6 tracking-[0.01] cursor-pointer hover:text-orange-600">
              Pricing
            </div>
          </div>
        </div> */}
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
