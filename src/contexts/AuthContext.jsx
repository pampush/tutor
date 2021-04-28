import React from 'react';
import { auth } from '../firebase';

import { LoadingScreen } from '../components';

auth.languageCode = 'ru';
export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [firstLogin, setFirstLogin] = React.useState(false);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const updateUser = (name) => auth.currentUser.updateProfile({ displayName: name });
  const signout = () => auth.signOut();

  const verifyEmail = (user) =>
    user.sendEmailVerification({
      url:
        !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
          ? 'https://localhost:3000/schedule/'
          : 'https://pampush.github.io/tutor/',
      handleCodeInApp: true,
    });

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((res) => {
          if (res.authTime === user.metadata.creationTime)
            /*
             * force token refresh
             * https://github.com/firebase/firebase-js-sdk/issues/2529
             */
            user.getIdToken(true);
          if (document.referrer === 'https://tutor-49686.firebaseapp.com/') {
            setFirstLogin(true);
          }
        });

        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(user);
        setLoading(false);
      }
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
    firstLogin,
    setFirstLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <LoadingScreen open={loading} />}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
