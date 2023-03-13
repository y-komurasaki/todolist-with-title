import { createSlice } from "@reduxjs/toolkit";

const initialState = 
  { 
    title: 'Todo一覧',
    contents: [],
  }
const tasksSlice = createSlice({
  name: "tasks", //Slice自体の名前
  initialState, //初期状態
  reducers: { //アクション
    addTask: (state, action) => { 
      state.contents.push(action.payload);

    },
    editTask: (state, action) => { 
      const {index, text } = action.payload
     state.contents[index] = text;
    },    
  }, 
});

export const {addTask} = tasksSlice.actions;
export const {editTask} = tasksSlice.actions;
export default tasksSlice.reducer; //reducerをstore.jsに渡す