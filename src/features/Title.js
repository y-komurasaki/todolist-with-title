import { createSlice } from "@reduxjs/toolkit";

const initialState = 

[
  {title: 'Todo一覧',//初期状態
  id: 0,},
]
const titleSlice = createSlice({
  name: "title", //Slice自体の名前
  initialState, //初期状態
  reducers: { //アクション
    addTitle: (state, action) => { 
      state.push(action.payload);
    },
  }, 
});

export const {addTitle} = titleSlice.actions;
export default titleSlice.reducer; 