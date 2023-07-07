import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import './App.css';

function Board() {
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('boardData'));
    if (storedData) {
      setToDoTasks(storedData.toDoTasks || []);
      setInProgressTasks(storedData.inProgressTasks || []);
      setArchivedTasks(storedData.archivedTasks || []);
    }
  }, []);

  useEffect(() => {
    const boardData = { toDoTasks, inProgressTasks, archivedTasks };
    localStorage.setItem('boardData', JSON.stringify(boardData));
  }, [toDoTasks, inProgressTasks, archivedTasks]);


  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    const newTask = { title: newTaskTitle, description: newTaskDescription };
    setToDoTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
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

  const handleUpdateTask = (index, newTitle, newDescription, status) => {
    if (status === 'todo') {
      setToDoTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[index] = {
          title: newTitle,
          description: newDescription,
        };
        return updatedTasks;
      });
    } else if (status === 'inProgress') {
      setInProgressTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[index] = {
          title: newTitle,
          description: newDescription,
        };
        return updatedTasks;
      });
    } else if (status === 'archived') {
      setArchivedTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[index] = {
          title: newTitle,
          description: newDescription,
        };
        return updatedTasks;
      });
    }
  };

  const handleDeleteTask = (index, status) => {
    if (status === 'todo') {
      setToDoTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks.splice(index, 1);
        return updatedTasks;
      });
    } else if (status === 'inProgress') {
      setInProgressTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks.splice(index, 1);
        return updatedTasks;
      });
    } else if (status === 'archived') {
      setArchivedTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks.splice(index, 1);
        return updatedTasks;
      });
    }
  };

  const handleDragEnd = (result) => {
  if (!result.destination) {
    return;
  }

  const { source, destination } = result;

  const sourceListId = source.droppableId;
  const destinationListId = destination.droppableId;
  const sourceIndex = source.index;
  const destinationIndex = destination.index;

  const newTasks = {
    "todo-list": [...toDoTasks],
    "in-progress-list": [...inProgressTasks],
    "archived-list": [...archivedTasks]
  };

  const [removedTask] = newTasks[sourceListId].splice(sourceIndex, 1);

  // Reset edit mode of the card that was previously in the same position as the moved card
  if (newTasks[sourceListId][destinationIndex] && newTasks[sourceListId][destinationIndex].editMode) {
    newTasks[sourceListId][destinationIndex].editMode = false;
  }
  
  if (destinationListId === sourceListId) {
    newTasks[sourceListId].splice(destinationIndex, 0, removedTask);
  } else {
    newTasks[destinationListId].splice(destinationIndex, 0, removedTask);
    // Set edit mode based on whether the card was in edit mode before it was moved
    if (removedTask.editMode) {
      newTasks[destinationListId][destinationIndex].editMode = true;
    } else {
      newTasks[destinationListId][destinationIndex].editMode = false;
    }
  }

  setToDoTasks(newTasks["todo-list"]);
  setInProgressTasks(newTasks["in-progress-list"]);
  setArchivedTasks(newTasks["archived-list"]);
};

const handleSearchTermChange = (event) => {
  setSearchTerm(event.target.value);
};

// Filter tasks based on search term
const filteredToDoTasks = toDoTasks.filter(task =>
  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  task.description.toLowerCase().includes(searchTerm.toLowerCase())
);
const filteredInProgressTasks = inProgressTasks.filter(task =>
  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  task.description.toLowerCase().includes(searchTerm.toLowerCase())
);
const filteredArchivedTasks = archivedTasks.filter(task =>
  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  task.description.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <div className="board-wrapper">
    <h1 className="title">To Do list</h1>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search tasks"
          />
          <button>Search</button>
        </div>
      </div>
      <div className="board">
        <Droppable droppableId="todo-list">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list todo"
            >
              <h2>To Do</h2>
              <div className="form-container">
                <form onSubmit={handleNewTaskSubmit}>
                  <input
                    type="text"
                    name="title"
                    value={newTaskTitle}
                    onChange={handleNewTaskTitleChange}
                    placeholder="Enter task title"
                    required
                  />
                  <textarea
                    name="description"
                    value={newTaskDescription}
                    onChange={handleNewTaskDescriptionChange}
                    placeholder="Enter task description"
                    required
                  />
                  <button type="submit">Add Task</button>
                </form>
              </div>
              {filteredToDoTasks.map((task, index) => (
                <Draggable key={index} draggableId={`todo-task-${index}`} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="card-container"
                    >
                      <Card
                        title={task.title}
                        description={task.description}
                        index={index}
                        status="todo"
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="in-progress-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="list in-progress">
              <h2>In Progress</h2>
              {filteredInProgressTasks.map((task, index) => (
                <Draggable key={index} draggableId={`in-progress-task-${index}`} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="card-container"
                    >
                      <Card
                        title={task.title}
                        description={task.description}
                        index={index}
                        status="inProgress"
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="archived-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="list archived">
              <h2>Archived</h2>
              {filteredArchivedTasks.map((task, index) => (
                <Draggable key={index} draggableId={`archived-task-${index}`} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="card-container"
                    >
                      <Card
                        title={task.title}
                        description={task.description}
                        index={index}
                        status="archived"
                        onUpdateTask={handleUpdateTask}
                        onDeleteTask={handleDeleteTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;