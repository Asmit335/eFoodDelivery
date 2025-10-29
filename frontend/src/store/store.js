import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import checkoutReducer from "./checkoutSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    auth: authReducer,
    checkout: checkoutReducer,
  },
});

export default store;
