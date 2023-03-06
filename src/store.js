import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/Tasks";

export const store = configureStore({
  reducer: {
     tasks: tasksReducer,
  },
});