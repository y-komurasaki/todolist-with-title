import './App.css';
import { useSelector } from 'react-redux';


function App() {
  const  {id, title, content}  = useSelector((state) =>state.tasks);
  return (
    <div className="App">
      <>
        <div className="displayTask">
          <h1>{title}</h1>
          <h2>{content}</h2>
        </div>
        <div className="addTodo">
          <input type="text" placeholder='Todoを入力'/>
          <button>追加</button>
        </div>
      </>
    </div>
  );
}

export default App;
