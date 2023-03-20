import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask,editTask,deleteTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {
  //useSelectorでstoreの状態にアクセス
  const [newTaskText, setNewTaskText] = useState("");
  const [taskId, setTaskId] = useState(uuidv4())
  const [editInputTask, setEditInputTask] = useState();
  const taskList = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const addTaskClick = () => {
 
    if (newTaskText === "")
    return
    setTaskId(uuidv4())
    dispatch(
      
      addTask(   
        {
          id:taskId,
          text:newTaskText,
        }
        )
        );
        setNewTaskText("");
  };

  const editTaskClick = (id) => {
    setTaskId(id)
    console.log(taskList.contents);
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


        <h1>{taskList.title}</h1>
        <hr/>
        <div className="addTodo"
       >
          <input type="text"
            placeholder='Todoを入力'
            onChange={(e) => setNewTaskText(e.target.value)}
            value={newTaskText}/>
          <button onClick={() => addTaskClick()}>追加</button>
        </div>
        <div className='displayTask'>
          {taskList.contents.map((task) => (           
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
  );
}

export default App;

