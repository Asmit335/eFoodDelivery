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
    orders: null,
  },
  reducers: {
    setOrder(state, action) {
      state.data.push(action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setOrder, setStatus } = checkOutSlice.actions;
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
