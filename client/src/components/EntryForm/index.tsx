import React from "react";
import "./styles.scss";

type EntryFormProps = {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const EntryForm: React.FC<EntryFormProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
}) => {
  const isDisabled = title.trim() === "" || content.trim() === "";

  return (
    <form onSubmit={onSubmit} className="entry-form">
      <input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="What's on your mind?"
        required
      />
      <button type="submit" disabled={isDisabled}>
        Add Entry
      </button>
    </form>
  );
};

export default EntryForm;
