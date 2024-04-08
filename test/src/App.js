import React,{useState, useEffect} from 'react';
import './App.css';

function App(){
  const [Tasks, setTasks] =useState([]);
  const [taskName, setTaskName]=useState('');
  
  useEffect(()=>{
    fetchTasks();
  },[])
  const fetchTasks =()=>{
    fetch('http://localhost:3001/tasks')
    .then(response => response.json())
    .then(data => setTasks(data));
  }
  const addTask = () =>{
    if(taskName.trim()!== ''){
      fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: taskName, finished: false
        })
      })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        setTaskName('');
      });
    }
  }
  const toggleTask = (id) => {
    const updateTasks = [...tasks];
    const index = updateTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      updatedTasks[index].done = !updateTasks[index].done;
      fetch(`http://localhost:3001/tsks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTasks[index]),
      })
        .then(() => setTasks(updateTasks));
    }
  };





}