// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React, { useState, useRef, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Pages/Dashboard/Dashboard';
import Login from '../components/Pages/Login/Login';
import Register from '../components/Pages/Register/Register';


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
};

export default App;
