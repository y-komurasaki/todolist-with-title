import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskList,addTask,editTask,deleteTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {
  //useSelectorでstoreの状態にアクセス
  const [taskListTitle, setTaskListTitle] = useState("");
  const [listId, setListId] = useState(uuidv4())
  const [newTaskText, setNewTaskText] = useState("");
  const [taskId, setTaskId] = useState(uuidv4())
  const [editInputTask, setEditInputTask] = useState();
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const addTaskListClick = () => {
    if (taskListTitle === "")
    return
    setListId(uuidv4())
    dispatch(
      
      addTaskList(   
        {
          listId:listId,
          title:taskListTitle,
        }
        )
        );
        setTaskListTitle("");
  }

  const addTaskClick = () => {
 
    if (newTaskText === "")
    return
    setTaskId(uuidv4());
    dispatch(
      
      addTask(   
        {
          listId:listId,
          id:taskId,
          text:newTaskText,
        }
        )
        );
        setNewTaskText("");
  };


  const editTaskClick = (id) => {
    setTaskId(id)
    console.log(tasks.taskLists);
  }
  
  const handleChange = (e) => {
    setEditInputTask(e.target.value);
  }

  const handleSubmit = (e) => {

   
    e.preventDefault();
    dispatch(
      editTask(  
         {
          text: editInputTask,
          id: taskId
         }
        )
        );

      if (editInputTask === "")
      return
      
        setEditInputTask("");
        setTaskId(uuidv4())

    //ディスパッチしてエディットタスクに配列番号とインプットコンテントを渡す
    //stateの初期化
  };

  const deleteTaskClick = (id) => {
   
    dispatch(
      deleteTask(
        {
          id
        } 
        )
    )
  }

  return (
    <div className="App">
          <input 
            type="text"
            placeholder='タイトルを入力'
            onChange={(e) => setTaskListTitle(e.target.value)}
          />
          <button onClick={() => addTaskListClick()}>追加</button>
      <div className="taskLists">
      {tasks.taskLists.map((list) => (
        <div key={list.id} className="taskList">

          <h1>{list.title}</h1>
          
          <hr/>
          <div className="addTodo" >
            <input
              type="text"
              placeholder='Todoを入力'
              onChange={(e) => setNewTaskText(e.target.value)}
              value={newTaskText}
            />
           <button onClick={() => addTaskClick()}>追加</button>
          </div>
            <div className='displayTask'>
              {list.contents.map((task) => (           
                <div 
                key={task.id} 
                className="task"     
                >
                  <div className="taskContents"
                    onClick= {() => editTaskClick(task.id)}>
                    { 
                      (taskId === task.id) ? (
                      //編集したいインデックスとマップのインデックスが一致してるか      
                      <form onSubmit={handleSubmit}>
                        <input 
                          type='text' 
                          onChange={handleChange} 
                          defaultValue={task.text}
                        />
                      </form>
                        ) : (
                          <h3 > {task.text}</h3>
                        )}
                  </div>
                  <button onClick= {() => deleteTaskClick(task.id)}>削除</button>
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

