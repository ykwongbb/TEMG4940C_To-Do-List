import React, { useState, useEffect, useRef } from 'react';

function Card({ title, description, position, index, status, onUpdateTask, onDeleteTask, disabled }) {
  const [editMode, setEditModeLocal] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [originalData, setOriginalData] = useState({ title, description });
  const [selected, setSelected] = useState(false);
  const prevCardRef = useRef(null);

  useEffect(() => {
    setOriginalData({ title, description });
    setNewTitle(title);
    setNewDescription(description);
  }, [title, description]);

  useEffect(() => {
    // Unset edit mode state of previous card
    if (prevCardRef.current && prevCardRef.current !== index) {
      prevCardRef.current.setEditModeLocal(false);
    }
    // Reset edit mode state when position changes
    setEditModeLocal(false);
  }, [position, index]);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const handleEditMode = () => {
    if (!disabled) {
      prevCardRef.current = index;
      setSelected(true);
      setOriginalData({ title, description });
      setEditModeLocal(true);
    }
  };

  const handleCancel = () => {
    setNewTitle(originalData.title);
    setNewDescription(originalData.description);
    setEditModeLocal(false);
    setSelected(false);
  };

  const handleSave = () => {
    onUpdateTask(index, newTitle, newDescription, status);
    setOriginalData({ title: newTitle, description: newDescription });
    setEditModeLocal(false);
    setSelected(false);
  };

  const handleDelete = () => {
    onDeleteTask(index, status);
  };

  const handleClick = () => {
    if (!editMode && !disabled) {
      setEditModeLocal(true);
    }
  };

  return (
    <div className={`card ${selected ? 'selected' : ''}`} onClick={handleClick}>
      {editMode ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="text" value={newTitle} onChange={handleTitleChange} />
          <textarea value={newDescription} onChange={handleDescriptionChange} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="card-btn card-save-btn" onClick={handleSave}>Save</button>
            <button className="card-btn card-cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>{title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p>{description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="card-btn card-edit-btn" onClick={handleEditMode} disabled={disabled}>Edit</button>
              <button className="card-btn card-delete-btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;