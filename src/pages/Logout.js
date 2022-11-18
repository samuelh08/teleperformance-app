import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/user';

// this page doesn't show anything, only removes token and user from local storage and context

export default function Logout() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    context?.setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }, [context, navigate]);

  return null;
}
