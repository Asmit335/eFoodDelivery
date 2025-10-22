import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const statuses = Object.freeze({
  success: "success",
  error: "error",
  loading: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: statuses.success,
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = statuses.loading;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = statuses.success;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = statuses.error;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = createAsyncThunk("/products/fetch", async () => {
  const response = await axios.get("http://localhost:3000/createproduct");
  const data = response.data.products;
  return data;
});

// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch) {
//     dispatch(setStatus(statuses.loading));
//     try {
//       const response = await axios.get("http://localhost:3000/createproduct");
//       dispatch(setProducts(response.data.products));
//       dispatch(setStatus(statuses.success));
//     } catch (error) {
//       console.log(error);
//       dispatch(setStatus(statuses.error));
//     }
//   };
// }
