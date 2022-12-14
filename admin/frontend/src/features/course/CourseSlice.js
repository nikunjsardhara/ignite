import { createSlice } from "@reduxjs/toolkit";
import mernDashApi from "../../helpers/apiUtils";

const initialState = {
  addCourses: false,
  courses: []
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setAddCourses: (state, action) => {
      state.addCourses = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setAddCourses, setCourses } = courseSlice.actions;

export default courseSlice.reducer;