import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

function TodoList({ todos, onUpdateTodo, onDeleteTodo }) {
  return (
    <Droppable droppableId="todo-list">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {todos.map((todo, index) => (
            <Card
              key={todo.id}
              title={todo.title}
              description={todo.description}
              index={index}
              onUpdate={(title, description) => onUpdateTodo(todo.id, title, description)}
              onDelete={() => onDeleteTodo(todo.id)}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default TodoList;