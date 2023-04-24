import { useSelector } from "react-redux";
import DisplayTask from "../tasks/DisplayTask";
import DeleteTaskList from "./DeleteTaskList";
import EditTaskList from "./EditTaskList";

const TaskLists = ({
  openAddModal,
  openDeleteModal,
  openEditingDeleteModal,
  closeAddModal,
}) => {
  const tasks = useSelector((state) => state.tasks);
  return (
    <div className="taskLists">
      {tasks.taskLists.map((list) => (
        <div key={list.listId} className="taskList">
          <div className="taskListTitles">
            <EditTaskList
              list={list}
              openAddModal={openAddModal}
              openDeleteModal={openDeleteModal}
              openEditingDeleteModal={openEditingDeleteModal}
            />
            <DeleteTaskList list={list} openDeleteModal={openDeleteModal} />
          </div>
          <DisplayTask
            list={list}
            openDeleteModal={openDeleteModal}
            openAddModal={openAddModal}
            closeAddModal={closeAddModal}
            openEditingDeleteModal={openEditingDeleteModal}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskLists;
