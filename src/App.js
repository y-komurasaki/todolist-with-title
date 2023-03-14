import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask,editTask,deleteTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";


function App() {
  //useSelectorでstoreの状態にアクセス
  const [task, setTask] = useState("");
  const [editInputTask, setEditInputTask] = useState();
  const [taskIndex, setTaskIndex] = useState(null)
  const taskList = useSelector((state) => state.tasks);




  const dispatch = useDispatch();
  const addTaskClick = () => {
 
    if (task === "")
    return
    dispatch(
      addTask(  
        
        task,
        )
        );
        setTask("");
  };

  const editTaskClick = (index) => {
    setTaskIndex(index)
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
          index: taskIndex,
          text: editInputTask
         }
        )
        );
        setEditInputTask("");
        setTaskIndex(null);

    //ディスパッチしてエディットタスクに　配列番号とインプットコンテントを渡す
    //stateの初期化
  };

  const deleteTaskClick = (index) => {
   
    dispatch(
      deleteTask( 
         index
        )
    )
  }

  return (
    <div className="App">
       <div className="addTodo">
          <input type="text"
            placeholder='Todoを入力'
            onChange={(e) => setTask(e.target.value)}
            value={task}/>
          <button onClick={() => addTaskClick()}>追加</button>
          <hr/>
        </div>

        <h1>{taskList.title}</h1>
        <div className='displayTask'>
          {taskList.contents.map((task,index) => (           
            <div 
            key={index} 
            className="task"     
            >
              <div className="taskContents"
                onClick= {() => editTaskClick(index)}>
                { 
                  (taskIndex === index) ? (
                  //編集したいインデックスとマップのインデックスが一致してるか      
                  <form onSubmit={handleSubmit}>
                    <input 
                      type='text' 
                      onChange={handleChange} 
                      defaultValue={task}
                    />
                  </form>
                    ) : (
                      <h3 > {task}</h3>
                    )}
              </div>
              <button onClick= {() => deleteTaskClick(task,index)}>削除</button>
            </div>
          ))}
        </div>
    </div>
    
  );
}

export default App;

