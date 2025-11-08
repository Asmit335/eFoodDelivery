import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProfile, logOutData } from '../../../store/authSlice';
import { useEffect } from 'react';
import { fetchCartItems } from '../../../store/cartSlice';

const Navbar = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {data:userData}=useSelector((state)=>state.auth)
    const [toggle, setToggle] = useState(false);
    const {productItems} = useSelector((state) => state.cart);

    const toggleClass = () => {
    const closeAfterClick = document.querySelector("#nav-icon4");
    closeAfterClick?.classList?.toggle("open");
  };

  const handleLogout=()=>{
    dispatch(logOutData())
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(()=>{
    dispatch(fetchCartItems())
    dispatch(fetchProfile())
  },[dispatch])

  return (
    <>   <div className="flex justify-between sm:justify-end sm:gap-5 items-center w-full px-8">
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
               <Link to="/">Home</Link>
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
              <Link to="/">Home</Link>
            </div>
            <Link to="/profile" className="capitalize cursor-pointer text-lg font-semibold text-white hover:text-orange-600">
              Profile
            </Link>
            
          {
          (userData?.length === 0 && 
          (!localStorage.getItem("token") || localStorage.getItem("token") === "")) ? (
          <div className="flex gap-3">
          <button className="bg-transparent border text-lg font-semibold border-orange-600 py-1.5 px-5 rounded-md h-max text-white hover:bg-orange-600">
        <Link to="/register">Register</Link>
          </button>
          <button className="bg-transparent border text-lg font-semibold border-orange-600 py-1.5 px-5 rounded-md h-max text-white hover:bg-orange-600">
          <Link to="/login">Login</Link>
          </button>
          </div>
            ) : 
            (
            <button className="bg-transparent border text-lg font-semibold border-orange-600 py-1.5 px-5 rounded-md h-max text-white hover:bg-orange-600">
            <span onClick={handleLogout}>LogOut</span>
            </button>
            )
}        
</div>
{
  productItems.length !==0 && (
   <div className="relative">
    <Link to="/cart">
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
  </Link>
  <span className="absolute -top-2 -right-2 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
    {productItems.length}
  </span>
</div>
  )
}


          <button className="block sm:hidden bg-transparent border border-orange-600 py-1.5 px-5 rounded-md h-max text-white hover:bg-orange-600">
          <Link to="/login">Login</Link>
          </button>

</div>
        
        </>
  )
}

export default Navbar