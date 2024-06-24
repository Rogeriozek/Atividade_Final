// src/components/CourseList.js
import React, { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';
import CourseItem from './CourseItem';
import './CourseList.css';

const CourseList = () => {
  const { courses } = useContext(CourseContext);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Cursos</h2>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Duração (horas)</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map(course => (
              <CourseItem key={course.id} course={course} />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Nenhum curso disponível</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
