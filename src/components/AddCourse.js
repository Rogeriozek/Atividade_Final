import React, { useState, useContext } from 'react';
import { CourseContext } from '../context/CourseContext';

const AddCourse = () => {
  const { addCourse } = useContext(CourseContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ title, description, duration });
    setTitle('');
    setDescription('');
    setDuration('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duração (horas)</label>
        <input
          type="number"
          id="duration"
          className="form-control"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Adicionar Curso</button>
    </form>
  );
};

export default AddCourse;
