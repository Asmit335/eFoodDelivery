import { createSlice } from "@reduxjs/toolkit";
import API from "../http";

const statuses = Object.freeze({
  success: "success",
  loading: "loading",
  Error: "error",
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    status: "",
    token: "",
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setUser, setStatus, setToken } = authSlice.actions;
export default authSlice.reducer;

export const registerUser = (data) => async (dispatch) => {
  dispatch(setStatus(statuses.loading));
  try {
    const response = await API.post("/register", data);
    dispatch(setUser(response.data.data));
    dispatch(setStatus(statuses.success));
  } catch (error) {
    dispatch(setStatus(statuses.Error));
    console.log("Error", error);
  }
};

export const loginUser = (data) => async (dispatch) => {
  dispatch(setStatus(statuses.loading));
  try {
    const response = await API.post("/login", data);
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.data));
    dispatch(setStatus(statuses.success));
  } catch (error) {
    dispatch(setStatus(statuses.Error));
    console.log(error);
  }
};
