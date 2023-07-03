import React, { useState, useCallback, useMemo } from 'react';


const Card = React.memo(({ title, description, index, status, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleTitleChange = useCallback((event) => {
    setUpdatedTitle(event.target.value);
  }, []);

  const handleDescriptionChange = useCallback((event) => {
    setUpdatedDescription(event.target.value);
  }, []);

  const handleCancelClick = useCallback(() => {
    setIsEditing(false);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  }, [title, description]);

  const handleSaveClick = useCallback(() => {
    setIsEditing(false);
    onUpdateTask(index, updatedTitle, updatedDescription, status);
  }, [index, status, updatedTitle, updatedDescription, onUpdateTask]);

  const handleDeleteClick = useCallback(() => {
    onDeleteTask(index, status);
  }, [index, status, onDeleteTask]);

  const cardBody = useMemo(() => {
    if (isEditing) {
      return (
        <>
          <input type="text" value={updatedTitle} onChange={handleTitleChange} />
          <textarea value={updatedDescription} onChange={handleDescriptionChange} />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      );
    } else {
      return (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      );
    }
  }, [isEditing, title, description, updatedTitle, updatedDescription, handleTitleChange, handleDescriptionChange, handleSaveClick, handleCancelClick, handleDeleteClick]);

  return (
    <div className="card">
      {cardBody}
    </div>
  );
});

export default Card;