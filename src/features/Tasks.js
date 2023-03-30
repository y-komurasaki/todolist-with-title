import { createSlice } from "@reduxjs/toolkit";

const initialState = 
  { 
    taskLists:[
      {title:`test`,
       listId:1,
        contents: [{id:1,text:"test"}]
      },
    ],
  }
const tasksSlice = createSlice({
  name: "tasks", //Slice自体の名前
  initialState, //初期状態
  reducers: { //アクション
    addTaskList: (state, action) => {
      state.taskLists.push({
        //push関数で新たに下記情報のリストを追加
        title: action.payload.newTitleText,
        listId: action.payload.listId,
        contents: [],
        //タイトルのテキスト情報、リスト自体のid,contents{タスク}を入れる配列生成
      });
    },

    editTaskList: (state, action) => {
      const { listId, editListTitleText } = action.payload;
      //現在クリックしているリストのidと編集で入力したタイトルテキスト情報を取得
      state.taskLists = state.taskLists.map((taskList) => (
         //map関数でリストを1つずつ展開する
        taskList.listId === listId ? 
        //展開しているリストidと現在クリックしているタスクidが一致するか確認
        { ...taskList, title: editListTitleText} 
        //タスクが一致した場合スプレッド構文でタスクを展開した後、編集で入力したテキストに更新する
        : taskList
        //リストが一致しない場合そのまま返す
      ));
    },

    deleteTaskList: (state, action) => { 
      const { listId } = action.payload;
      console.log(listId)
      //現在クリックしているリストのidを取得
    state.taskLists = state.taskLists.filter((taskList) => taskList.listId !== listId)
          //リストが一致した場合filter関数で一致しないリストだけ残す（一致するリストだけ除外する）
    },

    addTask: (state, action) => {
      const { listId, taskId, newTaskText } = action.payload;
      //現在クリックしているリストのid、タスクのidと新たに入力したテキスト情報を取得
      state.taskLists = state.taskLists.map((taskList) => {
        //map関数でリストを1つずつ展開する
        if (taskList.listId === listId) {
        //展開してリストidと現在クリックしているリストidが一致するか確認
          return {
            ...taskList,
            contents: [...taskList.contents, { id:taskId, text:newTaskText }],
            //リストが一致した場合スプレッド構文でリストを展開した後、配列のタスクを展開しidとテキストを追加する
          };
        }
        return taskList;
        //リストが一致しない場合そのまま返す
      });
    },


    editTask: (state, action) => {
      const {  listId, taskId, editText, } = action.payload;
      console.log(action.payload)
      //現在クリックしているリストのid、タスクのidと編集で入力したテキスト情報を取得
      state.taskLists = state.taskLists.map((taskList) => {
        //map関数でリストを1つずつ展開する
        if (taskList.listId === listId) {
        //展開してリストidと現在クリックしているリストidが一致するか確認
          const editContents = taskList.contents.map((task) => (
            //リストが一致した場合map関数でタスクを1つずつ展開する
            task.id === taskId ? 
            //展開しているタスクidと現在クリックしているタスクidが一致するか確認
            { ...task, text: editText } 
            //タスクが一致した場合スプレッド構文でタスクを展開した後、編集で入力したテキストに更新する
            : task
          ));
          return { ...taskList, contents: editContents };
          //リストが一致した場合スプレッド構文でリストを展開した後、上記編集処理の入ったリストのcontents配列に更新する
        }
        return taskList;
        //リストが一致しない場合そのまま返す
      });
    },

    deleteTask: (state, action) => { 
      const { listId, taskId } = action.payload;
      //現在クリックしているリストのidとタスクのidを取得
      state.taskLists = state.taskLists.map((taskList) => {
      //map関数でリストを1つずつ展開する
        if (taskList.listId === listId) {
          //展開しているリストidと現在クリックしているリストidが一致するか確認
          const deleteContents = taskList.contents.filter((task) => task.id !== taskId);
          //リストが一致した場合filter関数で一致しないタスクだけ残す（一致するタスクだけ除外する）
          return { ...taskList, contents: deleteContents };
          //スプレッド構文でリストを展開contentsに先ほどの処理が入ったdeleteContentsを更新する
        }
        return taskList;
        //リストが一致しない場合そのまま返す
      });
    },
  }, 
});

export const {addTaskList,editTaskList,deleteTaskList,addTask,editTask,deleteTask} = tasksSlice.actions;
export default tasksSlice.reducer; //reducerをstore.jsに渡す