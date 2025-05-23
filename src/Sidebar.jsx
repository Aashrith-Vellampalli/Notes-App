import React, { useState } from 'react';
import FolderItem from './FolderItem';


function SidebarOpen({ folders,onNoteSelect, onCreateNote, onFolderSelect,onCreateFolder,onFolderDelete,searchQuery,setSearchQuery,filteredNotes, }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar_1">
        {isOpen && (
          <>
            <h2 className='logo_name'>KIK NOTES</h2>
          </>
        )}
        <button className="sidebar_btn menu" onClick={toggleOpen}>
          <img src={isOpen ? "close.svg" : "open.svg"} />
        </button>
      </div>

      {isOpen && (
        <>
          <ul className='sidebar_list'>
            <li className='sidebar_item'><button className="sidebar_btn" onClick={onCreateFolder}><img src="create_new_folder.svg" /></button></li>
            <li className='sidebar_item'><button className="sidebar_btn" onClick={onCreateNote}><img src="create_file.svg" /></button></li>
            {/* <li className='sidebar_item'><button className="sidebar_btn"><img src="public/edit_file.svg" /></button></li> */}
          </ul>
          <div className='search_space'>
            <div className="sidebar_1">
              <button className="sidebar_btn"><img src="search.svg" alt="Search" /></button>
              <input type="text" placeholder="Search..." className="search"   value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /> 
            </div>
            
            {searchQuery && filteredNotes.length > 0 && (
              <ul className="search-results">
              {filteredNotes.map(note => (
                <li key={note.id} className="search-result-item">
                  <button className="sidebar_btn" onClick={() => onNoteSelect(note.id)}>
                  {note.title}
                  </button>
                </li>
              ))}
              </ul>
          )}
          </div>
          {folders.map((folder) => (
            <FolderItem 
              key={folder.id} 
              folder={folder} 
              onNoteSelect={onNoteSelect}
              onFolderSelect={onFolderSelect}
              onFolderDelete={onFolderDelete}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default SidebarOpen;