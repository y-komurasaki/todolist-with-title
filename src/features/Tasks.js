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
      const {text, id } = action.payload
      state.contents.push({text, id});

    },
    editTask: (state, action) => { 
      const {text ,id } = action.payload;
      console.log(text,id)
     state.contents[id].text = text;
     
    },    
    deleteTask: (state, action) => { 
      const {id} = action.payload
      state.contents.splice( id, 1 );
    },    
  }, 
});

export const {addTask,editTask,deleteTask} = tasksSlice.actions;
export default tasksSlice.reducer; //reducerをstore.jsに渡す