import { configureStore } from "@reduxjs/toolkit";
import creatorReducer from "./slice/creatorSlice";

export const store = configureStore({
  reducer: {
    creator: creatorReducer
  }
});
