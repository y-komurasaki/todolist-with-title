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
      const { id, text } = action.payload;
      state.contents = state.contents.map((task) => (
        (task.id === id) ? 
        {...task, text}
        : task
      ));
    },

    deleteTask: (state, action) => { 
      const { id } = action.payload
      state.contents = state.contents.filter((task) => task.id !== id);     
},  
  }, 
});

export const {addTask,editTask,deleteTask} = tasksSlice.actions;
export default tasksSlice.reducer; //reducerをstore.jsに渡す