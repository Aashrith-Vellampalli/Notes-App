import React, { useState } from 'react';

function FolderItem({ folder, onNoteSelect , onFolderSelect, onFolderDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="folder-item">
      <div className="folder-header" 
      onClick={() => {
        toggleOpen();
        onFolderSelect && onFolderSelect(folder.id);
      }}>
        <img
          src={isOpen ? "down_arrow.svg" : "right_arrow.svg"}
          className="folder-icon"
          alt="toggle"
        />
        <h2 className="folder-name">{folder.name}</h2>
        <button  className="delete_file_btn"onClick={(e) => {
          e.stopPropagation();
          onFolderDelete(folder.id);
          }}>
          <img src="delete_file.svg" />
        </button>
      </div>

      {isOpen && folder.notes && (
        <ul className="note-list">
          {folder.notes.map(note => (
            <li key={note.id} className="note-item">
              <button className="sidebar_btn" onClick={() => onNoteSelect(note.id)}>
                {note.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FolderItem;