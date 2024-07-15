// src/modules/auth/components/SignOut.js

import { useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const { setUser,handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const executeSignOut = async () => {
      try {
       
        await handleSignOut();
        navigate('/signin'); // Oturum kapandıktan sonra giriş sayfasına yönlendir
      } catch (error) {
        console.error("Sign out error:", error);
      }
    };
    (async ()=>await
    executeSignOut())();
    
  }, [handleSignOut]);

  return null; // Sayfa render etmez, sadece sign out işlemini yürütür
};

export default SignOut;
