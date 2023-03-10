import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask,editTask } from './features/Tasks';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";


function App() {
  //useSelectorでstoreの状態にアクセス

  const [contents, setContents] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null)
  const taskList = useSelector((state) => state.tasks);




  const dispatch = useDispatch();

  const handleClick = () => {
    if (contents === "")
    return

    dispatch(
      addTask(     
       [...contents,selectedIndex]
        )
      );
    setContents("");
    setSelectedIndex(null);
    
    

  };

  const editClick = () => {

    setIsClick(true);
    
    console.log(isClick);
    console.log(taskList.contents);
  }
  
  const handleChange = (e) => {
    setInputContent(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClick(false);
    dispatch(
      editTask(   

        [inputContent]
        )
        );
        
        setInputContent("");

    //ディスパッチしてエディットタスクに　配列番号とインプットコンテントを渡す
    //stateの初期化
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
          {taskList.contents.map((task,index) => (
            <div 
            key={index} 
            className="task"     
            >
              <div className="taskContents"
               onClick= {editClick}>

                { 
                 (isClick === true ) && selectedIndex === isClick ? (
                  //編集したいインデックスとマップのインデックスが一致してるか
                
                  <form onSubmit={handleSubmit}>
                    <input type='text' onChange={handleChange} />
                  </form>
                    ) : (
                      <h3 > {task}</h3>
                    ) }

              </div>
              <button>削除</button>
            </div>
          ))}
        </div>
    </div>
    
  );
}

export default App;
