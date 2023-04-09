import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskList,editTaskList,deleteTaskList,addTask,editTask,deleteTask,checkedTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { ConfirmDeleteModal, RegisteredAlertModal } from './components/modals/ConfirmModal';


function App() {

  const [newListTitleText, setNewListTitleText] = useState("");
  //リストのタイトルのテキスト情報
  const [editListTitleText, setEditListTitleText] = useState("");
  //タスク編集時の新たに更新するtext情報
  const [editListId, setEditListId] = useState(null)
  //現在クリックしているリストタイトルを編集フォームを展開させるためのid
  const [newTaskText, setNewTaskText] = useState({});
  //新しいタスクを生成したときのtext情報
  const [editInputTaskText, setEditInputTaskText] = useState();
  //タスク編集時の新たに更新するtext情報
  const [editTaskId, setEditTaskId] = useState(null)
  //現在クリックしているタスクを編集フォームを展開させるためのid
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [addShowModal, setAddShowModal] = useState(false);
  const [deleteListId, setDeleteListId] = useState(null)
  const [deleteTaskId, setDeleteTaskId] = useState(null)
  //モーダル開く開かないの状態管理、削除時に管理するidの状態

  const tasks = useSelector((state) => state.tasks);
  //sliceとの状態保持した情報やりとりさせるためメソッドを扱えるようにした変数
  const dispatch = useDispatch();
  //下記dispatchで全てsliceのaction.payloadに渡すためのメソッドを扱えるようにした変数

  const openAddModal = () => {
    setAddShowModal(true); 
    //状態をtrueにしてモーダルを表示
  };

  const closeAddModal = () =>{
    setAddShowModal(false); 
    //状態をfalseにしてモーダルを閉じる
  }

  const addTaskListClick = () => {

    if (newListTitleText === "" || newListTitleText.match(/[ｦ-ﾟァ-ン０-９]+/))
    //(/^[ｦ-ﾟ `０-９` ]*$/)でも可能
    return
    //textの中身が空白なら登録せず返却
    const isExistingList = tasks.taskLists.some(
      (list) => list.title === newListTitleText
    );
    //some関数で現在のタイトルと入力したtextが同じならtrueを返す
    if (isExistingList) {
      openAddModal();
      return
      //isExistingListがtrueならモーダルを開き登録されない
    }

    const listId = uuidv4()
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

    if (editListTitleText.match(/[ｦ-ﾟァ-ン０-９]+/)) {
      return;
    }
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
    openModal(currentListId);
  }

  const deleteListConfirmation = (currentListId) => {

    dispatch(
      deleteTaskList(
        {
          listId: currentListId, 
          //引数で現在クリックしているリストid情報
        })
      );
      closeModal();
  };

  const addTaskClick = (currentListId) => {
    //引数で現在クリックしているタスクの親リストのlistIdを受け取る
    if (newTaskText[currentListId] === "" || newTaskText[currentListId].match(/[ｦ-ﾟァ-ン０-９]+/))
    return

  const isExistingTask = tasks.taskLists.some((list) =>
      list.contents.some((task) => task.text === newTaskText[currentListId])
      );
    //some関数でListの中のTaskを確認し現在のtask.textと入力したtextが同じならtrueを返す
    if (isExistingTask) {
      openAddModal();
    return;
    //isExistingListがtrueならモーダルを開き登録されない
  }

    const taskId = uuidv4();
    //タスク生成時にuniqueな重複しないidをuuidで設定
    //初期値で引っ張ると同じidが重複してしまうためこのタイミング
    dispatch(
      
      addTask(   
        {
          listId: currentListId,
          //引数で受け取った追加しようとしているタスクのlistId
          taskId: taskId,
          //生成時にsetしたuniqueなIdの状態を持ったtaskId
          newTaskText: newTaskText[currentListId],
          //Todoフォームで入力したtext情報
        }
        )
        );
        setNewTaskText({
          ...newTaskText,
          [currentListId]:""
        });  
        //入力フォームを空にするための処理
        closeAddModal()
  };

  const editTaskClick = (currentTaskId, currentTaskText) => {
    setEditTaskId(currentTaskId)
    //引数で現在クリックしているリストid情報とタスクid情報を受け取り既存のidと一致させフォームを展開して役割を終える。
    setEditInputTaskText(currentTaskText)
    //現在のtext情報の状態を持たせる
  }
  
  const editTextChange = (e) => {

      setEditInputTaskText(e.target.value);
      //実行した場合入力した文字がInputTaskTextにセットされる
      //タスク編集時に展開した入力フォームに入力したtext情報
  }


  const editDataSubmit = (e,currentListId, currentTaskId) => {
    e.preventDefault();
    if (editInputTaskText.match(/[ｦ-ﾟァ-ン０-９]+/)) 
      return;
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

  const taskCheckedChange = (currentListId, currentTaskId, taskCompleted) => {
    
    //現在のリストIdとタスクId、チェックボックスの値e.target.checkedでtrue,falseを受け取る。
    dispatch(
      checkedTask(
       {
        listId:currentListId,
        taskId:currentTaskId,
        taskCompleted:taskCompleted,
      })
      //上記で受け取った値をdispatchに渡す
    )
  }

  const openModal = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    setDeleteListId(currentListId)
    setDeleteTaskId(currentTaskId)
    //それぞれのidをstateにセットする
    setDeleteShowModal(true); 
    //状態をtrueにしてモーダルを表示
  };

  const closeModal = () => {
    setDeleteShowModal(false);
  }

  const deleteTaskClick = (currentListId, currentTaskId) =>  {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    openModal(currentListId, currentTaskId);
   //コールバック関数でopenModalを呼び出し引数でidを渡す
}
    
  const deleteConfirmation = (currentListId, currentTaskId,) => {
    //モーダルの削除ボタンが押されたら処理が走る
        dispatch(
          deleteTask(
            {
              listId: currentListId, 
              taskId: currentTaskId
              //引数で現在クリックしているリストid情報とタスクid情報
            }
          )
        );
        closeModal();
        //モーダルを閉じて処理を終える
      }
    
    
  

  return (
    
    <div className="App">

      {deleteShowModal && 
        <ConfirmDeleteModal
          showModal={deleteShowModal}
          closeModal={closeModal}
          deleteConfirmation={deleteConfirmation}
          deleteListConfirmation={deleteListConfirmation}
          listId={deleteListId}
          taskId={deleteTaskId}
      />}
      {addShowModal && 
        <RegisteredAlertModal
        showModal={addShowModal}
        closeModal={closeAddModal}
      />}

      <div className='inputTitleContents'>
        <input 
          type="text"
          placeholder='タイトルを入力'
          onChange={(e) => setNewListTitleText(e.target.value)}
          //入力したtextの状態をsetNewListTitleTexで保時
          value={newListTitleText}
          className='inputTitle'
        />
        <FontAwesomeIcon icon={faSquarePlus}  className='listAddButton' onClick={() => addTaskListClick()}></FontAwesomeIcon>
        
      </div>

      <div className="taskLists">
      {tasks.taskLists.map((list) => (
        <div key={list.listId} className="taskList">
          <div 
            onClick= {() => editTitleClick(list.listId,list.title)}
            className="listTitles"
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
            ) : (<p> {list.title}</p> )}
              <FontAwesomeIcon className='listDeleteButton' icon={faTrashCan} onClick= {() => deleteTaskListClick(list.listId)}></FontAwesomeIcon>
        </div>
          <div className="addTodoContents" >
            <input
              type="text"
              placeholder='Todoを入力'
              onChange={(e) => 
                setNewTaskText({
                  ...newTaskText,
                  [list.listId]:e.target.value
                })}
              value={newTaskText[list.listId]||""}
              className="inputTodo"
            />
           <FontAwesomeIcon className='addTodoButton' icon={faSquarePlus} onClick={() => addTaskClick(list.listId)}></FontAwesomeIcon>
          </div>
            <div className='displayTask'>
              {list.contents.map((task) => (                          
                <div 
                key={task.id} 
                className="task"     
                >
                  <input
                    type="checkbox"
                    defaultChecked={task.completed}
                    onChange={(e) => taskCheckedChange(list.listId, task.id, e.target.checked)}
                  />
                
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
                   <FontAwesomeIcon className='taskDeleteButton' icon={faTrashCan} onClick= {() => deleteTaskClick(list.listId,task.id)}>削除</FontAwesomeIcon>
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