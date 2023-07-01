import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items));
  }, [items]);

  const addItem = (text) => {
    const newItems = [...items, { text, status: 'todo' }];
    setItems(newItems);
  };

  const toggleStatus = (index) => {
    const newItems = [...items];
    const currentItem = newItems[index];
    if (currentItem.status === 'todo') {
      currentItem.status = 'inProgress';
    } else if (currentItem.status === 'inProgress') {
      currentItem.status = 'archived';
    } else {
      currentItem.status = 'todo';
    }
    setItems(newItems);
  };

  const todoItems = items.filter((item) => item.status === 'todo');
  const inProgressItems = items.filter((item) => item.status === 'inProgress');
  const archivedItems = items.filter((item) => item.status === 'archived');

  return (
    <div className="app">
      <h1>Todo List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.elements.text.value.trim();
          if (text) {
            addItem(text);
            e.target.elements.text.value = '';
          }
        }}
      >
        <input type="text" name="text" placeholder="Enter a new todo item..." />
        <button type="submit">Add Item</button>
      </form>
      <div className="lists">
        <div className="list">
          <h2>To Do</h2>
          {todoItems.map((item, index) => (
            <li key={index}>
              <input type="checkbox" checked={item.status === 'inProgress' || item.status === 'archived'} onChange={() => toggleStatus(index)} />
              <span className={item.status === 'archived' ? 'completed' : ''}>{item.text}</span>
            </li>
          ))}
        </div>
        <div className="list">
          <h2>In Progress</h2>
          {inProgressItems.map((item, index) => (
            <li key={index}>
              <input type="checkbox" checked={item.status === 'archived'} onChange={() => toggleStatus(index)} />
              <span className={item.status === 'archived' ? 'completed' : ''}>{item.text}</span>
            </li>
          ))}
        </div>
        <div className="list">
          <h2>Archived</h2>
          {archivedItems.map((item, index) => (
            <li key={index}>
              <input type="checkbox" checked={true} disabled />
              <span className="completed">{item.text}</span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;