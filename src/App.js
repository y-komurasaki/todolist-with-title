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
          newTaskText:newTaskText,
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
    //引数で現在クリックしているリストid情報とタスクid情報を受け取り既存のidと一致させフォームを展開して役割を終える。
  }
  console.log(listId)
  console.log(taskId)
  //Task.jsのスプレッド構文で新たに配列を展開しているので初期値のid0になる
  
  const editTextChange = (e) => {
    setEditInputTaskText(e.target.value);
        //タスク編集時に展開した入力フォームに入力したtext情報
  }
  console.log(listId)
  console.log(taskId)
  

  const editDataSubmit = (e) => {
    setListId(uuidv4)
    setTaskId(uuidv4)
    //レンダリングされた際スプレッド構文で初期化されてたidにuuidを入れる
    e.preventDefault();
    dispatch(
      editTask(  
          {
          listId:listId,
          //現在フォームが展開しているタスクのid情報
          taskId:taskId,
          //現在フォームが展開しているタスクのid情報
          editText: editInputTaskText,
          //編集フォーム入力したtext情報
          }
        )
      );
      console.log(listId)
      console.log(taskId)
      console.log(editInputTaskText)
      if (editInputTaskText === "")
      return
        setEditInputTaskText("");
        //編集テキストフォームを空にして初期化する
  };
  console.log(listId)
  console.log(taskId)

  const deleteTaskClick = (currentListId, currentTaskId) =>  {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    dispatch(
      deleteTask(
        {
          listId: currentListId, 
          taskId: currentTaskId
          //引数で現在クリックしているリストid情報とタスクid情報
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
                      //編集したいidとマップのidが一致してるならフォームを展開する    
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

