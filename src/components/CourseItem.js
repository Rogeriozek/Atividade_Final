// src/components/CourseItem.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { CourseContext } from '../context/CourseContext';

const CourseItem = ({ course }) => {
  const { updateCourse, deleteCourse } = useContext(CourseContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState(course);
  const navigate = useNavigate(); // Hook para navegação

  const handleUpdate = () => {
    updateCourse(course.id, updatedCourse).then(() => {
      setIsEditing(false);
    });
  };

  const handleDelete = () => {
    deleteCourse(course.id);
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              className="form-control"
              value={updatedCourse.title}
              onChange={(e) => setUpdatedCourse({ ...updatedCourse, title: e.target.value })}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              value={updatedCourse.description}
              onChange={(e) => setUpdatedCourse({ ...updatedCourse, description: e.target.value })}
            />
          </td>
          <td>
            <input
              type="number"
              className="form-control"
              value={updatedCourse.duration}
              onChange={(e) => setUpdatedCourse({ ...updatedCourse, duration: e.target.value })}
            />
          </td>
          <td>
            <button className="btn btn-success btn-sm mr-2" onClick={handleUpdate}>Salvar</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancelar</button>
          </td>
        </>
      ) : (
        <>
          <td>{course.title}</td>
          <td>{course.description}</td>
          <td>{course.duration}</td>
          <td>
            <button className="btn btn-primary btn-sm mr-2" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="btn btn-danger btn-sm mr-2" onClick={handleDelete}>Deletar</button>
            <button className="btn btn-info btn-sm" onClick={() => navigate(`/courses/${course.id}/disciplines`)}>Adicionar Disciplinas</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default CourseItem;
