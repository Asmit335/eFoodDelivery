import { createSlice } from "@reduxjs/toolkit";
import { API } from "../http";

const statuses = Object.freeze({
  success: "success",
  loading: "loading",
  error: "error",
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: "",
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export function loginAdminUser(data) {
  return async function loginAdminUserThunk(dispatch) {
    dispatch(setStatus(statuses.loading));
    try {
      const response = await API.post("/admin", data);
      dispatch(setUser(response.data.data));
      dispatch(setStatus(statuses.success));
      localStorage.setItem("token", response.data.token);
      window.location.href = "/admin";
    } catch (error) {
      dispatch(setStatus(statuses.error));
      console.log(error);
    }
  };
}
