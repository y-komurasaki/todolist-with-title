import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";


function App() {
  //useSelectorでstoreの状態にアクセス
  //const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const taskList = useSelector((state) => state.tasks);
  const taskTitle = useSelector((state) => state.title);


  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addTask(
      {
        id: uuidv4(),
        content: content,
      }
    ));
  };

  return (
    <div className="App">
       <div className="addTodo">
          <input type="text" placeholder='Todoを入力'onChange={(e) => setContent(e.target.value)}/>
          <button onClick={() => handleClick()}>追加</button>
          <hr/>
        </div>

        <div className='displayTitle'>
          {taskTitle.map((title) => (
           <div key={title.id} className="title">
               <h1 className="title">{title.title}</h1>             
           </div>
           ))}
        </div>

        <div className='displayTask'>
          {taskList.map((task) => (
            <div key={task.id} className="task">
              <h1 className="taskContent">{task.content}</h1>
              <button>削除</button>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
