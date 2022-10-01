import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  title_course: null,
  cart: []
};

export const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setTitleCourse: (state, action) => {
      state.title_course = action.payload;
    },
    setCart: (state, action) => {
      let found = state.cart.some(
        (cart_p) => cart_p._id === action.payload._id
      );
      if (!found) {
        state.cart.push({ ...action.payload });
      }
    },
    setRemoveCart: (state, action) => {
      const cart = state.cart.filter((cart_p) => cart_p._id !== action.payload);
      console.log(cart);
      state.cart = cart;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setToggle, setTitleCourse, setCart, setRemoveCart } =
  creatorSlice.actions;

export default creatorSlice.reducer;
