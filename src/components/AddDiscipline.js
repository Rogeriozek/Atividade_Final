// src/components/AddDiscipline.js
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';
import { firestore } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, query, where, getDocs, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './AddDiscipline.css';

const AddDiscipline = () => {
  const { courseId } = useParams();
  const { courses } = useContext(CourseContext);
  const [course, setCourse] = useState(null);
  const [disciplineName, setDisciplineName] = useState('');
  const [disciplineDuration, setDisciplineDuration] = useState('');
  const [disciplineDescription, setDisciplineDescription] = useState('');
  const [disciplines, setDisciplines] = useState([]);
  const [editingDisciplineId, setEditingDisciplineId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = () => {
      const selectedCourse = courses.find(c => c.id === courseId);
      setCourse(selectedCourse);
    };

    const fetchDisciplines = async () => {
      const disciplinesCollection = collection(firestore, 'disciplines');
      const q = query(disciplinesCollection, where('courseId', '==', courseId));
      const disciplinesSnapshot = await getDocs(q);
      const disciplinesList = disciplinesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDisciplines(disciplinesList);
    };

    if (courses.length > 0) {
      fetchCourse();
      fetchDisciplines();
    }
  }, [courses, courseId]);

  const handleAddOrUpdateDiscipline = async () => {
    if (disciplineName.trim() === '' || disciplineDuration.trim() === '' || disciplineDescription.trim() === '') {
      toast.error('Todos os campos são obrigatórios');
      return;
    }

    const newDiscipline = {
      name: disciplineName,
      duration: disciplineDuration,
      description: disciplineDescription,
      courseId: courseId
    };

    try {
      if (editingDisciplineId) {
        const disciplineDoc = doc(firestore, 'disciplines', editingDisciplineId);
        await updateDoc(disciplineDoc, newDiscipline);
        setDisciplines(disciplines.map(d => (d.id === editingDisciplineId ? { id: editingDisciplineId, ...newDiscipline } : d)));
        toast.success('Disciplina atualizada com sucesso');
      } else {
        const docRef = await addDoc(collection(firestore, 'disciplines'), newDiscipline);
        setDisciplines([...disciplines, { id: docRef.id, ...newDiscipline }]);
        toast.success('Disciplina adicionada com sucesso');
      }
      resetForm();
    } catch (error) {
      toast.error(`Erro ao ${editingDisciplineId ? 'atualizar' : 'adicionar'} disciplina`);
      console.error(`Error ${editingDisciplineId ? 'updating' : 'adding'} discipline:`, error);
    }
  };

  const handleDeleteDiscipline = async (disciplineId) => {
    try {
      const disciplineDoc = doc(firestore, 'disciplines', disciplineId);
      await deleteDoc(disciplineDoc);
      setDisciplines(disciplines.filter(d => d.id !== disciplineId));
      toast.success('Disciplina deletada com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar disciplina');
      console.error('Error deleting discipline:', error);
    }
  };

  const handleEditDiscipline = (discipline) => {
    setDisciplineName(discipline.name);
    setDisciplineDuration(discipline.duration);
    setDisciplineDescription(discipline.description);
    setEditingDisciplineId(discipline.id);
  };

  const resetForm = () => {
    setDisciplineName('');
    setDisciplineDuration('');
    setDisciplineDescription('');
    setEditingDisciplineId(null);
  };

  return (
    <div className="add-discipline-container">
      <div className="add-discipline-content">
        <h2>Adicionar/Alterar Disciplinas ao Curso: {course ? course.title : 'Carregando...'}</h2>
        <input
          type="text"
          placeholder="Nome da Disciplina"
          value={disciplineName}
          onChange={(e) => setDisciplineName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Carga Horária (horas)"
          value={disciplineDuration}
          onChange={(e) => setDisciplineDuration(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={disciplineDescription}
          onChange={(e) => setDisciplineDescription(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddOrUpdateDiscipline}>
          {editingDisciplineId ? 'Atualizar Disciplina' : 'Adicionar Disciplina'}
        </button>
        <h3>Disciplinas Existentes</h3>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Carga Horária (horas)</th>
              <th scope="col">Descrição</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {disciplines.length > 0 ? (
              disciplines.map(discipline => (
                <tr key={discipline.id}>
                  {editingDisciplineId === discipline.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={disciplineName}
                          onChange={(e) => setDisciplineName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={disciplineDuration}
                          onChange={(e) => setDisciplineDuration(e.target.value)}
                        />
                      </td>
                      <td>
                        <textarea
                          className="form-control"
                          value={disciplineDescription}
                          onChange={(e) => setDisciplineDescription(e.target.value)}
                        />
                      </td>
                      <td>
                        <button className="btn btn-success btn-sm mr-2" onClick={handleAddOrUpdateDiscipline}>Salvar</button>
                        <button className="btn btn-secondary btn-sm" onClick={resetForm}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{discipline.name}</td>
                      <td>{discipline.duration}</td>
                      <td>{discipline.description}</td>
                      <td>
                        <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEditDiscipline(discipline)}>Alterar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteDiscipline(discipline.id)}>Deletar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Nenhuma disciplina disponível</td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/courses')}>Voltar</button>
      </div>
    </div>
  );
};

export default AddDiscipline;
