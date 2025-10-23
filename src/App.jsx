import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  // State to store all notes
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load notes from localStorage when app starts
  useEffect(() => {
    const savedNotes = localStorage.getItem('keepNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []); // Empty array means this runs once on mount [cite: 598]

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('keepNotes', JSON.stringify(notes));
  }, [notes]); // Runs whenever notes array changes [cite: 603]

  // Function to add a new note
  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(), // Simple unique ID using timestamp [cite: 609]
      title: noteData.title,
      content: noteData.content,
      createdAt: new Date().toISOString(),
    };
    // Add new note to beginning of array
    setNotes([newNote, ...notes]);
  };

  // Function to update an existing note
  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note => (
      note.id === id ? updatedNote : note
    )));
  };

  // Function to delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note => {
    const query = searchQuery.toLowerCase();
    const titleMatch = note.title.toLowerCase().includes(query);
    const contentMatch = note.content.toLowerCase().includes(query);
    return titleMatch || contentMatch;
  });

  return (
    <div className="app">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="app-main">
        <NoteForm addNote={addNote} />
        <NotesList
          notes={filteredNotes}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      </main>
    </div>
  );
}

export default App;