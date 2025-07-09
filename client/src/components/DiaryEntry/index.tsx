import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import "./styles.scss";

type DiaryEntryProps = {
  entry: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
  };
  onDelete: (id: string) => void;
};

const DiaryEntry: React.FC<DiaryEntryProps> = ({ entry, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => setShowConfirm(true);
  const handleCancel = () => setShowConfirm(false);
  const handleConfirm = () => {
    onDelete(entry._id);
    setShowConfirm(false);
  };

  return (
    <div className="entry">
      <div className="entry-header">
        <h3>{entry.title}</h3>
        <button
          className="delete-btn"
          onClick={handleDeleteClick}
          aria-label="Delete diary entry"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
      <p className="entry-content">{entry.content}</p>
      <small>{new Date(entry.createdAt).toLocaleString()}</small>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{`Are you sure you want to delete the entry, "${entry.title}"?`}</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleConfirm}>
                Yes, delete
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryEntry;
