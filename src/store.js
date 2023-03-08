import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/Tasks";
// import titleReducer from "./features/Title";

export const store = configureStore({
  reducer: {
     tasks: tasksReducer,
    //  title: titleReducer,
  },
});