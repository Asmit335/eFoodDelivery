import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const statuses = Object.freeze({
  success: "success",
  loading: "loading",
  Error: "error",
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: statuses.success,
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export const registerUser = (data) => async (dispatch) => {
  dispatch(setStatus(statuses.loading));
  try {
    const response = await axios.post("http://localhost:3000/register", data);
    dispatch(setUser(response.data.data));
    dispatch(setStatus(statuses.success));
  } catch (error) {
    dispatch(setStatus(statuses.Error));
    console.log("Error", error);
  }
};
