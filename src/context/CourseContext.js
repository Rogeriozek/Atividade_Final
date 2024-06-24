import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { toast } from 'react-toastify';

export const CourseContext = createContext();

const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = collection(firestore, 'courses');
      const courseSnapshot = await getDocs(courseCollection);
      const courseList = courseSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  const addCourse = async (course) => {
    const courseCollection = collection(firestore, 'courses');
    try {
      const docRef = await addDoc(courseCollection, course);
      setCourses([...courses, { id: docRef.id, ...course }]);
      toast.success('Curso adicionado com sucesso!');
    } catch (error) {
      toast.error('Erro ao adicionar curso.');
      console.error('Error adding course:', error);
    }
  };

  const updateCourse = async (id, updatedCourse) => {
    const courseDoc = doc(firestore, 'courses', id);
    try {
      await updateDoc(courseDoc, updatedCourse);
      setCourses(courses.map(course => (course.id === id ? { id, ...updatedCourse } : course)));
      toast.success('Curso atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar curso.');
      console.error('Error updating course:', error);
    }
  };

  const deleteCourse = async (id) => {
    const courseDoc = doc(firestore, 'courses', id);
    try {
      await deleteDoc(courseDoc);
      setCourses(courses.filter(course => course.id !== id));
      toast.success('Curso deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar curso.');
      console.error('Error deleting course:', error);
    }
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
