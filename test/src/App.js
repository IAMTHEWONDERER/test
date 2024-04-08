import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:3001/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  };

  const addTask = () => {
    if (taskName.trim() !== '') {
      fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName, done: false }),
      })
        .then(response => response.json())
        .then(data => {
          setTasks([...tasks, data]);
          setTaskName('');
        });
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      updatedTasks[index].done = !updatedTasks[index].done;
      fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTasks[index]),
      })
        .then(() => setTasks(updatedTasks));
    }
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
      });
  };

  return (
    <div className="App">
      <h1>Simple Todo List App</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.name}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
