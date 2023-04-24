import "./App.scss";
import { useDispatch } from "react-redux";
import { deleteTaskList, deleteTask } from "./features/Tasks";
import { useState } from "react";
import {
  ConfirmDeleteModal,
  ConfirmEditingDeleteModal,
  RegisteredAlertModal,
} from "./components/modals/ConfirmModal";
import AddTaskList from "./components/taskLists/AddTaskList";
import TaskLists from "./components/taskLists/TaskLists";

function App() {
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [editingDeleteShowModal, setEditingDeleteShowModal] = useState(false);
  const [addShowModal, setAddShowModal] = useState(false);
  const [deleteListId, setDeleteListId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  //モーダル開く開かないの状態管理、削除時に管理するidの状態

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

  const openDeleteModal = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    setDeleteListId(currentListId);
    setDeleteTaskId(currentTaskId);
    //それぞれのidをstateにセットする
    setDeleteShowModal(true);
    //状態をtrueにしてモーダルを表示
  };

  const openEditingDeleteModal = (currentListId, currentTaskId) => {
    //引数で現在クリックしているリストid情報とタスクid情報を受けとる
    setDeleteListId(currentListId);
    setDeleteTaskId(currentTaskId);
    //それぞれのidをstateにセットする
    setEditingDeleteShowModal(true);
    //状態をtrueにしてモーダルを表示
  };

  const closeModal = () => {
    setDeleteShowModal(false);
    setEditingDeleteShowModal(false);
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
  const EditingDeleteConfirmation = (currentListId, currentTaskId) => {
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
          deleteShowModal={deleteShowModal}
          closeModal={closeModal}
          deleteConfirmation={deleteConfirmation}
          deleteListConfirmation={deleteListConfirmation}
          listId={deleteListId}
          taskId={deleteTaskId}
        />
      )}
      {editingDeleteShowModal && (
        <ConfirmEditingDeleteModal
          editingDeleteShowModal={editingDeleteShowModal}
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
        openDeleteModal={openDeleteModal}
        openEditingDeleteModal={openEditingDeleteModal}
        closeAddModal={closeAddModal}
      />
    </div>
  );
}

export default App;
