import { createSlice } from "@reduxjs/toolkit";
import { API_Authentication } from "../http";

const statuses = Object.freeze({
  success: "success",
  loading: "loading",
  error: "error",
});

const checkOutSlice = createSlice({
  name: "checkout",
  initialState: {
    data: [],
    status: statuses.success,
    orders: [],
  },
  reducers: {
    setOrder(state, action) {
      state.data.push(action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { setOrder, setStatus, setOrders } = checkOutSlice.actions;
export default checkOutSlice.reducer;

export function createOrder(data) {
  return async function checkoutOrderThunk(dispatch) {
    dispatch(setStatus(statuses.loading));
    try {
      const response = await API_Authentication.post("/order/user", data);
      dispatch(setOrder(response.data.data));
      dispatch(setStatus(statuses.success));
    } catch (error) {
      dispatch(setStatus(statuses.error));
      console.log(error);
    }
  };
}

export function fetchOrder() {
  return async function fetchOrderThunk(dispatch) {
    dispatch(setStatus(statuses.loading));
    try {
      const response = await API_Authentication.get("/order/user");
      dispatch(setOrders(response.data.data));
      dispatch(setStatus(statuses.success));
    } catch (error) {
      dispatch(setStatus(statuses.error));
      console.log(error);
    }
  };
}
