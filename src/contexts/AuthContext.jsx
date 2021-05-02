import React from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/app';

import { LoadingScreen } from '../components';

auth.languageCode = 'ru';
export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [firstLogin, setFirstLogin] = React.useState(false);
  const [userName, setUserName] = React.useState('');

  React.useEffect(() => {
    currentUser && setUserName(currentUser.displayName);
  }, [currentUser]);

  const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
  const updateUser = (name) => {
    auth.currentUser.updateProfile({ displayName: name });
    setUserName(name);
  };
  const updateEmail = (email) => auth.currentUser.updateEmail(email);
  const updatePassword = (password) => auth.currentUser.updatePassword(password);
  const signout = () => auth.signOut();

  const verifyEmail = (user) =>
    user.sendEmailVerification({
      url:
        !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
          ? 'https://localhost:3000/schedule/'
          : 'https://pampush.github.io/tutor/',
      handleCodeInApp: true,
    });

  const verifyBeforeUpdateEmail = (email) =>
    auth.currentUser.verifyBeforeUpdateEmail(email, {
      url:
        !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
          ? 'https://localhost:3000/schedule/'
          : 'https://pampush.github.io/tutor/',
      handleCodeInApp: true,
    });

  const reAuth = (password) => {
    const authCredential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
    return auth.currentUser.reauthenticateWithCredential(authCredential);
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((res) => {
          // force token refresh on first login
          // https://github.com/firebase/firebase-js-sdk/issues/2529
          if (res.authTime === user.metadata.creationTime) {
            user.getIdToken(true);
            if (document.referrer === 'https://tutor-49686.firebaseapp.com/') setFirstLogin(true);
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
    userName,
    signup,
    login,
    verifyEmail,
    updateUser,
    verifyBeforeUpdateEmail,
    signout,
    updateEmail,
    updatePassword,
    firstLogin,
    setFirstLogin,
    reAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <LoadingScreen open={loading} />}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
