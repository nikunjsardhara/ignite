import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  title_course: null
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
    }
  }
});

// Action creators are generated for each case reducer function
export const { setToggle, setTitleCourse } = creatorSlice.actions;

export default creatorSlice.reducer;
