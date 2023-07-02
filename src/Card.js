import React, { useState } from 'react';

function Card({ title, description, index, status, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setUpdatedDescription(event.target.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdateTask(index, updatedTitle, updatedDescription, status);
  };

  const handleDeleteClick = () => {
    onDeleteTask(index, status);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input type="text" value={updatedTitle} onChange={handleTitleChange} />
          <textarea value={updatedDescription} onChange={handleDescriptionChange} />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Card;