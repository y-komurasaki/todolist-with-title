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
        title: action.payload.newTitleText,
        listId: action.payload.listId,
        contents: [],
      });
      console.log(action.payload)
    },

    addTask: (state, action) => {
      const { taskId, newText, listId } = action.payload;
      state.taskLists = state.taskLists.map((taskList) => {
        if (taskList.listId === listId) {
          return {
            ...taskList,
            contents: [...taskList.contents, { id:taskId, text:newText }],
          };
        }
        return taskList;
      });
    },


    editTask: (state, action) => {
      const { id, text } = action.payload;
      state.taskLists.contents = state.taskLists.contents.map((task) => (
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