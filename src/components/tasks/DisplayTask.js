import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditTask from "./EditTask";
import CheckedTask from "./CheckedTask";

const DisplayTask = ({ list, openModal }) => {
  const deleteTaskClick = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    openModal(currentListId, currentTaskId);
    //コールバック関数でopenModalを呼び出し引数でidを渡す
  };

  return (
    <div className="displayTask">
      {list.contents.map((task) => (
        <div key={task.id} className="task">
          <CheckedTask list={list} task={task} />
          <EditTask list={list} task={task} />
          <FontAwesomeIcon
            className="taskDeleteButton"
            icon={faTrashCan}
            onClick={() => deleteTaskClick(list.listId, task.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTask;
