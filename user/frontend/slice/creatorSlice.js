import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false
};

export const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setToggle } = creatorSlice.actions;

export default creatorSlice.reducer;
