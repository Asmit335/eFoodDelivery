import React from 'react';
// import router from './router';
import Footer from './global/component/footer/Footer';
import { Provider } from "react-redux"
import store from './store/store';
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/components/home/Home';
import CartItem from './pages/components/cart/CartItem';
import Login from './pages/components/login/Login';
import Register from './pages/components/register/Register';
import Navbar from './global/component/navbar/Navbar';
import ProductDetails from './pages/productDetail/ProductDetails';
import CheckOut from './pages/checkout/CheckOut';
import Sucess from './pages/khaltisucess/Sucess';
import UserProfile from './pages/profile/UserProfile';
import MyOrders from './pages/myOrders/MyOrders';
import MyOrderQrs from './pages/myOrdersQrs/MyOrderQrs';

function App() {
  return (
    <div>
    <Provider store={store}>
     {/* <RouterProvider router={router}/> */}
        <BrowserRouter>
        <Navbar/>
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<CartItem/>}/>
      <Route path='/footer' element={<Footer/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/checkout' element={<CheckOut/>}/>
      <Route path='/success' element={<Sucess/>}/>
      <Route path='/profile' element={<UserProfile/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
      <Route path='/myorderqrs' element={<MyOrderQrs/>}/>
      </Routes>
      <Footer/>
        </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
