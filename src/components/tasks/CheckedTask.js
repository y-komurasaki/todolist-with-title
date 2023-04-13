import { checkedTask } from "../../features/Tasks";
import { useDispatch } from "react-redux";

const CheckedTask = ({ list, task }) => {
  const dispatch = useDispatch();
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
    <input
      type="checkbox"
      defaultChecked={task.completed}
      onChange={(e) =>
        taskCheckedChange(list.listId, task.id, e.target.checked)
      }
    />
  );
};

export default CheckedTask;
