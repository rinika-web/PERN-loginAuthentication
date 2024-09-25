import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/loginpage/login';
import Register from './components/registarpage/register';
import TimerPage from './components/Timer/timerpage';
import "./App.css";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timer" element={<TimerPage />} />
      </Routes>
    </div>
  );
}
export default App;
