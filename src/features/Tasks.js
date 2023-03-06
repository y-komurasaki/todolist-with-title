import { createSlice } from "@reduxjs/toolkit";

const initialState = 

[
  {title: 'Todo一覧',//初期状態
  id: 0,},
  {content:'test',
  id: 1,}
]
const tasksSlice = createSlice({
  name: "tasks", //Slice自体の名前
  initialState, //初期状態
  reducers: { //アクション
    addTask: (state, action) => { 
      state.push(action.payload);
    },
  }, 
});

export const {addTask} = tasksSlice.actions;
export default tasksSlice.reducer; //reducerをstore.jsに渡す