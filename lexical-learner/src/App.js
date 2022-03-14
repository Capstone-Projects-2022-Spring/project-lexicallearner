import './App.css';
import React, { Component }  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeLoggedIn from './pages/HomeLoggedIn';
import Classroom from './pages/Classroom';
import Profile from "./pages/Profile";

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/upload" element={<Upload />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/homeLoggedIn" element={<HomeLoggedIn />}/>
          <Route path="/classroom" element={<Classroom />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
