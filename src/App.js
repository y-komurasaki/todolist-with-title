import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";


function App() {
  //useSelectorでstoreの状態にアクセス

  const [contents, setContents] = useState("");
  const taskList = useSelector((state) => state.tasks);
  console.log(taskList.contents)



  const dispatch = useDispatch();

  const handleClick = () => {
    if (contents === "")
    return

    dispatch(
      addTask(     
       [...contents]
        )
      );
      
    setContents("");
  };


  return (
    <div className="App">
       <div className="addTodo">
          <input type="text"
            placeholder='Todoを入力'
            onChange={(e) => setContents(e.target.value)}
            value={contents}/>
          <button onClick={() => handleClick()}>追加</button>
          <hr/>
        </div>

        <h1>{taskList.title}</h1>
        <div className='displayTask'>
          {taskList.contents.map((task) => (
            <div key={uuidv4} className="task">
              <h1 className="taskContents">{task}</h1>
              <button>削除</button>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
