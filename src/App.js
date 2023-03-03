import './App.css';
import { useSelector } from 'react-redux';


function App() {
  const  {title, content}  = useSelector((state) =>state.tasks);
  return (
    <div className="App">
      <>
        <h1>{title}</h1>
        <h1>{content}</h1>
      </>
    </div>
  );
}

export default App;
