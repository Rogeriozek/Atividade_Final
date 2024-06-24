import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { signOut } from '../firebase';
import './NavBar.css';

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut()
      .then(() => {
        setUser(null);
        navigate('/login');
      })
      .catch((error) => {
        console.log('Erro ao deslogar:', error);
      });
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-${theme === 'light' ? 'light' : 'dark'} bg-${theme === 'light' ? 'light' : 'dark'}`}>
      <Link className="navbar-brand" to="/">Estude Mais</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/courses">Cursos</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto align-items-center">
          <li className="nav-item">
            <button onClick={toggleTheme} className="btn btn-link nav-link">
              {theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
            </button>
          </li>
          {user ? (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={user.picture} alt="Profile" className="profile-pic" />
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <button onClick={handleSignOut} className="dropdown-item">Logout</button>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
