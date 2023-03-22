import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskList,addTask,editTask,deleteTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

function App() {
  //useSelectorでstoreの状態にアクセス
  const [newListTitleText, setNewListTitleText] = useState("");
  const [listId, setListId] = useState(uuidv4())
  const [newTaskText, setNewTaskText] = useState("");
  const [taskId, setTaskId] = useState(uuidv4())
  const [editInputTaskText, setEditInputTaskText] = useState();
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const addTaskListClick = () => {
    if (newListTitleText === "")
    return
    setListId(uuidv4())
    dispatch(
      
    addTaskList(   
        {
          listId:listId,
          newTitleText:newListTitleText,
        }
      )
    );
    setNewListTitleText("");
    console.log(listId)
  }

  const addTaskClick = (listId) => {
 
    if (newTaskText === "")
    return
    setTaskId(uuidv4());
    dispatch(
      
      addTask(   
        {
          listId:listId,
          taskId:taskId,
          newText:newTaskText,
        }
        )
        );
        setNewTaskText("");  
        console.log(listId)
        console.log(taskId)   
  };


  const editTaskClick = (listId,taskId) => {
    setListId(listId)
    setTaskId(taskId)
  }
  console.log(listId)
  console.log(taskId)
  
  const handleChange = (e) => {
    setEditInputTaskText(e.target.value);
  }

  const handleSubmit = (e) => {


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


      if (editInputTaskText === "")
      return
      
        setEditInputTaskText("");
        setTaskId(uuidv4())
        console.log(taskId)
  };

  const deleteTaskClick = (id) => {
    console.log(taskId)
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
            onChange={(e) => setNewListTitleText(e.target.value)}
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
                  <div className="taskContents"
                    onClick= {() => editTaskClick(list.listId,task.id)}>
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

