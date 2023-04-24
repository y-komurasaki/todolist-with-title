import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DeleteTaskList = ({ list, openDeleteModal }) => {
  const deleteTaskListClick = () => {
    //現在クリックしているタスクidを情報を受け取る
    openDeleteModal(list.listId);
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
