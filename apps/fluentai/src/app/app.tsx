// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React, { useState, useRef, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Pages/Dashboard/Dashboard';
import Login from '../components/Pages/Login/Login';
import Register from '../components/Pages/Register/Register';
// import { ProtectedRoute } from '@libs/auth';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
            <Dashboard />
          // </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default App;
