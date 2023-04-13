import EditTask from "./EditTask";
import CheckedTask from "./CheckedTask";
import DeleteTask from "./DeleteTask";

const DisplayTask = ({ list, openModal }) => {
  return (
    <div className="displayTask">
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
