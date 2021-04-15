import React from 'react';
import { auth } from '../firebase';

export const AuthContext = React.createContext({ test: 'success' });

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>{!loading ? children : 'loading'}</AuthContext.Provider>
  );
}

export { AuthProvider };
