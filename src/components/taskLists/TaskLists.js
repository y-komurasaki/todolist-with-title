import { useSelector } from "react-redux";
import AddTask from "../tasks/AddTask";
import DisplayTask from "../tasks/DisplayTask";
import DeleteTaskList from "./DeleteTaskList";
import EditTaskList from "./EditTaskList";

const TaskLists = ({ openAddModal, openModal, closeAddModal }) => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div className="taskLists">
      {tasks.taskLists.map((list) => (
        <div key={list.listId} className="taskList">
          <EditTaskList list={list} openAddModal={openAddModal} />
          <DeleteTaskList list={list} openModal={openModal} />
          <AddTask
            listId={list.listId}
            list={list}
            openAddModal={openAddModal}
            closeAddModal={closeAddModal}
          />
          <DisplayTask list={list} openModal={openModal} />
        </div>
      ))}
    </div>
  );
};

export default TaskLists;
