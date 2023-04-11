import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditTaskList from "./EditTaskList";

const TaskLists = ({ openAddModal, openModal }) => {
  const tasks = useSelector((state) => state.tasks);

  const deleteTaskListClick = (currentListId) => {
    //現在クリックしているタスクidを情報を受け取る
    openModal(currentListId);
  };

  return (
    <div className="taskLists">
      {tasks.taskLists.map((list) => (
        <div key={list.listId} className="taskList">
          <EditTaskList list={list} openAddModal={openAddModal} />
          <FontAwesomeIcon
            className="listDeleteButton"
            icon={faTrashCan}
            onClick={() => deleteTaskListClick(list.listId)}
          ></FontAwesomeIcon>
        </div>
      ))}
    </div>
  );
};

export default TaskLists;
