import EditTask from "./EditTask";
import CheckedTask from "./CheckedTask";
import DeleteTask from "./DeleteTask";
import AddTask from "./AddTask";

const DisplayTask = ({ list, openModal, openAddModal, closeAddModal }) => {
  return (
    <div className="displayTask">
      <AddTask
        list={list}
        openAddModal={openAddModal}
        closeAddModal={closeAddModal}
      />
      {list.contents.map((task) => (
        <div key={task.id} className="task">
          <CheckedTask list={list} task={task} />
          <EditTask list={list} task={task} />
          <DeleteTask list={list} task={task} openModal={openModal} />
        </div>
      ))}
    </div>
  );
};

export default DisplayTask;
