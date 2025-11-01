import { createSlice } from "@reduxjs/toolkit";
import { API_Authentication } from "../http";

const statuses = Object.freeze({
  success: "success",
  error: "error",
  loading: "loading",
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productItems: [],
    status: statuses.success,
  },
  reducers: {
    setItem(state, action) {
      state.productItems = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    updateItem(state, action) {
      const index = state.productItems.findIndex(
        (item) => item.product._id === action.payload.id
      );
      if (index !== -1) {
        state.productItems[index].quantity = action.payload.quantity;
      }
    },
    removeCart(state, action) {
      const index = state.productItems.findIndex(
        (item) => item.product._id === action.payload.id
      );
      if (index !== -1) {
        state.productItems.splice(index, 1);
      }
    },
    emptyCart(state, action) {
      state.productItems = [];
    },
  },
});

export const { setItem, setStatus, updateItem, removeCart, emptyCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const addToCartItem = (productId) => async (dispatch) => {
  dispatch(setStatus(statuses.loading));
  try {
    const response = await API_Authentication.post(`/cart/${productId}`);
    // dispatch(setItem([...state.productItems, response.data.data]));
    dispatch(setItem(response.data.data));
    dispatch(setStatus(statuses.success));
  } catch (error) {
    dispatch(setStatus(statuses.error));
    console.log(error);
  }
};

export const fetchCartItems = () => async (dispatch) => {
  dispatch(setStatus(statuses.loading));
  try {
    const response = await API_Authentication.get("/cart");
    dispatch(setItem(response.data.data));
    dispatch(setStatus(statuses.success));
  } catch (error) {
    dispatch(setStatus(statuses.error));
    console.log(error);
  }
};

export function updateCartItem(id, quantity) {
  return async function updateCartItemsThunk(dispatch) {
    dispatch(setStatus(statuses.loading));
    try {
      const response = await API_Authentication.patch(`/cart/${id}`, {
        quantity,
      });
      console.log(response);
      dispatch(updateItem({ id, quantity }));
      dispatch(setStatus(statuses.success));
    } catch (error) {
      dispatch(setStatus(statuses.error));
      console.log(error);
    }
  };
}

export function deleteCartItem(id) {
  return async function deleteCartThunk(dispatch) {
    dispatch(setStatus(statuses.loading));
    try {
      const response = await API_Authentication.delete(`cart/${id}`);
      console.log(response.data.data);
      dispatch(removeCart({ id }));
      dispatch(setStatus(statuses.success));
    } catch (error) {
      dispatch(setStatus(statuses.error));
      console.log(error);
    }
  };
}
