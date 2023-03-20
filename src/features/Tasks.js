import { createSlice } from "@reduxjs/toolkit";

const initialState = 
  { 
    taskLists:[
      {title:`test`,
        contents: [{id:0,text:"test"}]
      },
    ],
  }
const tasksSlice = createSlice({
  name: "tasks", //Slice自体の名前
  initialState, //初期状態
  reducers: { //アクション
    addTaskList: (state, action) => {
      state.taskLists.push({
        title: action.payload.title,
        listId: action.payload.listId,
        contents: [],
      });
    },

    addTask: (state, action) => {
      const { listId, id, text } = action.payload;
      state.taskLists[listId].contents.push({ id:id, text:text });
    },

    editTask: (state, action) => {
      const { id, text } = action.payload;
      state.taskLists[0].contents = state.taskLists[0].contents.map((task) => (
        (task.id === id) ? 
        {...task, text}
        : task
      ));
    },

    deleteTask: (state, action) => { 
      const { id } = action.payload
      state.taskLists[0].contents = state.contents.filter((task) => task.id !== id);     
},  
  }, 
});

export const {addTaskList,addTask,editTask,deleteTask} = tasksSlice.actions;
export default tasksSlice.reducer; //reducerをstore.jsに渡す