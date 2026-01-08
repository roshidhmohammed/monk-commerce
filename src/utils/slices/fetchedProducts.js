import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const fetchedProductsSlice = createSlice({
  name: "fetchedProducts",
  initialState,
  reducers: {
    addFetchedProducts: (_state, action) => {
      return action.payload;
    },
    removeFetchedProducts: (_state, action) => {
      return null;
    },
  },
});

export const { addFetchedProducts, removeFetchedProducts } = fetchedProductsSlice.actions;
export default fetchedProductsSlice.reducer;