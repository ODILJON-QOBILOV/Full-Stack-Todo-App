import axios from 'axios';
import React, { useEffect, useState } from 'react';

import checkIcon from './assets/icon2.svg';
import deleteImage from './assets/icon1.svg';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios.get('http://127.0.0.1:8000/api/v1/todo/')
      .then(res => setTodos(res.data))
      .catch(error => console.error('Error fetching todos:', error));
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      return; // Don't add empty todos
    }

    axios.post('http://127.0.0.1:8000/api/v1/todo/', {
      title: newTodo
    })
    .then(res => {
      setTodos([...todos, res.data]);
      setNewTodo('');
    })
    .catch(error => {
      console.error('Error adding todo:', error);
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/v1/todo/delete/${id}/`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error(`Error deleting todo with id ${id}:`, error);
      });
  };

  const updateTodo = (id) => {
    axios.patch(`http://127.0.0.1:8000/api/v1/todo/update/${id}/`, {
      complited: true
    })
    .then(res => {
      setTodos(todos.map(todo => todo.id === id ? res.data : todo));
    })
    .catch(error => {
      console.error(`Error updating todo with id ${id}:`, error);
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div>
      <div className="box">
        <h1>Todo List</h1>
        <div className="new-plan">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a new todo..."
          />
          <button onClick={handleAddTodo}>+</button>
        </div>
        <div className="todos">
          {todos.map((todo, index) => (
            <div key={index} className={todo.complited ? "todo-done" : "todo"}>
              <p className="todo-text">
                {index + 1}. {todo.title}
              </p>
              <div className="images">
                <div className="done" onClick={() => updateTodo(todo.id)}>
                  <img src={checkIcon} alt="Done" />
                </div>
                <div className="delete" onClick={() => deleteTodo(todo.id)}>
                  <img src={deleteImage} alt="Delete" width={23} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
