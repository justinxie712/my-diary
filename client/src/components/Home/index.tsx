import { useState, useEffect } from "react";
import "./styles.scss";
import { useAuth } from "../../context/AuthContext";

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
    fetch("http://127.0.0.1:3000/api/entries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setEntries)
      .catch(console.error);
  }, [token]);

  const createEntry = async (e: React.FormEvent) => {
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

  return (
    <div className="home">
      <header>
        <h1>Diary.me</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <form onSubmit={createEntry} className="entry-form">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit">Add Entry</button>
      </form>

      <div className="entries-log">
        {entries.map((entry) => (
          <div key={entry._id} className="entry">
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
            <small>{new Date(entry.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
