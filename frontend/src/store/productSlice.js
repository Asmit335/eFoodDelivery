import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../http";
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
    selectSingleProduct: {},
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSelectedSingleProduct(state, action) {
      state.selectSingleProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = statuses.loading;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = statuses.success;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = statuses.error;
      });
  },
});

export const { setProducts, setStatus, setSelectedSingleProduct } =
  productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = createAsyncThunk("/products/fetch", async () => {
  const response = await API.get("/createproduct");
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

export const fetchSingleSelectedProduct = (productId) => async (dispatch) => {
  dispatch(setStatus(statuses.loading));
  try {
    const response = await API.get(`/product/${productId}`);
    dispatch(setSelectedSingleProduct(response.data.product));
    dispatch(setStatus(statuses.success));
  } catch (error) {
    dispatch(setStatus(statuses.error));
    console.log(error);
  }
};
