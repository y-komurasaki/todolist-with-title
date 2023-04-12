import { useDispatch } from "react-redux";
import { editTask, deleteTask, checkedTask } from "../../features/Tasks";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DisplayTask = ({ list, openModal }) => {
  const dispatch = useDispatch();
  const [editInputTaskText, setEditInputTaskText] = useState();
  //タスク編集時の新たに更新するtext情報
  const [editTaskId, setEditTaskId] = useState(null);
  //現在クリックしているタスクを編集フォームを展開させるためのid

  const editTaskClick = (currentTaskId, currentTaskText) => {
    setEditTaskId(currentTaskId);
    //引数で現在クリックしているリストid情報とタスクid情報を受け取り既存のidと一致させフォームを展開して役割を終える。
    setEditInputTaskText(currentTaskText);
    //現在のtext情報の状態を持たせる
  };

  const editTextChange = (e) => {
    setEditInputTaskText(e.target.value);
    //実行した場合入力した文字がInputTaskTextにセットされる
    //タスク編集時に展開した入力フォームに入力したtext情報
  };

  const editDataSubmit = (e, currentListId, currentTaskId) => {
    e.preventDefault();
    if (editInputTaskText.match(/[ｦ-ﾟァ-ン０-９]+/)) return;
    //matchメソッドで半角カナ全角英数字登録せず返却
    dispatch(
      editTask({
        listId: currentListId,
        //現在フォームが展開しているタスクのid情報
        taskId: currentTaskId,
        //現在フォームが展開しているタスクのid情報
        editText: editInputTaskText,
        //編集フォーム入力したtext情報
      })
    );
    if (editInputTaskText === "")
      return dispatch(
        deleteTask({
          listId: currentListId,
          taskId: currentTaskId,
        })
      );
    //編集中テキストが空の場合はdeleteTaskの処理を実行
    setEditInputTaskText("");
    //編集テキストフォームを空にして初期化する
    setEditTaskId(null);
    //taskIdをnullにしてフォームが閉じた状態を戻す
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

  const deleteTaskClick = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    openModal(currentListId, currentTaskId);
    //コールバック関数でopenModalを呼び出し引数でidを渡す
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

          <div
            onClick={() => editTaskClick(task.id, task.text)}
            className="taskContents"
          >
            {editTaskId === task.id ? (
              //編集したいidとマップのidが一致してるならフォームを展開する
              <form onSubmit={(e) => editDataSubmit(e, list.listId, task.id)}>
                <input
                  type="text"
                  onChange={editTextChange}
                  defaultValue={task.text}
                />
              </form>
            ) : (
              <h3> {task.text}</h3>
            )}
          </div>
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
