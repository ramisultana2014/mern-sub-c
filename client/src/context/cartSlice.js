import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  sandwish: [],
};
const cartSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    addKindCheese(state, action) {
      const current = state.sandwish.find((el) => el.id === action.payload.id);
      //console.log(current);
      current.kind = action.payload.kind;
      current.cal = action.payload.cal;
    },
    addVeggies(state, action) {
      state.sandwish = [...state.sandwish, action.payload];
    },
    addKindVeggies(state, action) {
      const currentVeggie = state.sandwish.find(
        (el) => el.id === action.payload.id
      );
      currentVeggie.kind = action.payload.kind;
      //console.log(state.sandwish);
    },
    removeVeggie(state, action) {
      state.sandwish = state.sandwish.filter((el) => el.id !== action.payload);
    },
    clearSandwich(state, action) {
      state.sandwish = [];
    },
    addToBag(state, action) {
      state.cart = [...state.cart, action.payload];
      //console.log(state.cart);
      cartSlice.caseReducers.clearSandwich(state, action);
      //console.log(state.sandwish);
    },
    deleteItemInBag(state, action) {
      state.cart = state.cart.filter((el) => el.id !== action.payload);
    },
    increaseQuant(state, action) {
      const cur = state.cart.find((el) => el.id === action.payload);
      cur.sandwichQuantity++;
      cur.sandwichTotalPrice = cur.sandwichQuantity * cur.sandwichPrice;
    },
    decreaseQuant(state, action) {
      const cur = state.cart.find((el) => el.id === action.payload);
      cur.sandwichQuantity--;
      cur.sandwichTotalPrice = cur.sandwichQuantity * cur.sandwichPrice;
      if (cur.sandwichQuantity === 0)
        cartSlice.caseReducers.deleteItemInBag(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});
export const {
  addKindCheese,
  addKindVeggies,
  addVeggies,
  removeVeggie,
  clearSandwich,
  addToBag,
  deleteItemInBag,
  decreaseQuant,
  increaseQuant,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
