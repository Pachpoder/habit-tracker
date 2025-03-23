import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./slices/habitsSlice";

const store = configureStore({
    reducer: {
        habits: habitsReducer,
    },
});

export default store;
