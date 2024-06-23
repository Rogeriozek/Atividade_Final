// src/components/Home.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importar UserContext
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Usar contexto do usuário

  const handleLearnMoreClick = () => {
    if (user) {
      navigate('/courses'); // Redirecionar para cursos se usuário estiver logado
    } else {
      navigate('/login'); // Redirecionar para login se não estiver logado
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bem-vindo à Estude Mais</h1>
        <p>
          A Estude Mais é uma plataforma dedicada a oferecer os melhores cursos online para você.
          Nossa missão é capacitar pessoas com conhecimento acessível e de alta qualidade em diversas áreas.
        </p>
        <p>
          Explore nossos cursos e comece sua jornada de aprendizado hoje mesmo!
        </p>
        <button className="btn btn-primary" onClick={handleLearnMoreClick}>Saiba Mais</button>
      </div>
    </div>
  );
};

export default Home;
