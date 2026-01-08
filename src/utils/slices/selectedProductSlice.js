import { createSlice } from "@reduxjs/toolkit";

const initialState = null;


const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    addSelectedProduct: (_state, action) => {
      return action.payload;
    },
    removeSelectedVariants: (state, action) => {
      return null;
    },
  },
});

export const { addSelectedProduct, removeSelectedVariants } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;