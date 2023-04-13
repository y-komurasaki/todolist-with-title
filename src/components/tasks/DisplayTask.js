import { useDispatch } from "react-redux";
import { checkedTask } from "../../features/Tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import EditTask from "./EditTask";

const DisplayTask = ({ list, openModal }) => {
  const dispatch = useDispatch();

  const deleteTaskClick = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    openModal(currentListId, currentTaskId);
    //コールバック関数でopenModalを呼び出し引数でidを渡す
  };

  const taskCheckedChange = (currentListId, currentTaskId, taskCompleted) => {
    //現在のリストIdとタスクId、チェックボックスの値e.target.checkedでtrue,falseを受け取る。
    dispatch(
      checkedTask({
        listId: currentListId,
        taskId: currentTaskId,
        taskCompleted: taskCompleted,
      })
      //上記で受け取った値をdispatchに渡す
    );
  };

  return (
    <div className="displayTask">
      {list.contents.map((task) => (
        <div key={task.id} className="task">
          <input
            type="checkbox"
            defaultChecked={task.completed}
            onChange={(e) =>
              taskCheckedChange(list.listId, task.id, e.target.checked)
            }
          />
          <EditTask list={list} listId={list.id} task={task} />

          <FontAwesomeIcon
            className="taskDeleteButton"
            icon={faTrashCan}
            onClick={() => deleteTaskClick(list.listId, task.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTask;
