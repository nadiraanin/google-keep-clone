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
                              <span className="palette-icon">🎨</span>
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