import { useDispatch, useSelector } from "react-redux";
import { editTask, deleteTask } from "../../features/Tasks";
import { useState } from "react";

const EditTask = ({ list, task, openAddModal }) => {
  const [editInputTaskText, setEditInputTaskText] = useState();
  //タスク編集時の新たに更新するtext情報
  const [editTaskId, setEditTaskId] = useState(null);
  //現在クリックしているタスクを編集フォームを展開させるためのid
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

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

    const isExistingTask = tasks.taskLists.some((taskList) =>
      taskList.contents.some((task) => task.text === editInputTaskText)
    );

    if (isExistingTask) {
      openAddModal();
      return;
    }

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

  return (
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
  );
};

export default EditTask;
