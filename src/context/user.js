import React, { useEffect, useState } from 'react';

// create user context to preserve user information across pages
const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // custom hook to set user to local storage and context
  function setUserState(userState) {
    localStorage.setItem('user', JSON.stringify(userState));
    setUser(userState);
  }

  // get user from local storage if available
  useEffect(() => {
    try {
      const state = localStorage.getItem('user');
      if (state) {
        const parsedState = JSON.parse(state);
        setUser(parsedState);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
