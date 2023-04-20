import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { addTaskList } from "../../features/Tasks";

const AddTaskList = ({ openAddModal }) => {
  const [newListTitleText, setNewListTitleText] = useState("");
  //リストのタイトルのテキスト情報
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const addTaskListClick = () => {
    if (newListTitleText === "" || newListTitleText.match(/[ｦ-ﾟ０-９]+/))
      return;
    //textの中身が空白なら登録せず返却、matchメソッドで半角カナ全角英数字登録せず返却
    const isExistingList = tasks.taskLists.some(
      (list) => list.title === newListTitleText
    );
    //some関数で現在のタイトルと入力したtextが同じならtrueを返す
    if (isExistingList) {
      openAddModal();
      return;
      //isExistingListがtrueならモーダルを開き登録されない
    }

    const listId = uuidv4();
    //リスト生成時にuniqueな重複しないidをuuidで設定
    //初期値で引っ張ると同じidが重複してしまうためこのタイミング
    dispatch(
      addTaskList({
        listId: listId,
        //生成時にsetしたuniqueなIdの状態を持ったlistId
        newTitleText: newListTitleText,
        //タイトル入力フォームで入力したtext情報
      })
    );
    setNewListTitleText("");
    //入力フォームを空にするための処理
  };

  return (
    <div className="inputTitleContents">
      <input
        type="text"
        placeholder="タイトルを入力"
        onChange={(e) => setNewListTitleText(e.target.value)}
        value={newListTitleText}
        className="inputTitle"
      />
      <FontAwesomeIcon
        icon={faSquarePlus}
        className="listAddButton"
        onClick={() => addTaskListClick()}
      />
    </div>
  );
};

export default AddTaskList;
