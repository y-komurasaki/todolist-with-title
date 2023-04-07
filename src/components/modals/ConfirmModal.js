import React from 'react';
import './ConfirmModal.scss';

export const ConfirmDeleteModal = ({ showModal, closeModal, deleteConfirmation, deleteListConfirmation, listId, taskId }) => {
  console.log(listId, taskId)
  return (
    showModal && (
      <div className="modal">
        <div className="modalContent">
          <h2>本当に削除しますか？</h2>
          <div className="modalButtons">
            <button className="cancelButton" onClick={closeModal}>キャンセル</button>
            {/* モーダルを閉じで終わる */}
            {taskId ? (
              <button className="deleteButton" onClick={() => deleteConfirmation(listId, taskId)}>削除</button>
              ) : (
                <button onClick={() => deleteListConfirmation(listId)}>リストを削除</button>
              )}
            {/* 条件分岐でlistId, taskIdを受取った場合taskの削除、listIdのみ受け取った場合listの削除 */}
          </div>
        </div>
      </div>
    )
  );
};
