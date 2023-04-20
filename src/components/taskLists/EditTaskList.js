import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTaskList, deleteTaskList } from "../../features/Tasks";

const EditTaskList = ({ list, openAddModal }) => {
  const [editListTitleText, setEditListTitleText] = useState("");
  //タスク編集時の新たに更新するtext情報
  const [editListId, setEditListId] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const editTitleClick = () => {
    setEditListId(list.listId);
    //引数で現在クリックしているリストid情報とタスクid情報を受け取り既存のidと一致させフォームを展開して役割を終える。
    setEditListTitleText(list.title);
    //入力した文字がInputTitleTextにセットされる
  };

  const editTitleTextChange = (e) => {
    setEditListTitleText(e.target.value);
  };

  const editTitleDataSubmit = (e) => {
    e.preventDefault();

    if (editListTitleText.match(/[ｦ-ﾟァ-ン０-９]+/)) {
      return;
    }

    const isExistingList = tasks.taskLists.some(
      (list) => list.title === editListTitleText
    );

    //some関数で現在のタイトルと入力したtextが同じならtrueを返す
    if (isExistingList) {
      openAddModal();
      return;
      //isExistingListがtrueならモーダルを開き登録されない
      //matchメソッドで半角カナ全角英数字登録せず返却
    }

    dispatch(
      editTaskList({
        listId: list.listId,
        //現在フォームが展開しているタスクのid情報
        editListTitleText: editListTitleText,
        //編集フォーム入力したtext情報
      })
    );

    if (editListTitleText === "") {
      dispatch(deleteTaskList({ listId: list.listId }));
    }
    //編集中テキストが空の場合はdeleteTaskの処理を実行
    setEditListTitleText("");
    //編集テキストフォームを空にして初期化する
    setEditListId(null);
  };

  return (
    <div className="listTitles" onClick={editTitleClick}>
      {editListId === list.listId ? (
        <form onSubmit={editTitleDataSubmit}>
          <input
            type="text"
            onChange={editTitleTextChange}
            defaultValue={list.title}
          />
        </form>
      ) : (
        <p>{list.title}</p>
      )}
    </div>
  );
};

export default EditTaskList;
