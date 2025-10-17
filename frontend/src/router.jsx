import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/components/home/Home";
import { Contact } from "./pages/components/contact/Contact";
import Login from "./pages/components/login/Login";
import Register from "./pages/components/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);
export default router;
