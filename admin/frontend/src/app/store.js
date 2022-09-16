import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import doorReducer from "../features/doors/doorSlice";
import userReducer from "../features/users/userSlice";
import roleReducer from "../features/roles/roleSlice";
import CourseSlice from "../features/course/CourseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doors: doorReducer,
    user: userReducer,
    role: roleReducer,
    course: CourseSlice
  }
});
