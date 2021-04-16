import React from 'react';
import { auth } from '../firebase';

auth.languageCode = 'ru';
export const AuthContext = React.createContext({ test: 'success' });

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  console.log(`currentuser auth`, currentUser);
  const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
  const updateUser = (name) => auth.currentUser.updateProfile({ displayName: name });
  const signout = () => auth.signOut();
  // somehow this func runs befare currentUser state updating (race condition)
  const verifyEmail = () =>
    auth.currentUser.sendEmailVerification({
      url: 'http://localhost:3000/tutor',
      handleCodeInApp: true,
    });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(`onauth`, user);
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    verifyEmail,
    updateUser,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>{!loading ? children : 'loading'}</AuthContext.Provider>
  );
}

export { AuthProvider };
