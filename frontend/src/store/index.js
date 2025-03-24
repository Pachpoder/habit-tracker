import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./slices/habitsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
    auth: authReducer,
  },
});

export default store;
