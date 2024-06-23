// src/components/Courses.js
import React from 'react';
import AddCourse from './AddCourse';
import CourseList from './CourseList';

const Courses = () => {
  return (
    <div className="container mt-5">
      <h1>Nossos Cursos</h1>
      <AddCourse />
      <CourseList />
    </div>
  );
};

export default Courses;
