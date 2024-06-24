import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';
import { UserContext } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          picture: user.photoURL,
        });
        navigate('/courses');
      })
      .catch((error) => {
        console.error('Login Failed:', error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Login</h1>
        <p>Faça login com sua conta Google para acessar nossos cursos.</p>
        <button className="btn btn-primary" onClick={handleGoogleLogin}>Login com Google</button>
      </div>
    </div>
  );
};

export default Login;
