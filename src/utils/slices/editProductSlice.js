import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const editProductSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {
    editProduct: (_state, action) => {
      return action.payload;
    },
  },
});

export const { editProduct } = editProductSlice.actions;
export default editProductSlice.reducer;