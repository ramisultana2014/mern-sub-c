import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./context/cartSlice";
const store = configureStore({
  reducer: {
    bag: cartReducer,
  },
});
export default store;
