import React, { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Card = React.memo(({ id, title, description, status, onUpdateTask, onDeleteTask }) => {
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

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  }, [title, description]);

  const handleSaveClick = useCallback(() => {
    setIsEditing(false);
    onUpdateTask(id, updatedTitle, updatedDescription, status);
  }, [id, status, updatedTitle, updatedDescription, onUpdateTask]);

  const handleDeleteClick = useCallback(() => {
    onDeleteTask(id, status);
  }, [id, status, onDeleteTask]);

  const cardBody = useMemo(() => {
    if (isEditing) {
      return (
        <>
          <input type="text" value={updatedTitle} onChange={handleTitleChange} />
          <br />
          <textarea value={updatedDescription} onChange={handleDescriptionChange} />
          <br />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      );
    } else {
      return (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      );
    }
  }, [isEditing, title, description, updatedTitle, updatedDescription, handleTitleChange, handleDescriptionChange, handleSaveClick, handleCancelClick, handleEditClick, handleDeleteClick]);

  const taskId = useMemo(() => uuidv4(), []);

  return (
    <div className="card" key={taskId}>
      {cardBody}
    </div>
  );
});

export default Card;