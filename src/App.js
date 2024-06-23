// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProvider from './context/UserContext';
import CourseProvider from './context/CourseContext';
import ThemeProvider from './context/ThemeContext';
import Home from './components/Home';
import Courses from './components/Courses';
import Login from './components/Login';
import NavBar from './components/NavBar';
import AddDiscipline from './components/AddDiscipline';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <CourseProvider>
          <Router>
            <div className="App">
              <NavBar />
              <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route
                  path="/courses"
                  element={
                    <PrivateRoute>
                      <Courses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses/:courseId/disciplines"
                  element={
                    <PrivateRoute>
                      <AddDiscipline />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </CourseProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
