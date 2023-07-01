import React, { useState } from 'react';
import './App.css';

function Card({ title, description, onUpdate, onDelete }) {
  const [editable, setEditable] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    onUpdate(editedTitle, editedDescription);
    setEditable(false);
  };

  const handleCancel = () => {
    setEditable(false);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="card">
      {editable ? (
        <>
          <input type="text" value={editedTitle} onChange={handleTitleChange} className="card-input" />
          <textarea value={editedDescription} onChange={handleDescriptionChange} className="card-textarea"></textarea>
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Card;