import "./App.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTaskList,
  editTask,
  deleteTask,
  checkedTask,
} from "./features/Tasks";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import {
  ConfirmDeleteModal,
  RegisteredAlertModal,
} from "./components/modals/ConfirmModal";
import AddTaskList from "./components/taskLists/AddTaskList";
import TaskLists from "./components/taskLists/TaskLists";

function App() {
  //現在クリックしているリストタイトルを編集フォームを展開させるためのid

  const [editInputTaskText, setEditInputTaskText] = useState();
  //タスク編集時の新たに更新するtext情報
  const [editTaskId, setEditTaskId] = useState(null);
  //現在クリックしているタスクを編集フォームを展開させるためのid
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [addShowModal, setAddShowModal] = useState(false);
  const [deleteListId, setDeleteListId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  //モーダル開く開かないの状態管理、削除時に管理するidの状態

  const tasks = useSelector((state) => state.tasks);
  //sliceとの状態保持した情報やりとりさせるためメソッドを扱えるようにした変数
  const dispatch = useDispatch();
  //下記dispatchで全てsliceのaction.payloadに渡すためのメソッドを扱えるようにした変数

  const openAddModal = () => {
    setAddShowModal(true);
    //状態をtrueにしてモーダルを表示
  };

  const closeAddModal = () => {
    setAddShowModal(false);
    //状態をfalseにしてモーダルを閉じる
  };

  const deleteListConfirmation = (currentListId) => {
    dispatch(
      deleteTaskList({
        listId: currentListId,
        //引数で現在クリックしているリストid情報
      })
    );
    closeModal();
  };

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

  const openModal = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    setDeleteListId(currentListId);
    setDeleteTaskId(currentTaskId);
    //それぞれのidをstateにセットする
    setDeleteShowModal(true);
    //状態をtrueにしてモーダルを表示
  };

  const closeModal = () => {
    setDeleteShowModal(false);
  };

  const deleteTaskClick = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    openModal(currentListId, currentTaskId);
    //コールバック関数でopenModalを呼び出し引数でidを渡す
  };

  const deleteConfirmation = (currentListId, currentTaskId) => {
    //モーダルの削除ボタンが押されたら処理が走る
    dispatch(
      deleteTask({
        listId: currentListId,
        taskId: currentTaskId,
        //引数で現在クリックしているリストid情報とタスクid情報
      })
    );
    closeModal();
    //モーダルを閉じて処理を終える
  };

  return (
    <div className="App">
      {deleteShowModal && (
        <ConfirmDeleteModal
          showModal={deleteShowModal}
          closeModal={closeModal}
          deleteConfirmation={deleteConfirmation}
          deleteListConfirmation={deleteListConfirmation}
          listId={deleteListId}
          taskId={deleteTaskId}
        />
      )}
      {addShowModal && (
        <RegisteredAlertModal
          showModal={addShowModal}
          closeModal={closeAddModal}
        />
      )}

      <AddTaskList openAddModal={openAddModal} />
      <TaskLists
        openAddModal={openAddModal}
        openModal={openModal}
        closeAddModal={closeAddModal}
      />

      {/* <div className="addTodoContents">
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
            >
              削除
            </FontAwesomeIcon>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default App;
