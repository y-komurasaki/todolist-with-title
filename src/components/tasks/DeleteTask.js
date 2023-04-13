import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
const DeleteTask = ({ list, task, openModal }) => {
  const deleteTaskClick = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    openModal(currentListId, currentTaskId);
    //コールバック関数でopenModalを呼び出し引数でidを渡す
  };

  return (
    <FontAwesomeIcon
      className="taskDeleteButton"
      icon={faTrashCan}
      onClick={() => deleteTaskClick(list.listId, task.id)}
    />
  );
};

export default DeleteTask;
