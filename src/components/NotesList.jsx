import React from "react";
import Note from "./Note";
import "./NotesList.css";

function NotesList({ notes, updateNote, deleteNote, togglePinNote }) {
  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <svg width="120" height="120" viewBox="0 0 24 24"></svg>
        <p className="notes-empty-text">Notes you add appear here</p>
      </div>
    );
  }

  const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned);

  return (
    <div className="notes-container">
      <div className="notes-grid">
        {sortedNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            updateNote={updateNote}
            deleteNote={deleteNote}
            togglePinNote={togglePinNote}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesList;
