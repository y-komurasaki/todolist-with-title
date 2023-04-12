import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { addTask } from "../../features/Tasks";

const AddTask = ({ list, listId, openAddModal, closeAddModal }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [newTaskText, setNewTaskText] = useState({});
  //新しいタスクを生成したときのtext情報
  const addTaskClick = () => {
    //引数で現在クリックしているタスクの親リストのlistIdを受け取る
    if (
      newTaskText[listId] === "" ||
      newTaskText[listId].match(/[ｦ-ﾟァ-ン０-９]+/)
    )
      return;
    //textの中身が空白なら登録せず返却、matchメソッドで半角カナ全角英数字登録せず返却

    const isExistingTask = tasks.taskLists.some((list) =>
      list.contents.some((task) => task.text === newTaskText[listId])
    );
    //some関数でListの中のTaskを確認し現在のtask.textと入力したtextが同じならtrueを返す
    if (isExistingTask) {
      openAddModal();
      return;
      //isExistingListがtrueならモーダルを開き登録されない
    }

    const taskId = uuidv4();
    //タスク生成時にuniqueな重複しないidをuuidで設定
    //初期値で引っ張ると同じidが重複してしまうためこのタイミング
    dispatch(
      addTask({
        listId: listId,
        //引数で受け取った追加しようとしているタスクのlistId
        taskId: taskId,
        //生成時にsetしたuniqueなIdの状態を持ったtaskId
        newTaskText: newTaskText[listId],
        //Todoフォームで入力したtext情報
      })
    );
    console.log(listId);
    console.log(taskId);

    setNewTaskText({
      ...newTaskText,
      [listId]: "",
    });
    //入力フォームを空にするための処理
    closeAddModal();
  };

  return (
    <div className="addTodoContents">
      <input
        type="text"
        placeholder="Todoを入力"
        onChange={(e) =>
          setNewTaskText({
            ...newTaskText,
            [list.listId]: e.target.value,
          })
        }
        value={newTaskText[list.listId] || ""}
        className="inputTodo"
      />
      <FontAwesomeIcon
        className="addTodoButton"
        icon={faSquarePlus}
        onClick={() => addTaskClick(list.listId)}
      ></FontAwesomeIcon>
    </div>
  );
};

export default AddTask;
