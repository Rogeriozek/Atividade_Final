import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="btn btn-secondary btn-sm mb-4">
      Alternar para {theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
    </button>
  );
};

export default ThemeToggle;
