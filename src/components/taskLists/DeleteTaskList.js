import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DeleteTaskList = ({ list, openModal }) => {
  const deleteTaskListClick = () => {
    //現在クリックしているタスクidを情報を受け取る
    openModal(list.listId);
  };

  return (
    <FontAwesomeIcon
      className="listDeleteButton"
      icon={faTrashCan}
      onClick={() => deleteTaskListClick(list.listId)}
    />
  );
};

export default DeleteTaskList;
