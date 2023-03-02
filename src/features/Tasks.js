import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: '',//初期状態
  content:[],
}
const tasksSlice = createSlice({
  name: "tasks",
  initialState, 
  reducers: {
    addTask: (state, action) => { //アクション
      state.value.push(action.payload);
    },
  }, 
});

export default tasksSlice.reducer;