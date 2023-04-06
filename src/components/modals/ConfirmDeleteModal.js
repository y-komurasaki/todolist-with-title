import React from 'react';
import './ConfirmDeleteModal.scss';

const ConfirmDeleteModal = ({ showModal, closeModal, deleteConfirmation, listId, taskId }) => {
  console.log(listId, taskId)
  return (
    showModal && (
      <div className="modal">
        <div className="modalContent">
          <h2>本当に削除しますか？</h2>
          <div className="modalButtons">
            <button className="cancelButton" onClick={closeModal}>キャンセル</button>
            {/* モーダルを閉じで終わる */}
            <button className="deleteButton" onClick={() => deleteConfirmation(listId, taskId)}>削除する</button>
            {/* 削除の処理が走る */}
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmDeleteModal;
