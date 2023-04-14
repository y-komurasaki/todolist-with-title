import { useSelector } from "react-redux";
import DisplayTask from "../tasks/DisplayTask";
import DeleteTaskList from "./DeleteTaskList";
import EditTaskList from "./EditTaskList";

const TaskLists = ({ openAddModal, openModal, closeAddModal }) => {
  const tasks = useSelector((state) => state.tasks);
  return (
    <div className="taskLists">
      {tasks.taskLists.map((list) => (
        <div key={list.listId} className="taskList">
          <div className="taskListTitles">
            <EditTaskList list={list} openAddModal={openAddModal} />
            <DeleteTaskList list={list} openModal={openModal} />
          </div>
          <DisplayTask
            list={list}
            openModal={openModal}
            openAddModal={openAddModal}
            closeAddModal={closeAddModal}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskLists;
