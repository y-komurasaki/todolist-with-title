import { useSelector } from "react-redux";
import DeleteTaskList from "./DeleteTaskList";
import EditTaskList from "./EditTaskList";

const TaskLists = ({ openAddModal, openModal }) => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className="taskLists">
      {tasks.taskLists.map((list) => (
        <div key={list.listId} className="taskList">
          <EditTaskList list={list} openAddModal={openAddModal} />
          <DeleteTaskList list={list} openModal={openModal} />
        </div>
      ))}
    </div>
  );
};

export default TaskLists;
