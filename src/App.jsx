import React, { useState, useEffect } from 'react';
import SidebarOpen from './Sidebar';
import NoteEditor from './NoteEditor';
// import foldersData from './data/folders.json';
// import notesData from './data/notes.json';



function App() {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folders, setFolders] = useState(() => {
  const saved = localStorage.getItem('folders');
  return saved ? JSON.parse(saved) : [];
});

const [notes, setNotes] = useState(() => {
  const saved = localStorage.getItem('notes');
  return saved ? JSON.parse(saved) : [];
});
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
  localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);



  useEffect(() => {
    const selected = notes.find(note => note.id === selectedNoteId);
    setSelectedNote(selected || null);
  }, [selectedNoteId, notes]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (updatedContent) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === selectedNoteId ? { ...note, content: updatedContent } : note
      )
    );
  };

const handleCreateNote = () => {
  if (!selectedFolderId) return;
  let a=prompt('Enter note title:');
  const newNote = {
    id: `note-${Date.now()}`,
    title: `${a}`,
    content: '',
    folderId: selectedFolderId
  };

  setNotes(prev => [...prev, newNote]);



  setFolders(prev => {
    return prev.map(folder =>
      folder.id === selectedFolderId
        ? {
            ...folder,
            notes: [...folder.notes, { id: newNote.id, title: newNote.title }]
          }
        : folder
    );
  });


  setSelectedNoteId(newNote.id);
};

const handleCreateFolder = () => {
  const folderName = prompt('Enter folder name:');
  if (!folderName || folderName.trim() === '') return;

  const newFolder = {
    id: `folder-${Date.now()}`,
    name: folderName.trim(),
    notes: []
  };

  setFolders(prev => [...prev, newFolder]);
};

const handleUpdateNoteTitle = (newTitle) => {
  setNotes(prev =>
    prev.map(note =>
      note.id === selectedNoteId ? { ...note, title: newTitle } : note
    )
  );

  setFolders(prev =>
    prev.map(folder => ({
      ...folder,
      notes: folder.notes.map(n =>
        n.id === selectedNoteId ? { ...n, title: newTitle } : n
      )
    }))
  );
};

  // deletion of file logic
  const handleDeleteNote = (noteId) => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  setFolders(prevFolders =>
    prevFolders.map(folder => ({
      ...folder,
      notes: folder.notes.filter(note => note.id !== noteId)
    }))
  );
  if (selectedNoteId === noteId) {
    setSelectedNoteId(null);
    setSelectedNote(null);
  }
};

  // delete folder logic
  const handleDeleteFolder = (folderId) => {
    if (!window.confirm("Are you sure you want to delete this folder?")) return;

    setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId));
    setNotes(prevNotes => prevNotes.filter(note => note.folderId !== folderId));
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null);
      setSelectedNoteId(null);
      setSelectedNote(null);
    }
  };

  //search logic
  const [searchQuery, setSearchQuery] = useState('');
  const filteredNotes = searchQuery
  ? notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];



  return (
    <div className="app">
      <SidebarOpen 
        folders={folders} 
        onNoteSelect={setSelectedNoteId} 
        onCreateNote={handleCreateNote}
        onFolderSelect={setSelectedFolderId}
        onCreateFolder={handleCreateFolder}
        onFolderDelete={handleDeleteFolder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredNotes={filteredNotes}
      />
      <NoteEditor note={selectedNote} onSave={handleSaveNote} onUpdateTitle={handleUpdateNoteTitle} onDelete={handleDeleteNote} />
    </div>
  );
}
export default App;

