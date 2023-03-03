import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: 'test',//初期状態
  content:'test',
}
const tasksSlice = createSlice({
  name: "tasks", //Slice自体の名前
  initialState, //初期状態
  // reducers: { //アクション
  //   addTask: (state, action) => { 
  //     state.value.push(action.payload);
  //   },
  // }, 
});

export default tasksSlice.reducer; //reducerをstore.jsに渡す