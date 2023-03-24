import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskList,addTask,editTask,deleteTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {
  //useSelectorでstoreの状態にアクセス
  const [newListTitleText, setNewListTitleText] = useState("");
  //リストのタイトルのテキスト情報
  const [listId, setListId] = useState(0)
  //リスト自体の存在を管理するためのId
  const [newTaskText, setNewTaskText] = useState("");
  //新しいタスクを生成したときのtext情報
  const [taskId, setTaskId] = useState(0)
  //タスク自体の存在を管理するためのId
  const [editInputTaskText, setEditInputTaskText] = useState();
  //タスク編集時の新たに更新するtext情報

  const tasks = useSelector((state) => state.tasks);
  //sliceとの状態保持した情報やりとりさせるためメソッドを扱えるようにした変数
  const dispatch = useDispatch();
  //下記dispatchで全てsliceのaction.payloadに渡すためのメソッドを扱えるようにした変数

  const addTaskListClick = () => {
    if (newListTitleText === "")
    return
    //textの中身が空白なら登録せず返却
    setListId(uuidv4());
    //リスト生成時にuniqueな重複しないidをuuidで設定
    //初期値で引っ張ると同じidが重複してしまうためこのタイミング
    
    dispatch(
      
    addTaskList(   
        {
          listId:listId,
          //生成時にsetしたuniqueなIdの状態を持ったlistId
          newTitleText:newListTitleText,
          //タイトル入力フォームで入力したtext情報
        }
      )
    );
    setNewListTitleText("");
    //入力フォームを空にするための処理
    console.log(listId)
  }

  const addTaskClick = (currentListId) => {
    //引数で現在クリックしているタスクの親リストのlistIdを受け取る
    if (newTaskText === "")
    return
    setTaskId(uuidv4())
    //タスク生成時にuniqueな重複しないidをuuidで設定
    //初期値で引っ張ると同じidが重複してしまうためこのタイミング
    dispatch(
      
      addTask(   
        {
          listId:currentListId,
          //引数で受け取った追加しようとしているタスクのlistId
          taskId:taskId,
          //生成時にsetしたuniqueなIdの状態を持ったtaskId
          newText:newTaskText,
          //Todoフォームで入力したtext情報
        }
        )
        );
        setNewTaskText("");  
        //入力フォームを空にするための処理
  };
  console.log(listId)
  console.log(taskId) 


  const editTaskClick = (currentListId,currentTaskId) => {
    setListId(currentListId);
    setTaskId(currentTaskId);
    //関数の外で現在編集中のIdを使いたい為useStateで設定
  }
  console.log(listId)
  console.log(taskId)
  
  const editTextChange = (e) => {
    setEditInputTaskText(e.target.value);
        //タスク編集時に展開した入力フォームに入力したtext情報
  }

  const editDataSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editTask(  
          {
          listId:listId,
          taskId:taskId,
          editText: editInputTaskText,
          }
        )
      );
      console.log(listId)
      console.log(taskId)


      if (editInputTaskText === "")
      return
        setEditInputTaskText("");
        setListId(uuidv4)
        setTaskId(uuidv4)

  };
  console.log(listId)
  console.log(taskId)

  function deleteTaskClick(currentListId, currentTaskId) {
    console.log(currentListId);
    console.log(currentTaskId);
    dispatch(
      deleteTask(
        {
          listId: currentListId,
          taskId: currentTaskId,
        }
      )
    );
  }

  return (
    <div className="App">
          <input 
            type="text"
            placeholder='タイトルを入力'
            onChange={(e) => setNewListTitleText(e.target.value)}
            //入力したtextの状態をsetNewListTitleTexで保時
          />
          <button onClick={() => addTaskListClick()}>追加</button>
      <div className="taskLists">
      {tasks.taskLists.map((list) => (
        <div key={list.id} className="taskList">
          <hr/>
            <h1>{list.title}</h1>
          <hr/>
          <div className="addTodo" >
            <input
              type="text"
              placeholder='Todoを入力'
              onChange={(e) => setNewTaskText(e.target.value)}
              value={newTaskText}
            />
           <button onClick={() => addTaskClick(list.listId)}>追加</button>
          </div>
            <div className='displayTask'>
              {list.contents.map((task) => (           
                <div 
                key={task.id} 
                className="task"     
                >
                  <div 
                   onClick= {() => editTaskClick(list.listId,task.id)}
                  className="taskContents"
                  >
                    { 
                      (taskId === task.id) ? (
                      //編集したいインデックスとマップのインデックスが一致してるか      
                      <form onSubmit={editDataSubmit}>
                        <input 
                          type='text' 
                          onChange={editTextChange} 
                          defaultValue={task.text}
                        />
                      </form>
                        ) : (
                          <h3> {task.text}</h3>
                        )}
                  </div>
                  <button onClick= {() => deleteTaskClick(list.listId,task.id)}>削除</button>
                </div>
              ))}
            </div>
          </div>
          ))}
        </div>
      </div>
    );
}

export default App;

