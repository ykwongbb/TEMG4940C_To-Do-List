import React, { useState } from 'react';
import Card from './Card';
import './App.css';

function Board() {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    const newTask = { title: newTaskTitle, description: newTaskDescription };
    setToDoTasks((prevTasks) => [...prevTasks, newTask]);
    // Clear form inputs
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const handleNewTaskTitleChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const handleNewTaskDescriptionChange = (event) => {
    setNewTaskDescription(event.target.value);
  };

  const handleUpdateTask = (index, newTitle, newDescription) => {
    setToDoTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        title: newTitle,
        description: newDescription,
      };
      return updatedTasks;
    });
  };

  const handleDeleteTask = (index) => {
    setToDoTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  };

  return (
    <div className="board-wrapper">
      <h1 className="title">To Do list</h1>
      <div className="board">
        <div className="list todo">
          <h2>To Do</h2>
          <div className="form-container">
            <form onSubmit={handleNewTaskSubmit}>
              <input
                type="text"
                name="title"
                value={newTaskTitle}
                onChange={handleNewTaskTitleChange}
                placeholder="Add a title"
                style={{ marginBottom: '10px' }}
                required
              />
              <textarea
                name="description"
                value={newTaskDescription}
                onChange={handleNewTaskDescriptionChange}
                placeholder="Add some description"
                rows="3"
                required
              />
              <div className="button-container">
                <button type="submit">Add Task</button>
              </div>
            </form>
          </div>
          <div className="card-list">
            {toDoTasks.map((task, index) => (
              <Card
                key={`task-${index}`}
                title={task.title}
                description={task.description}
                onUpdate={(newTitle, newDescription) => handleUpdateTask(index, newTitle, newDescription)}
                onDelete={() => handleDeleteTask(index)}
              />
            ))}
          </div>
        </div>
        <div className="list in-progress">
          <h2>In Progress</h2>
          {/* Display tasks in "In Progress" list here */}
        </div>
        <div className="list archived">
          <h2>Archived</h2>
          {/* Display tasks in "Archived" list here */}
        </div>
      </div>
    </div>
  );
}

export default Board;