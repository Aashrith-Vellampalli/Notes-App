import React, { useState, useEffect } from 'react';

function NoteEditor({ note, onSave, onUpdateTitle, onDelete }) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (note) {
      setContent(note.content || '');
      setTitle(note.title || '');
    }
  }, [note?.id]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    onSave?.(newContent);
  };

  const handleTitleDoubleClick = () => {
    const newTitle = prompt('Enter new title:', title);
    if (newTitle && newTitle.trim()) {
      setTitle(newTitle);
      onUpdateTitle?.(newTitle);
    }
  };

  if (!note) return(
    <div className="note-editor">
      <p>
        Kik Notes is your minimalist and powerful note-taking companion — designed for clarity, speed, and focus.<br />

        Whether you're jotting down ideas, organizing tasks, or drafting projects, Kik Notes helps you stay productive with:<br/>
	        •	🗂️ Folder-based organization<br></br>
	        •	📝 Clean and distraction-free writing <br />
	        •	🔒 Local-first storage for privacy <br />
	        •	🌙 Sleek dark mode with elegant gold highlights <br />

         Tailored for your workflow, Kik Notes keeps your thoughts in sync and your interface beautiful.
      </p>
    </div>
    );

  return (
    <div className="note-editor">
      <div className="title_space">
        <h2 onDoubleClick={handleTitleDoubleClick}>{title}</h2>
        <button className="delete_btn" onClick={()=>onDelete(note.id)}><img src="delete_file.svg"/></button>
      </div>
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing your note here..."
        className="note-textarea"
      />
    </div>
  );
}

export default NoteEditor;