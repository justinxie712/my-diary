import { useState, useEffect } from "react";
import "./styles.scss";
import { useAuth } from "../../context/AuthContext";
import DiaryEntry from "../DiaryEntry";
import EntryForm from "../EntryForm";

interface Entry {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

function Home() {
  const { token, logout } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/entries", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch entries: ${res.status}`);
        }

        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) {
      fetchEntries();
    }
  }, [token]);

  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:3000/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });

    const data = await res.json();
    if (res.ok) {
      setEntries([data, ...entries]);
      setNewTitle("");
      setNewContent("");
    } else {
      alert(data.error || "Could not create entry");
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      await fetch(`http://127.0.0.1:3000/api/entries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete entry:", err);
    }
  };

  return (
    <div className="home">
      <header>
        <h1>Diary.me</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <EntryForm
        title={newTitle}
        content={newContent}
        onTitleChange={setNewTitle}
        onContentChange={setNewContent}
        onSubmit={handleCreateEntry}
      />
      <div className="entries-log">
        {entries.map((entry) => (
          <DiaryEntry
            key={entry._id}
            entry={entry}
            onDelete={handleDeleteEntry}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
