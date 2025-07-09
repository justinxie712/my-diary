import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

type Entry = {
  _id: string;
  title: string;
  content: string;
};

type EditEntryModalProps = {
  isOpen: boolean;
  entry: Entry | null;
  onClose: () => void;
  onSave: any;
};

const EditEntryModal: React.FC<EditEntryModalProps> = ({
  isOpen,
  entry,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
    }
  }, [entry]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entry) {
      onSave({ ...entry, title, content });
    }
  };

  if (!isOpen || !entry) return null;

  return (
    <div className="edit-overlay">
      <div className="edit-modal" ref={modalRef}>
        <h2>Edit Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            required
          />
          <div className="modal-buttons">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEntryModal;
