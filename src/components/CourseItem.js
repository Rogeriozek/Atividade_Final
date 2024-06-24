import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';
import { UserContext } from '../context/UserContext';
import { firestore } from '../firebase';
import { doc, collection, addDoc, deleteDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const CourseItem = ({ course }) => {
  const { updateCourse, deleteCourse } = useContext(CourseContext);
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState(course);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  // Verificar se o usuário está inscrito no curso
  useEffect(() => {
    const checkEnrollment = async () => {
      if (user && user.uid && course && course.id) {
        try {
          const enrollmentsRef = collection(firestore, 'enrollments');
          const q = query(enrollmentsRef, where('userId', '==', user.uid), where('courseId', '==', course.id));
          const enrollmentSnapshot = await getDocs(q);
          setIsEnrolled(!enrollmentSnapshot.empty);
        } catch (error) {
          console.error('Erro ao verificar inscrição:', error);
        }
      }
    };

    checkEnrollment();
  }, [user, course]);

  // Atualizar curso
  const handleUpdate = async () => {
    try {
      await updateDoc(doc(firestore, 'courses', course.id), updatedCourse);
      updateCourse(course.id, updatedCourse);
      setIsEditing(false);
      toast.success('Curso atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar o curso');
      console.error('Erro ao atualizar o curso:', error);
    }
  };

  // Deletar curso
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(firestore, 'courses', course.id));
      deleteCourse(course.id);
      toast.success('Curso deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar o curso');
      console.error('Erro ao deletar o curso:', error);
    }
  };

  // Inscrever-se no curso
  const handleEnroll = async () => {
    if (!user || !user.uid) {
      toast.error('Você precisa estar logado para se inscrever.');
      return;
    }

    if (!course || !course.id) {
      toast.error('Curso inválido.');
      return;
    }

    const newEnrollment = {
      userId: user.uid,
      courseId: course.id
    };

    try {
      const enrollmentsRef = collection(firestore, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', user.uid), where('courseId', '==', course.id));
      const enrollmentSnapshot = await getDocs(q);

      if (enrollmentSnapshot.empty) {
        await addDoc(enrollmentsRef, newEnrollment);
        toast.success('Inscrição realizada com sucesso!');
        setIsEnrolled(true);
      } else {
        toast.error('Você já está inscrito neste curso.');
      }
    } catch (error) {
      toast.error('Erro ao se inscrever no curso.');
      console.error('Erro ao se inscrever no curso:', error);
    }
  };

  // Cancelar inscrição no curso
  const handleUnenroll = async () => {
    try {
      const enrollmentsRef = collection(firestore, 'enrollments');
      const q = query(enrollmentsRef, where('userId', '==', user.uid), where('courseId', '==', course.id));
      const enrollmentSnapshot = await getDocs(q);
      if (!enrollmentSnapshot.empty) {
        const enrollmentDoc = enrollmentSnapshot.docs[0];
        await deleteDoc(doc(firestore, 'enrollments', enrollmentDoc.id));
        toast.success('Inscrição cancelada com sucesso!');
        setIsEnrolled(false);
      }
    } catch (error) {
      toast.error('Erro ao cancelar inscrição no curso.');
      console.error('Erro ao cancelar inscrição no curso:', error);
    }
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
            <button className="btn btn-info btn-sm mr-2" onClick={() => navigate(`/courses/${course.id}/disciplines`)}>Adicionar Disciplinas</button>
            {isEnrolled ? (
              <button className="btn btn-warning btn-sm" onClick={handleUnenroll}>Cancelar Inscrição</button>
            ) : (
              <button className="btn btn-success btn-sm" onClick={handleEnroll}>Inscrever-se</button>
            )}
          </td>
        </>
      )}
    </tr>
  );
};

export default CourseItem;
