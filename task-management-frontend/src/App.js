import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.component';
import Register from './pages/Register.component';
import TaskList from './pages/TaskList';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
