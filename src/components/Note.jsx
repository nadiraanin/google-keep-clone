import React, { useState } from "react";
import "./Note.css";
const COLORS = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa'];
function Note({ note, updateNote, deleteNote, togglePinNote }) {
  // State to track if note is being edited
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  // Save edited note
  const handleSave = () => {
    updateNote(note.id, {
      ...note,
      title: editTitle,
      content: editContent,
    });
    setIsEditing(false);
  };

  // Cancel editing and restore original values
  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };
  // Delete note with confirmation
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.id);
    }
 };

    const handleColorChange = (newColor) => {
        updateNote(note.id, {
            ...note,
            color: newColor,
        });
    };
  return (
      <div className="note" style={{ backgroundColor: note.color }}>
      {isEditing ? (
        // Edit Mode
        <div className="note-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="note-edit-input"
            autoFocus
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Take a note..."
            className="note-edit-textarea"
            rows={4}
          />
          <div className="note-edit-footer">
            <div className="note-actions-left">
              {/* Pin Button */}
              <button
                className="note-pin"
                title={note.isPinned ? "Unpin note" : "Pin note"}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePinNote(note.id);
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  {note.isPinned ? (
                    <path
                      fill="currentColor"
                      d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"
                    />
                  ) : (
                    <path
                      fill="currentColor"
                      d="M17 4v7l2 2v2h-6v6h-2v-6H5v-2l2-2V4h10m0-2H7v2h1v7.5L6 13v1h12v-1l-2-1.5V4h1V2z"
                    />
                  )}
                </svg>
              </button>
            </div>
            <div className="note-edit-actions">
              <button
                onClick={handleSave}
                className="note-button note-button-save"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="note-button note-button-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="note-view" onClick={() => setIsEditing(true)}>
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>
                      <div className="note-actions">
                          {/* === Tombol Pin === */}
                          <button
                              className="note-pin"
                              title={note.isPinned ? "Unpin note" : "Pin note"}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  togglePinNote(note.id);
                              }}
                          >
                              <svg width="24" height="24" viewBox="0 0 24 24">
                                  {note.isPinned ? (
                                      <path fill="currentColor" d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                                  ) : (
                                      <path fill="currentColor" d="M17 4v7l2 2v2h-6v6h-2v-6H5v-2l2-2V4h10m0-2H7v2h1v7.5L6 13v1h12v-1l-2-1.5V4h1V2z" />
                                  )}
                              </svg>
                          </button>
                          {/* === Palet Warna (Baru) === */}
                          <div className="color-palette">
                              <button className="palette-icon" title="Change color">
                                  <svg width="24" height="24" viewBox="0 0 24 24">
                                      <path fill="currentColor" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5c-6.08 0-11-4.92-11-11S5.92 1 12 1s11 4.92 11 11c0 1.54-.31 3-.87 4.36.21-.06.42-.12.63-.2.33-.12.68-.18 1.04-.18 1.1 0 2 .9 2 2s-.9 2-2 2c-.36 0-.71-.06-1.04-.18-.21-.08-.42-.14-.63-.2C15 21.69 13.54 22 12 22c-4.97 0-9-4.03-9-9s4.03-9 9-9zM6.5 12c0-1.93 1.57-3.5 3.5-3.5.92 0 1.75.36 2.37.95-1.45.69-2.43 2.13-2.43 3.82 0 .97.31 1.85.83 2.57C9.36 15.25 6.5 15.91 6.5 12zm7.63-2.05c.61-.61.97-1.45.97-2.45 0-1.93-1.57-3.5-3.5-3.5-1.12 0-2.11.53-2.75 1.34 1.12.86 1.82 2.21 1.82 3.76 0 .63-.12 1.23-.33 1.78.75.05 1.47-.16 2.05-.74zM12 19.5c1.93 0 3.5-1.57 3.5-3.5 0-1.39-.82-2.58-1.97-3.13-.21.75-.63 1.42-1.22 1.94-.59.52-1.33.87-2.16.97.46 1.25 1.66 2.15 3.09 2.15z" />
                                  </svg>
                              </button>
                              <div className="colors-container">
                                  {COLORS.map(color => (
                                      <div
                                          key={color}
                                          className="color-dot"
                                          style={{ backgroundColor: color }}
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              handleColorChange(color);
                                          }}
                                      />
                                  ))}
                              </div>
                          </div>
                          {/* === Tombol Delete === */}
                          <button
                              onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete();
                              }}
                              className="note-delete"
                              title="Delete note"
                          >
                              <svg width="24" height="24" viewBox="0 0 24 24">
                                  <path
                                      fill="currentColor"
                                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                  />
                              </svg>
                          </button>
                      </div>
        </div>
      )}
    </div>
  );
}
export default Note;