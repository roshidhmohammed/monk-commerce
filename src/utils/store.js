import { configureStore } from "@reduxjs/toolkit";
import selectedProductReducer from "./slices/selectedProductSlice";
import editProductReducer from "./slices/editProductSlice";

const store = configureStore({
  reducer: {
    selectedProduct: selectedProductReducer,
    editProduct: editProductReducer,
  },
});

export default store;
