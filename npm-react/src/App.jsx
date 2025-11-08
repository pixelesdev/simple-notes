import { useEffect, useState } from "react";
import Note from "./Note.jsx";
import "./style.css";

const newId = () =>
  (globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random()));

export default function App() {
  const [notes, setNotes] = useState([]);

  // --- Load notes once on mount ---
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setNotes(parsed);
      else setNotes([{ id: newId(), html: parsed }]);
    } catch {
      setNotes([{ id: newId(), html: saved }]);
    }
  }, []);

  // --- Save immediately to localStorage ---
  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  // --- Note operations ---
  const addNote = () => saveNotes([...notes, { id: newId(), html: "" }]);
  const updateNote = (id, html) =>
    saveNotes(notes.map((n) => (n.id === id ? { ...n, html } : n)));
  const deleteNote = (id) =>
    saveNotes(notes.filter((n) => n.id !== id));

  return (
    <div className="app">
      <div className="header">
        <h1 id="main-header">
          Sticky Notes <img src="/assets/note.png" alt="icon" />
        </h1>
        <p id="welcome">Welcome! Create and save your notes below.</p>
      </div>

      <div className="container">
        <button id="create-note" onClick={addNote}>
          <img src="/assets/edit.png" alt="" /> New Note
        </button>

        <div className="notes-container">
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              initialHtml={note.html}
              onChange={updateNote}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
