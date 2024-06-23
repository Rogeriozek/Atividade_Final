// src/components/Auth.js
import React, { useContext } from 'react';
import { signInWithGoogle } from '../firebase';
import { UserContext } from '../context/UserContext';

const Auth = () => {
  const { user, setUser } = useContext(UserContext);

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser({
          name: user.displayName,
          email: user.email,
          picture: user.photoURL,
        });
      })
      .catch((error) => {
        console.log('Login Failed:', error);
      });
  };

  return (
    <div>
      {!user && (
        <button onClick={handleGoogleLogin} className="btn btn-primary">
          Login com Google
        </button>
      )}
    </div>
  );
};

export default Auth;  // Certifique-se de que `Auth` é exportado como `default`
