import { useState, useEffect } from "react";
import "./styles.scss";
import { useAuth } from "../../context/AuthContext";
import DiaryEntry from "../DiaryEntry";
import EntryForm from "../EntryForm";
import EditEntryModal from "../EditEntryModal";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/entries", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Failed to fetch entries: ${res.status}`);

        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchEntries();
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

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error(`Server responded with ${response.status}`);

      console.log("Account deleted successfully");
      logout();
    } catch (err) {
      console.error("Failed to delete account:", err);
    } finally {
      setShowDeleteModal(false); // close modal either way
    }
  };

  const handleEditClick = (entry: Entry) => {
    setSelectedEntry(entry);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (updatedEntry: Entry) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/entries/${updatedEntry._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEntry),
        }
      );

      if (!res.ok) throw new Error("Failed to save entry");

      const updated = await res.json();
      setEntries((prev) =>
        prev.map((entry) => (entry._id === updated._id ? updated : entry))
      );
      setIsEditOpen(false);
      setSelectedEntry(null);
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Could not save entry.");
    }
  };

  return (
    <div className="home">
      <header>
        <h1>Diary.me</h1>
        <UncontrolledDropdown>
          <DropdownToggle caret>Account</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem onClick={() => setShowDeleteModal(true)}>
              Delete Account
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
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
            onEdit={handleEditClick}
          />
        ))}
      </div>
      <EditEntryModal
        isOpen={isEditOpen}
        entry={selectedEntry}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedEntry(null);
        }}
        onSave={handleSaveEdit}
      />
      <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)}>
        <ModalHeader toggle={() => setShowDeleteModal(false)}>
          Confirm Account Deletion
        </ModalHeader>
        <ModalBody>
          Are you absolutely sure you want to delete your account? This action
          is permanent and cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteAccount}>
            Yes, delete my account
          </Button>
          <Button color="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Home;
