import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskList,editTaskList,deleteTaskList,addTask,editTask,deleteTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {

  const [newListTitleText, setNewListTitleText] = useState("");
  //リストのタイトルのテキスト情報
  const [listId, setListId] = useState(0)
  //リスト自体の存在を管理するためのId
  const [editListTitleText, setEditListTitleText] = useState("");
  //タスク編集時の新たに更新するtext情報
  const [editListId, setEditListId] = useState(null)
  //現在クリックしているリストタイトルを編集フォームを展開させるためのid
  const [newTaskText, setNewTaskText] = useState("");
  //新しいタスクを生成したときのtext情報
  const [taskId, setTaskId] = useState(0)
  //タスク自体の存在を管理するためのId
  const [editInputTaskText, setEditInputTaskText] = useState();
  //タスク編集時の新たに更新するtext情報
  const [editTaskId, setEditTaskId] = useState(null)
  //現在クリックしているタスクを編集フォームを展開させるためのid
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
  }

  const editTitleClick = (currentListId,currentTitleText) => {
    setEditListId(currentListId);
    //引数で現在クリックしているリストid情報とタスクid情報を受け取り既存のidと一致させフォームを展開して役割を終える。
    setEditListTitleText(currentTitleText)
    //現在のタイトルtext情報の状態を持たせる
  }
  const editTitleTextChange = (e) => {
      setEditListTitleText(e.target.value);
     //入力した文字がInputTitleTextにセットされる
  }
  
  const editTitleDataSubmit = (e, currentListId) => {
    e.preventDefault();
    dispatch(
      editTaskList(  
          {
          listId:currentListId,
          //現在フォームが展開しているタスクのid情報
          editListTitleText: editListTitleText,
          //編集フォーム入力したtext情報
          }
        )
      );
      if (editListTitleText === "")
      return dispatch(
        deleteTaskList({
          listId:currentListId,
        }));
        //編集中テキストが空の場合はdeleteTaskの処理を実行
        setEditInputTaskText("");
        //編集テキストフォームを空にして初期化する
        setEditListId(null)
  };

  const deleteTaskListClick = (currentListId) =>{
    //現在クリックしているタスクidを情報を受け取る
    dispatch(
      deleteTaskList(
        {
          listId: currentListId, 
          //引数で現在クリックしているリストid情報
        }
      )
    );
  }

  const addTaskClick = (currentTaskId) => {
    //引数で現在クリックしているタスクの親リストのlistIdを受け取る
    if (newTaskText === "")
    return
    setTaskId(uuidv4())
    //タスク生成時にuniqueな重複しないidをuuidで設定
    //初期値で引っ張ると同じidが重複してしまうためこのタイミング
    dispatch(
      
      addTask(   
        {
          listId:currentTaskId,
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

  const editTaskClick = (currentTaskId, currentTaskText) => {
    setEditTaskId(currentTaskId)
    //引数で現在クリックしているリストid情報とタスクid情報を受け取り既存のidと一致させフォームを展開して役割を終える。
    setEditInputTaskText(currentTaskText)
    //現在のtext情報の状態を持たせる
    console.log(editInputTaskText)
  }
  
  const editTextChange = (e) => {

      setEditInputTaskText(e.target.value);
      //実行した場合入力した文字がInputTaskTextにセットされる

    console.log(editInputTaskText)
        //タスク編集時に展開した入力フォームに入力したtext情報
  }


  const editDataSubmit = (e,currentListId, currentTaskId) => {
    e.preventDefault();
    dispatch(
      editTask(  
          {
          listId:currentListId, 
          //現在フォームが展開しているタスクのid情報
          taskId:currentTaskId,
          //現在フォームが展開しているタスクのid情報
          editText: editInputTaskText,
          //編集フォーム入力したtext情報
          }
        )
      );
      if (editInputTaskText === "")
      return dispatch(
        deleteTask({
          listId:currentListId,
          taskId:currentTaskId,
        }));
        //編集中テキストが空の場合はdeleteTaskの処理を実行
        setEditInputTaskText("");
        //編集テキストフォームを空にして初期化する
        setEditTaskId(null)
        //taskIdをnullにしてフォームが閉じた状態を戻す
  };

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
        <div key={list.listId} className="taskList">
          <div 
            onClick= {() => editTitleClick(list.listId,list.title)}
            className="listContents"
          >
          { 
          (editListId === list.listId) ? (
          //編集したいidとマップのidが一致してるならフォームを展開する    
          <form onSubmit={(e) => editTitleDataSubmit(e, list.listId)}>
            <input 
              type='text' 
              onChange={editTitleTextChange} 
              defaultValue={list.title}
              key={list.listId}
            />
          </form>
            ) : (<h1> {list.title}</h1> )}
              <button onClick= {() => deleteTaskListClick(list.listId)}>削除</button>
          <hr/>
        </div>
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
                   onClick= {() => editTaskClick(task.id,task.text)}
                  className="taskContents"
                  >
                    { 
                      (editTaskId === task.id) ? (
                      //編集したいidとマップのidが一致してるならフォームを展開する    
                      <form onSubmit={(e) => editDataSubmit(e, list.listId,task.id)}>
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