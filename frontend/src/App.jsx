import React from 'react';
// import router from './router';
// import Navbar from './global/component/navbar/Navbar';
import Footer from './global/component/footer/Footer';
import { Provider } from "react-redux"
import store from './store/store';
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/components/home/Home';
import CartItem from './pages/components/cart/CartItem';

function App() {
  return (
    <div>
    <Provider store={store}>
     {/* <RouterProvider router={router}/> */}
        {/* <Navbar/> */}
        <BrowserRouter>
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<CartItem/>}/>
      <Route path='/footer' element={<Footer/>}/>
      </Routes>
        </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
